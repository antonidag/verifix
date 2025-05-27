import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, Database, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { KnowledgeDialog } from "./KnowledgeDialog";
import { Button } from "./ui/button";
import { VefiApi, SolutionModel } from '@/api-client';

// Initialize the API client
const api = new VefiApi({
    BASE: 'http://localhost:8000'
});

// Helper function to format confidence for display
const formatConfidence = (confidence: string | null | undefined): string => {
  if (!confidence) return "0% confidence";
  return `${Math.round(parseFloat(confidence) * 100)}% confidence`;
};

export const KnowledgeBase = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<SolutionModel | null>(null);
  const [solutions, setSolutions] = useState<SolutionModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const apiSolutions = await api.default.listSolutions();
        setSolutions(apiSolutions);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const handleViewDetails = (solution: SolutionModel) => {
    setSelectedSolution(solution);
    setIsDetailModalOpen(true);
  };

  return (
    <section id="knowledge" className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Knowledge Base</h2>
        <p className="text-slate-600">Self-learning system that grows smarter over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Recent Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8 text-slate-500">Loading solutions...</div>
              ) : solutions.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No solutions found</div>
              ) : (
                solutions.slice(0, 5).map((solution) => (
                  <div
                    key={solution.id}
                    className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">{solution.title || solution.text}</h3>
                        {solution.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {solution.id || 'New'}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-600 mb-3">{solution.description || solution.text}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{formatConfidence(solution.confidence)}</span>
                        {solution.created_at && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(solution.created_at).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <Button
                        onClick={() => handleViewDetails(solution)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <TrendingUp className="w-5 h-5" />
                System Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{solutions.length}</div>
                <div className="text-sm text-blue-700">Total Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {solutions.length > 0
                    ? Math.round((solutions.filter(s => s.verified).length / solutions.length) * 100)
                    : 0}%
                </div>
                <div className="text-sm text-green-700">Verified Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {solutions.filter(s => {
                    if (!s.created_at) return false;
                    const created = new Date(s.created_at);
                    const today = new Date();
                    return created.toDateString() === today.toDateString();
                  }).length}
                </div>
                <div className="text-sm text-purple-700">Solutions Added Today</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <KnowledgeDialog
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          solution={selectedSolution}
        />
      </div>
    </section>
  );
};
