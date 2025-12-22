import { useParams, useNavigate } from "react-router-dom";
import { mockCandidateResults } from "@/data/mockAdminData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AudioPlayer } from "@/components/admin/AudioPlayer";
import { ArrowLeft, Download, Flag, Share2 } from "lucide-react";

export default function AdminResultDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const result = mockCandidateResults.find(r => r.candidate_id === id);

    if (!result) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Result not found</h2>
                <Button onClick={() => navigate("/admin/results")} className="mt-4">
                    Back to Results
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate("/admin/results")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Results
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                    <Button variant="outline" size="sm">
                        <Flag className="h-4 w-4 mr-2" />
                        Flag
                    </Button>
                </div>
            </div>

            {/* Candidate Info */}
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl">{result.name}</CardTitle>
                            <p className="text-muted-foreground">{result.email}</p>
                        </div>
                        <Badge>{result.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Position</p>
                            <p className="font-medium">{result.position}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Test Date</p>
                            <p className="font-medium">{new Date(result.test_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium">{Math.floor(result.duration_seconds / 60)} min</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Reviewed By</p>
                            <p className="font-medium">{result.reviewed_by || "Not reviewed"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Scores */}
                <Card>
                    <CardHeader>
                        <CardTitle>Performance Scores</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center pb-4 border-b">
                            <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                            <p className="text-4xl font-bold text-primary">{result.overall_score}%</p>
                        </div>
                        {Object.entries(result.section_scores).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="capitalize">{key}</span>
                                    <span className="font-medium">{value}%</span>
                                </div>
                                <Progress value={value} className="h-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* AI Feedback */}
                <Card>
                    <CardHeader>
                        <CardTitle>AI Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm mb-2 text-green-600">Strengths</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                {result.ai_feedback.strengths.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-2 text-orange-600">Areas for Improvement</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                {result.ai_feedback.improvements.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-2">Summary</h4>
                            <p className="text-sm text-muted-foreground">{result.ai_feedback.summary}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Audio Player */}
            {result.recording_url && (
                <Card>
                    <CardHeader>
                        <CardTitle>Interview Recording</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AudioPlayer src={result.recording_url} duration={result.duration_seconds} />
                    </CardContent>
                </Card>
            )}

            {/* Admin Notes */}
            <Card>
                <CardHeader>
                    <CardTitle>Admin Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    {result.admin_notes.length > 0 ? (
                        <div className="space-y-3">
                            {result.admin_notes.map((note) => (
                                <div key={note.id} className="border-l-2 border-primary pl-4">
                                    <p className="text-sm">{note.text}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {note.author} • {new Date(note.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No notes yet</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
