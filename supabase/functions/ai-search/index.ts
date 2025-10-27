import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      throw new Error('Search query is required');
    }

    // Get auth user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Initialize Supabase client with user's token to respect RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user authentication
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Fetch meetings and policies - now respects RLS policies for this user
    const [{ data: meetings }, { data: policies }] = await Promise.all([
      supabase.from('meetings').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('policies').select('*').order('created_at', { ascending: false }).limit(50)
    ]);

    // Use Lovable AI to search and rank results
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const contextData = {
      meetings: meetings || [],
      policies: policies || []
    };

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant that helps search and retrieve information from organizational meetings and policies. 
            Analyze the user's query and return the most relevant results from the provided data.
            Return your response as a JSON array of results with: type (meeting/policy), title, summary, and relevance score.`
          },
          {
            role: 'user',
            content: `User query: "${query}"\n\nAvailable data:\n${JSON.stringify(contextData)}\n\nReturn the top 5 most relevant results as JSON array.`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required, please add funds to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error('AI search failed');
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;
    
    let results = [];
    try {
      // Try to parse JSON from AI response
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        results = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      // Fallback: return basic search results
      results = [
        ...(meetings || []).filter((m: any) => 
          m.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3).map((m: any) => ({
          type: 'meeting',
          title: m.title,
          summary: m.description || m.summary || 'No description available',
        })),
        ...(policies || []).filter((p: any) => 
          p.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 2).map((p: any) => ({
          type: 'policy',
          title: p.title,
          summary: p.description || 'No description available',
        }))
      ];
    }

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
