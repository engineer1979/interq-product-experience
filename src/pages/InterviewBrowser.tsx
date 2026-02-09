import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

// This is a placeholder dashboard to access the report.

const mockInterviews = [
  {
    sessionId: "a1b2c3d4",
    role: "Senior Frontend Engineer",
    candidateName: "John Doe",
    status: "Completed",
    date: "October 26, 2023",
  },
  // Add more mock interviews here if needed
];

export default function InterviewBrowser() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Interview Dashboard</h1>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Completed Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {mockInterviews.map((interview) => (
                <div key={interview.sessionId} className="py-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-primary">{interview.role}</h3>
                    <p className="text-sm text-muted-foreground">Candidate: {interview.candidateName}</p>
                    <p className="text-sm text-muted-foreground">Date: {interview.date}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/report/${interview.sessionId}`)}
                  >
                    View Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
