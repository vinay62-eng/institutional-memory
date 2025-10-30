import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
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
