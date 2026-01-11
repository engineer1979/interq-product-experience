import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockCandidateResults, CandidateResult } from "@/data/mockAdminData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye } from "lucide-react";

export default function AdminResults() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"date" | "score" | "name">("date");

    let filteredResults = mockCandidateResults.filter((result) => {
        const matchesSearch =
            result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.position.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "all" || result.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Sort results
    filteredResults = [...filteredResults].sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.test_date).getTime() - new Date(a.test_date).getTime();
        } else if (sortBy === "score") {
            return b.overall_score - a.overall_score;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    const getStatusBadge = (status: CandidateResult["status"]) => {
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            completed: "default",
            reviewed: "secondary",
            pending: "outline",
            failed: "destructive"
        };
        return <Badge variant={variants[status]}>{status}</Badge>;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Interview Results</h1>
                <p className="text-muted-foreground">View and manage candidate interview recordings</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or position..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="score">Score</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Test Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredResults.map((result) => (
                            <TableRow key={result.candidate_id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{result.name}</p>
                                        <p className="text-sm text-muted-foreground">{result.email}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{result.position}</TableCell>
                                <TableCell>{new Date(result.test_date).toLocaleDateString()}</TableCell>
                                <TableCell>{getStatusBadge(result.status)}</TableCell>
                                <TableCell>
                                    {result.overall_score > 0 ? (
                                        <span className="font-medium">{result.overall_score}%</span>
                                    ) : (
                                        <span className="text-muted-foreground">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate(`/admin/results/${result.candidate_id}`)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
