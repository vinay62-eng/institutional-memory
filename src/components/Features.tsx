import { FileText, Search, Lock, Calendar, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Automatic Recording",
    description: "Capture every meeting, decision, and policy change with zero manual effort."
  },
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Find any information instantly with natural language queries and semantic understanding."
  },
  {
    icon: Lock,
    title: "Secure & Compliant",
    description: "Enterprise-grade security with role-based access control and audit trails."
  },
  {
    icon: Calendar,
    title: "Smart Organization",
    description: "Automatically categorize and tag content for easy navigation and discovery."
  },
  {
    icon: TrendingUp,
    title: "Analytics & Insights",
    description: "Track trends, measure engagement, and identify knowledge gaps with AI analytics."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share knowledge across departments with seamless access and collaboration tools."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-bold">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Knowledge Management
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Built for modern organizations that value efficiency and accountability
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-border hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
