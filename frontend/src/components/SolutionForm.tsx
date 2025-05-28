import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Loader2,
  CheckCircle,
  Link as LinkIcon,
  Upload,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SolutionRequest, SolutionModel } from "@/api-client";
import { api } from "@/api/apiClient";

// Enums for form fields
enum MachineType {
  CONVEYOR = "Conveyor",
  ROBOT = "Robot",
  PLC = "PLC",
  PACKAGING = "Packaging Machine",
  PALLETIZER = "Palletizer",
  OTHER = "Other",
}

enum Manufacturer {
  ABB = "ABB",
  SIEMENS = "Siemens",
  FANUC = "Fanuc",
  ROCKWELL = "Rockwell",
  OMRON = "Omron",
  SCHNEIDER = "Schneider",
  OTHER = "Other",
}

enum DowntimeImpact {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

interface Link {
  title: string;
  url: string;
}

interface SolutionStep {
  id: string;
  content: string;
  order: number;
}

export const SolutionForm = () => {
  // Required fields
  const [problem, setProblem] = useState("");
  const [question, setQuestion] = useState("");
  const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);
  const [currentStep, setCurrentStep] = useState("");

  // Optional fields
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [currentLink, setCurrentLink] = useState<Link>({ title: "", url: "" });
  const [images, setImages] = useState<File[]>([]);
  const [errorCode, setErrorCode] = useState("");
  const [machineName, setMachineName] = useState("");
  const [machineType, setMachineType] = useState<MachineType | "">("");
  const [manufacturer, setManufacturer] = useState<Manufacturer | "">("");
  const [downtimeImpact, setDowntimeImpact] = useState<DowntimeImpact | "">("");
  const [safetyRelated, setSafetyRelated] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [department, setDepartment] = useState("");

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

