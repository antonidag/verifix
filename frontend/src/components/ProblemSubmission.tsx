import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mic,
  Search,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Bot,
  Database,
  Plus,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SolutionForm } from "./SolutionForm";
import { solutions, SolutionResult, aiSolutions } from "@/data/solutions";
import { KnowledgeDialog } from "./KnowledgeDialog";

export const ProblemSubmission = () => {
  const [problem, setProblem] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SolutionResult>(null);

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setProblem("PLC error 4096 on line 3 - conveyor belt stopped");
      setIsListening(false);
      toast({
        title: "Voice input captured",
        description: "Problem description has been transcribed",
      });
    }, 2000);
  };

  const handleSubmit = async () => {
    if (!problem.trim()) return;

    setIsSearching(true);
    setResult(null);

    // Simulate API call - randomly return either knowledge base result or AI-generated solution
    setTimeout(() => {
      const hasKnowledgeBaseSolution = Math.random() > 0.3; // 70% chance of finding a solution

      if (hasKnowledgeBaseSolution) {
        setResult({
          type: "knowledge_base",
          found: true,
          solution: solutions[Math.floor(Math.random() * solutions.length)],
        });
      } else {
        setResult({
          type: "ai_generated",
          found: false,
          solution: aiSolutions[Math.floor(Math.random() * aiSolutions.length)],
        });
      }
      setIsSearching(false);
    }, 1500);
  };

  const clearForm = () => {
    setProblem("");
    setResult(null);
  };

  return (
    <section id="submit" className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="search" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Find Solution
            </TabsTrigger>
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Submit Solution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Describe the problem: alarms, error codes, symptoms..."
                    className="min-h-24 pr-12 border-slate-300 focus:border-blue-500"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 ${
                      isListening
                        ? "text-red-500 animate-pulse"
                        : "text-slate-400 hover:text-blue-500"
                    }`}
                    onClick={handleVoiceInput}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!problem.trim() || isSearching}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 w-4 h-4" />
                        Find Solution
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="border-slate-300" onClick={clearForm}>
                    Clear
                  </Button>
                </div>

                {result && result.type === "knowledge_base" && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Database className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-800">{result.solution.title}</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {Math.round(result.solution.confidence * 100)}% match
                          </Badge>
                          {result.solution.status === "verified" && (
                            <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
                          )}
                        </div>
                        <p className="text-slate-700 mb-4">{result.solution.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {result.solution.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500">
                          <CheckCircle className="inline w-3 h-3 mr-1" />
                          Solution from verified knowledge base
                        </p>
                      </div>
                      <KnowledgeDialog solution={result.solution} />
                    </div>
                  </div>
                )}

                {result && result.type === "ai_generated" && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Bot className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-800">{result.solution.title}</h3>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            AI Generated
                          </Badge>
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            {Math.round(result.solution.confidence * 100)}% confidence
                          </Badge>
                        </div>
                        <p className="text-slate-700 mb-4">{result.solution.description}</p>
                        <div className="bg-white/70 p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-slate-800 mb-2">
                            Troubleshooting Steps:
                          </h4>
                          <ul className="space-y-1">
                            {result.solution.steps.map((step: string, index: number) => (
                              <li key={index} className="text-sm text-slate-700">
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-start gap-2 p-3 bg-orange-100/50 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-orange-700">
                            <strong>AI Disclaimer:</strong> This solution was generated by AI based
                            on common troubleshooting patterns. Please verify with technical
                            documentation.
                          </p>
                        </div>
                      </div>
                      <KnowledgeDialog solution={result.solution} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit">
            <SolutionForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
