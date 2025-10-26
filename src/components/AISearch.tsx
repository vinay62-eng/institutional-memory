import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Sparkles, FileText, Calendar } from "lucide-react";

const AISearch = () => {
  const [query, setQuery] = useState("");
  
  const exampleQueries = [
    "What decisions were made about the Q4 budget?",
    "Show me all remote work policy changes",
    "Find meetings discussing product roadmap"
  ];
  
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered Intelligence</span>
            </div>
            
            <h2 className="text-4xl font-bold">
              Ask Anything About Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Organization
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Natural language search powered by advanced AI
            </p>
          </div>
          
          {/* Search Bar */}
          <Card className="p-2 shadow-lg border-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search meetings, policies, decisions..." 
                  className="pl-12 h-14 text-lg border-0 focus-visible:ring-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity h-14 px-8">
                <Sparkles className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </Card>
          
          {/* Example Queries */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="text-sm"
                  onClick={() => setQuery(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Demo Results */}
          <div className="space-y-4">
            <p className="text-sm font-medium">Recent searches:</p>
            
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Q4 Strategy Planning Meeting</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Discussed budget allocation, hiring roadmap, and product priorities...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>October 25, 2025</span>
                    <span>8 attendees</span>
                    <span className="text-primary">95% relevance</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Remote Work Policy Update</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Updated guidelines for hybrid work arrangements and equipment allowances...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>October 20, 2025</span>
                    <span>HR Department</span>
                    <span className="text-primary">92% relevance</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISearch;
