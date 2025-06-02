import { Loader2, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useImageUpload } from "@/hooks/use-image-upload";
import {
  SolutionWithMatch,
  useSolutionSearch,
} from "@/hooks/use-solution-search";

import { ImageUploadSection } from "./ImageUploadSection";
import { InvestigationSkeleton } from "./InvestigationSkeleton";
import { KnowledgeBaseResult } from "./KnowledgeBaseResult";
import { KnowledgeDialog } from "./KnowledgeDialog";
import { SearchSkeleton } from "./SearchSkeleton";
import { VoiceInput } from "./VoiceInput";

export const ProblemSubmission = () => {
  const [problem, setProblem] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailSolution, setDetailSolution] = useState<SolutionWithMatch>(null);

  const {
    uploadedImages,
    handleImageUpload,
    removeImage,
    convertFirstImageToBase64,
    clearImages,
  } = useImageUpload();

  const {
    isSearching,
    isInvestigating,
    solutions,
    handleSearch,
    clearSearch,
    handleInvestigate,
  } = useSolutionSearch();

  const handleSubmit = async () => {
    if (!problem.trim() && uploadedImages.length === 0) return;
    clearSearch();
    const imageData = await convertFirstImageToBase64();
    handleSearch(problem, imageData);
  };

  const handleInvestigationStart = async () => {
    const imageData = await convertFirstImageToBase64();
    handleInvestigate(problem, imageData);
  };

  const clearForm = () => {
    setProblem("");
    clearImages();
    clearSearch();
  };

  return (
    <section id="submit" className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Troubleshooting Hub
          </h2>
          <p className="text-slate-600">
            Search for solutions or contribute to our knowledge base
          </p>
        </div>

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
              <VoiceInput onInputCapture={setProblem} />
            </div>

            <ImageUploadSection
              uploadedImages={uploadedImages}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSubmit}
                disabled={
                  (!problem.trim() && uploadedImages.length === 0) ||
                  isSearching ||
                  isInvestigating
                }
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : isInvestigating ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Investigating...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 w-4 h-4" />
                    Find Solution
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="border-slate-300"
                onClick={clearForm}
              >
                Clear
              </Button>
            </div>

            {isSearching && <SearchSkeleton />}

            {isInvestigating && <InvestigationSkeleton />}

            {solutions.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Search Results</h2>
                  <button
                    onClick={handleInvestigationStart}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Start AI Investigation
                  </button>
                </div>
                {solutions.map((solution) => {
                  return (
                    <KnowledgeBaseResult
                      key={solution.id}
                      solution={solution}
                      onViewDetails={(solution) => {
                        setIsDetailModalOpen(true);
                        setDetailSolution(solution);
                      }}
                    />
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <KnowledgeDialog
          solution={detailSolution}
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
        />
      </div>
    </section>
  );
};
