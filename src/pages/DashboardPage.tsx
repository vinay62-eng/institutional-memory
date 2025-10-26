import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Brain, Calendar, FileText, LogOut, Plus, Search, Sparkles, Loader2 } from "lucide-react";

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("ai-search", {
        body: { query: searchQuery }
      });

      if (error) throw error;

      setSearchResults(data.results || []);
      
      toast({
        title: "Search Complete",
        description: `Found ${data.results?.length || 0} relevant results`,
      });
    } catch (error: any) {
      toast({
        title: "Search Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">MeetingHub</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* AI Search */}
        <Card className="mb-8 shadow-lg border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <CardTitle>AI-Powered Search</CardTitle>
            </div>
            <CardDescription>Ask anything about your meetings, policies, and decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search meetings, policies, decisions..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-primary to-accent" disabled={searching}>
                {searching ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </form>
            
            {searchResults.length > 0 && (
              <div className="mt-6 space-y-4">
                <p className="text-sm font-medium">Results:</p>
                {searchResults.map((result, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {result.type === "meeting" ? (
                            <Calendar className="w-5 h-5 text-primary" />
                          ) : (
                            <FileText className="w-5 h-5 text-accent" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{result.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{result.summary}</p>
                          <Badge variant="secondary">{result.type}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="meetings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="meetings">
              <Calendar className="w-4 h-4 mr-2" />
              Meetings
            </TabsTrigger>
            <TabsTrigger value="policies">
              <FileText className="w-4 h-4 mr-2" />
              Policies
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meetings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Meetings</h2>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <Plus className="w-4 h-4 mr-2" />
                New Meeting
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  No meetings yet. Create your first meeting to get started!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="policies" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Organization Policies</h2>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <Plus className="w-4 h-4 mr-2" />
                New Policy
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  No policies yet. Create your first policy document!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;
