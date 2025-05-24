import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { aiDisclaimer, aiSolutions, Solution, SolutionResult, solutions } from "@/data/solutions";
import { toast } from "@/hooks/use-toast";
import {
  AlertTriangle,
  Bot,
  CheckCircle,
  Database,
  Eye,
  FileText,
  Loader2,
  Mic,
  Plus,
  Search,
  ThumbsDown,
  ThumbsUp,
  Upload,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { KnowledgeDialog } from "./KnowledgeDialog";
import { SolutionForm } from "./SolutionForm";

export const ProblemSubmission = () => {
  const [problem, setProblem] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [solution, setSolution] = useState<Solution>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ [key: string]: "helpful" | "not-helpful" | null }>({});

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setProblem("PLC error 4096 on line 3 - conveyor belt stopped");
      setIsListening(false);
      toast({
        title: "Voice input captured",
        description: "Problem description has been transcribed",
      });
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages((prev) => [...prev, ...files]);
    toast({
      title: "Images uploaded",
      description: `${files.length} image(s) added to your problem description`,
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!problem.trim() && uploadedImages.length === 0) return;

    setIsSearching(true);
    setSolution(null);

    setTimeout(() => {
      const hasKnowledgeBaseSolution = Math.random() > 0.3;

      if (hasKnowledgeBaseSolution) {
        setSolution(solutions[Math.floor(Math.random() * solutions.length)]);
      } else {
        setSolution(aiSolutions[Math.floor(Math.random() * aiSolutions.length)]);
      }
      setIsSearching(false);
    }, 1500);
  };

  const clearForm = () => {
    setProblem("");
    setUploadedImages([]);
    setSolution(null);
  };

  const handleViewDetails = () => {
    setIsDetailModalOpen(true);
  };

  const handleFeedback = (solutionId: string, type: "helpful" | "not-helpful") => {
    setFeedback((prev) => ({ ...prev, [solutionId]: type }));
    toast({
      title: "Feedback submitted",
      description: `Thank you for rating this solution as ${
        type === "helpful" ? "helpful" : "not helpful"
      }`,
    });
  };

  return (
    <section id="submit" className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Troubleshooting Hub</h2>
          <p className="text-slate-600">Search for solutions or contribute to our knowledge base</p>
        </div>

        <Tabs defaultValue="search" className="space-y-8">
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

                {/* Image Upload Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Add Images</span>
                  </div>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">
                          Click to upload images or drag and drop
                        </p>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <p className="text-xs text-slate-500 mt-1 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={(!problem.trim() && uploadedImages.length === 0) || isSearching}
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

                {/* Knowledge Base Result */}
                {solution && solution.verified && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Database className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-800">{solution.title}</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {Math.round(solution.confidence * 100)}% match
                          </Badge>
                          {solution.verified && (
                            <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
                          )}
                        </div>
                        <p className="text-slate-700 mb-4">{solution.description}</p>

                        {/* Solution Steps Preview */}
                        <div className="bg-white/70 p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-slate-800 mb-2">Solution Steps:</h4>
                          <ul className="space-y-1">
                            {solution.steps.slice(0, 3).map((step: string, index: number) => (
                              <li
                                key={index}
                                className="text-sm text-slate-700 flex items-start gap-2"
                              >
                                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                            {solution.steps.length > 3 && (
                              <li className="text-sm text-slate-500">
                                ...and {solution.steps.length - 3} more steps
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-xs text-slate-500">Verified solution</span>
                            </div>
                            {solution.documents.length > 0 && (
                              <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-xs text-slate-500">
                                  {solution.documents.length} documents
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleViewDetails}
                              className="border-green-300 text-green-700 hover:bg-green-50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="flex items-center gap-3 pt-3 border-t border-green-200">
                          <span className="text-sm text-slate-600">Was this solution helpful?</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeedback(solution.id, "helpful")}
                              className={`${
                                feedback[solution.id] === "helpful"
                                  ? "bg-green-100 text-green-700"
                                  : "text-slate-500 hover:text-green-600"
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeedback(solution.id, "not-helpful")}
                              className={`${
                                feedback[solution.id] === "not-helpful"
                                  ? "bg-red-100 text-red-700"
                                  : "text-slate-500 hover:text-red-600"
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Generated Result */}
                {solution && !solution.verified && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Bot className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-800">{solution.title}</h3>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            AI Generated
                          </Badge>
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            {Math.round(solution.confidence * 100)}% confidence
                          </Badge>
                        </div>
                        <p className="text-slate-700 mb-4">{solution.description}</p>

                        {/* AI Solution Steps Preview */}
                        <div className="bg-white/70 p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-slate-800 mb-2">
                            Troubleshooting Steps:
                          </h4>
                          <ul className="space-y-1">
                            {solution.steps.slice(0, 3).map((step: string, index: number) => (
                              <li
                                key={index}
                                className="text-sm text-slate-700 flex items-start gap-2"
                              >
                                <span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                            {solution.steps.length > 3 && (
                              <li className="text-sm text-slate-500">
                                ...and {solution.steps.length - 3} more steps
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-start gap-2 p-3 bg-orange-100/50 rounded-lg flex-1 mr-3">
                            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-orange-700">
                              <strong>AI Disclaimer:</strong> {aiDisclaimer}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleViewDetails}
                            className="border-orange-300 text-orange-700 hover:bg-orange-50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>

                        {/* Feedback Section for AI Solutions */}
                        <div className="flex items-center gap-3 pt-3 border-t border-orange-200">
                          <span className="text-sm text-slate-600">Was this solution helpful?</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeedback(solution.id, "helpful")}
                              className={`${
                                feedback[solution.id] === "helpful"
                                  ? "bg-green-100 text-green-700"
                                  : "text-slate-500 hover:text-green-600"
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeedback(solution.id, "not-helpful")}
                              className={`${
                                feedback[solution.id] === "not-helpful"
                                  ? "bg-red-100 text-red-700"
                                  : "text-slate-500 hover:text-red-600"
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
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

        <KnowledgeDialog
          solution={solution}
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
        />
      </div>
    </section>
  );
};
