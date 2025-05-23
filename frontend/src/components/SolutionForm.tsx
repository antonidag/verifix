import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const SolutionForm = () => {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problem.trim() || !solution.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      toast({
        title: "Solution submitted successfully",
        description: "Your solution has been added to the knowledge base",
      });
    }, 1500);
  };

  const resetForm = () => {
    setTitle("");
    setProblem("");
    setSolution("");
    setTags([]);
    setCurrentTag("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Solution Submitted!
          </h3>
          <p className="text-green-700 mb-6">
            Thank you for contributing to our knowledge base.
          </p>
          <Button
            onClick={resetForm}
            variant="outline"
            className="border-green-300 hover:bg-green-50"
          >
            Submit Another Solution
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" />
          Submit a Solution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Solution Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Motor Controller Communication Fault"
              className="border-slate-300 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="problem"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Problem Description
            </label>
            <Textarea
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe the problem that this solution addresses..."
              className="min-h-20 border-slate-300 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="solution"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Solution Steps
            </label>
            <Textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Provide detailed steps to resolve the problem..."
              className="min-h-32 border-slate-300 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag..."
                className="border-slate-300 focus:border-blue-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button
                type="button"
                onClick={addTag}
                size="sm"
                variant="outline"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={
              !title.trim() ||
              !problem.trim() ||
              !solution.trim() ||
              isSubmitting
            }
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Plus className="mr-2 w-4 h-4" />
                Submit Solution
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
