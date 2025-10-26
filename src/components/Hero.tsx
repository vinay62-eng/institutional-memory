import { Button } from "@/components/ui/button";
import { Search, FileText, Brain } from "lucide-react";
import heroImage from "@/assets/hero-meeting.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      
      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Intelligence</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Institutional Knowledge
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Automatically record, organize, and retrieve meetings and policies with AI-powered intelligence. 
              Improve efficiency, ensure accountability, and never lose critical information again.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Auto Recording</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm font-medium">Smart Search</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">AI Insights</p>
              </div>
            </div>
          </div>
          
          {/* Right image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
            <img 
              src={heroImage} 
              alt="AI-enhanced meeting management platform" 
              className="relative rounded-2xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
