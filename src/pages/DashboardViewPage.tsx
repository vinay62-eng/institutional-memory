import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";

const DashboardViewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardViewPage;
