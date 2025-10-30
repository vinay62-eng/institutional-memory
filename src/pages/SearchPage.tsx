import Navigation from "@/components/Navigation";
import AISearch from "@/components/AISearch";

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <AISearch />
      </main>
    </div>
  );
};

export default SearchPage;
