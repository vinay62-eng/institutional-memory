import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import AISearch from "@/components/AISearch";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Dashboard />
        <AISearch />
      </main>
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2025 MeetingHub. Transform your institutional knowledge.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