  const addLink = () => {
    if (currentLink.title.trim() && currentLink.url.trim()) {
      setLinks([...links, { ...currentLink }]);
      setCurrentLink({ title: "", url: "" });
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addSolutionStep = () => {
    if (!currentStep.trim()) return;

    setSolutionSteps((steps) => [
      ...steps,
      {
        id: Math.random().toString(36).substr(2, 9),
        content: currentStep.trim(),
        order: steps.length + 1,
      },
    ]);
    setCurrentStep("");
  };

  const removeSolutionStep = (stepId: string) => {
    setSolutionSteps((steps) => {
      const filteredSteps = steps.filter((step) => step.id !== stepId);
      // Reorder remaining steps
      return filteredSteps.map((step, index) => ({
        ...step,
        order: index + 1,
      }));
    });
  };

  const moveStep = (stepId: string, direction: "up" | "down") => {
    setSolutionSteps((steps) => {
      const stepIndex = steps.findIndex((step) => step.id === stepId);
      if (
        (direction === "up" && stepIndex === 0) ||
        (direction === "down" && stepIndex === steps.length - 1)
      ) {
        return steps;
      }

      const newSteps = [...steps];
      const swapIndex = direction === "up" ? stepIndex - 1 : stepIndex + 1;

      // Swap the steps
      [newSteps[stepIndex], newSteps[swapIndex]] = [newSteps[swapIndex], newSteps[stepIndex]];

      // Update order numbers
      return newSteps.map((step, index) => ({
        ...step,
        order: index + 1,
      }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim() || !question.trim() || solutionSteps.length === 0) return;

    setIsSubmitting(true);

    try {
      const solution: SolutionModel = {
        text: problem.trim(),
        description: problem.trim(),
        solution_steps: solutionSteps.map((step) => step.content),
        tags: tags.join(","),
        error_code: errorCode || null,
        machine_name: machineName || null,
        machine_type: machineType || null,
        manufacturer: manufacturer || null,
        downtime_impact: downtimeImpact || null,
        safety_related: safetyRelated || null,
        plant_name: plantName || null,
        department: department || null,
        document_link: links.length > 0 ? links[0].url : null,
        verified: true,
      };

      const solutionRequest: SolutionRequest = {
        solution,
        question: question.trim(),
      };

      const response = await api.default.createSolution(solutionRequest);

      // If we have images, we would handle them here with additional API calls
      // This would typically involve uploading them to a storage service and
      // then associating them with the solution

      setIsSubmitted(true);
      toast({
        title: "Solution submitted successfully",
        description: "Your solution has been added to the knowledge base",
      });
    } catch (error) {
      console.error("Error submitting solution:", error);
      toast({
        title: "Error submitting solution",
        description: "There was a problem submitting your solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setProblem("");
    setQuestion("");
    setSolutionSteps([]);
    setCurrentStep("");
    setTags([]);
    setCurrentTag("");
    setLinks([]);
    setCurrentLink({ title: "", url: "" });
    setImages([]);
    setErrorCode("");
    setMachineName("");
    setMachineType("");
    setManufacturer("");
    setDowntimeImpact("");
    setSafetyRelated(false);
    setPlantName("");
    setDepartment("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">Solution Submitted!</h3>
          <p className="text-green-700 mb-6">Thank you for contributing to our knowledge base.</p>
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
          {/* Required Fields Section */}
          <div className="space-y-6">
            <h3 className="font-semibold text-slate-800">Required Information</h3>
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-slate-700 mb-2">
                Question *
              </label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What question does this solution answer? e.g., Why is the motor controller showing error 4096?"
                className="min-h-20 border-slate-300 focus:border-blue-500"
                required
              />
              <p className="mt-1 text-sm text-slate-500">
                Write this as a clear question that users might ask when they need this solution.
              </p>
            </div>

            <div>
              <label htmlFor="problem" className="block text-sm font-medium text-slate-700 mb-2">
                Problem Description *
              </label>
              <Textarea
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe the problem that this solution addresses..."
                className="min-h-20 border-slate-300 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="solution-steps"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Solution Steps *
              </label>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    id="solution-steps"
                    value={currentStep}
                    onChange={(e) => setCurrentStep(e.target.value)}
                    placeholder="Enter a solution step..."
                    className="min-h-20 border-slate-300 focus:border-blue-500"
                  />
                  <Button
                    type="button"
                    onClick={addSolutionStep}
                    size="sm"
                    variant="outline"
                    className="h-auto"
                    disabled={!currentStep.trim()}
                  >
                    <Plus className="w-4 h-4" />
                    Add Step
                  </Button>
                </div>

                <div className="space-y-2">
                  {solutionSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-medium">
                        {step.order}
                      </div>
                      <p className="flex-1 text-slate-700">{step.content}</p>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStep(step.id, "up")}
                          disabled={index === 0}
                          className="h-8 w-8 p-0"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStep(step.id, "down")}
                          disabled={index === solutionSteps.length - 1}
                          className="h-8 w-8 p-0"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSolutionStep(step.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {solutionSteps.length === 0 && (
                  <p className="text-sm text-slate-500 italic">Add at least one solution step</p>
                )}
              </div>
            </div>
          </div>

          {/* Optional Fields Section */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h3 className="font-semibold text-slate-800">Additional Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="errorCode"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Error Code
                </label>
                <Input
                  id="errorCode"
                  value={errorCode}
                  onChange={(e) => setErrorCode(e.target.value)}
                  placeholder="e.g., ERR-1234"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="machineName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Machine Name
                </label>
                <Input
                  id="machineName"
                  value={machineName}
                  onChange={(e) => setMachineName(e.target.value)}
                  placeholder="e.g., Line 1 Conveyor"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="machineType"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Machine Type
                </label>
                <Select
                  value={machineType}
                  onValueChange={(value) => setMachineType(value as MachineType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select machine type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MachineType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="manufacturer"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Manufacturer
                </label>
                <Select
                  value={manufacturer}
                  onValueChange={(value) => setManufacturer(value as Manufacturer)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select manufacturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Manufacturer).map((mfg) => (
                      <SelectItem key={mfg} value={mfg}>
                        {mfg}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="downtimeImpact"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Downtime Impact
                </label>
                <Select
                  value={downtimeImpact}
                  onValueChange={(value) => setDowntimeImpact(value as DowntimeImpact)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(DowntimeImpact).map((impact) => (
                      <SelectItem key={impact} value={impact}>
                        {impact}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="plantName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Plant Name
                </label>
                <Input
                  id="plantName"
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                  placeholder="e.g., Plant B"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Department
                </label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g., Packaging"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="safetyRelated"
                  checked={safetyRelated}
                  onCheckedChange={setSafetyRelated}
                />
                <Label htmlFor="safetyRelated">Safety Related Issue</Label>
              </div>
            </div>

            {/* Links Section */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Helpful Links</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={currentLink.title}
                  onChange={(e) => setCurrentLink({ ...currentLink, title: e.target.value })}
                  placeholder="Link title"
                  className="border-slate-300 focus:border-blue-500"
                />
                <Input
                  value={currentLink.url}
                  onChange={(e) => setCurrentLink({ ...currentLink, url: e.target.value })}
                  placeholder="URL"
                  className="border-slate-300 focus:border-blue-500"
                />
                <Button
                  type="button"
                  onClick={addLink}
                  size="sm"
                  variant="outline"
                  disabled={!currentLink.title || !currentLink.url}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                    <LinkIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm flex-1">{link.title}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-slate-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="border-slate-300 focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm" variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Images Section */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Images</label>
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
                    <p className="text-xs text-slate-500">PNG, JPG up to 10MB each</p>
                  </div>
                </label>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {images.map((file, index) => (
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
          </div>

          <Button
            type="submit"
            disabled={
              !problem.trim() || !question.trim() || solutionSteps.length === 0 || isSubmitting
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
