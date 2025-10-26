import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Users, MoreVertical } from "lucide-react";

const recentMeetings = [
  {
    title: "Q4 Strategy Planning",
    date: "2025-10-25",
    attendees: 8,
    status: "completed",
    topics: ["Budget", "Roadmap", "Hiring"]
  },
  {
    title: "Product Review Session",
    date: "2025-10-24",
    attendees: 5,
    status: "completed",
    topics: ["Features", "Timeline"]
  },
  {
    title: "Board Meeting",
    date: "2025-10-23",
    attendees: 12,
    status: "completed",
    topics: ["Financials", "Growth"]
  }
];

const policies = [
  {
    title: "Remote Work Policy",
    updated: "2025-10-20",
    category: "HR",
    status: "active"
  },
  {
    title: "Data Privacy Guidelines",
    updated: "2025-10-18",
    category: "Legal",
    status: "active"
  },
  {
    title: "Travel & Expense Policy",
    updated: "2025-10-15",
    category: "Finance",
    status: "active"
  }
];

const Dashboard = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-bold">
            Your Organization's{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Central Hub
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            All meetings, policies, and decisions in one intelligent platform
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Meetings */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <CardTitle>Recent Meetings</CardTitle>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <CardDescription>Automatically recorded and organized</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMeetings.map((meeting, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1 flex-1">
                      <h4 className="font-semibold">{meeting.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{meeting.date}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {meeting.attendees}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meeting.topics.map((topic, i) => (
                      <Badge key={i} variant="secondary">{topic}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Policies */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  <CardTitle>Active Policies</CardTitle>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <CardDescription>Organization-wide guidelines and procedures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {policies.map((policy, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{policy.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {policy.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="secondary">{policy.category}</Badge>
                        <span>Updated {policy.updated}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
