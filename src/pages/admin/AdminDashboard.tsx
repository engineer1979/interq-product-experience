import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCandidateResults } from "@/data/mockAdminData";
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const totalTests = mockCandidateResults.length;
    const completedTests = mockCandidateResults.filter(r => r.status === "completed" || r.status === "reviewed").length;
    const avgScore = Math.round(
        mockCandidateResults
            .filter(r => r.overall_score > 0)
            .reduce((sum, r) => sum + r.overall_score, 0) /
        mockCandidateResults.filter(r => r.overall_score > 0).length
    );
    const pendingReview = mockCandidateResults.filter(r => r.status === "completed" && !r.reviewed_by).length;

    const stats = [
        { title: "Total Tests", value: totalTests, icon: Users, color: "text-blue-600" },
        { title: "Completed", value: completedTests, icon: CheckCircle, color: "text-green-600" },
        { title: "Average Score", value: `${avgScore}%`, icon: TrendingUp, color: "text-purple-600" },
        { title: "Pending Review", value: pendingReview, icon: Clock, color: "text-orange-600" }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Overview of voice interview results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockCandidateResults.slice(0, 5).map((result) => (
                            <div key={result.candidate_id} className="flex items-center justify-between border-b pb-3 last:border-0">
                                <div>
                                    <p className="font-medium">{result.name}</p>
                                    <p className="text-sm text-muted-foreground">{result.position}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">{result.overall_score > 0 ? `${result.overall_score}%` : "Pending"}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(result.test_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
