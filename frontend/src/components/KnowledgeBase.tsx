import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Database,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const recentSolutions = [
  {
    id: "SOL-001",
    title: "Motor Controller Communication Fault",
    problem: "PLC error 4096 on production line",
    solution:
      "1. Reset the PLC using the master control panel\n2. Check cable connections to ensure they are secure\n3. Verify input settings in panel B match the configuration manual\n4. If issue persists, check for electromagnetic interference from nearby equipment\n5. Contact technical support if error continues after these steps",
    status: "verified",
    confidence: 0.95,
    usageCount: 23,
    lastUsed: "2 hours ago",
    tags: ["plc", "error-4096", "communication"],
    documentationLinks: [
      "https://internal.docs/plc-errors/4096",
      "https://manual.plc-systems.com/troubleshooting",
    ],
    createdAt: "2024-05-20T15:30:00Z",
  },
  {
    id: "SOL-002",
    title: "Hydraulic Pressure Drop",
    problem: "Pressure alarm on hydraulic system",
    solution:
      "1. Check hydraulic fluid levels in the main reservoir\n2. Inspect all hydraulic lines for leaks or damage\n3. Verify pump operation and pressure settings\n4. Clean or replace hydraulic filters if clogged\n5. Calibrate pressure sensors if readings are inconsistent",
    status: "pending",
    confidence: 0.87,
    usageCount: 8,
    lastUsed: "1 day ago",
    tags: ["hydraulic", "pressure", "alarm"],
    documentationLinks: ["https://internal.docs/hydraulic-systems"],
    createdAt: "2024-05-22T09:15:00Z",
  },
  {
    id: "SOL-003",
    title: "Temperature Sensor Calibration",
    problem: "Temperature readings inconsistent",
    solution:
      "1. Power down the system and wait for cool down\n2. Remove temperature sensor and clean the probe\n3. Use calibrated reference thermometer for comparison\n4. Adjust sensor offset in control system settings\n5. Test sensor response across temperature range\n6. Document new calibration values",
    status: "verified",
    confidence: 0.92,
    usageCount: 15,
    lastUsed: "3 hours ago",
    tags: ["temperature", "sensor", "calibration"],
    documentationLinks: ["https://internal.docs/sensor-calibration"],
    createdAt: "2024-05-21T11:45:00Z",
  },
];

export const KnowledgeBase = () => {
  const [selectedSolution, setSelectedSolution] = useState(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The solution has been copied to your clipboard",
    });
  };

  const formatSolutionSteps = (solution: string) => {
    return solution.split("\n").map((step, index) => (
      <div key={index} className="mb-2">
        {step.trim()}
      </div>
    ));
  };

  return (
    <section id="knowledge" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Knowledge Base
        </h2>
        <p className="text-slate-600">
          Self-learning system that grows smarter over time
        </p>
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
              {recentSolutions.map((solution) => (
                <div
                  key={solution.id}
                  className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800">
                        {solution.title}
                      </h3>
                      {solution.status === "verified" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {solution.id}
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-600 mb-3">
                    {solution.problem}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>
                        {Math.round(solution.confidence * 100)}% confidence
                      </span>
                      <span>Used {solution.usageCount} times</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {solution.lastUsed}
                      </span>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <div className="flex items-center justify-between mb-2">
                            <DialogTitle className="text-xl">
                              {solution.title}
                            </DialogTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {solution.id}
                              </Badge>
                              {solution.status === "verified" ? (
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Pending Review
                                </Badge>
                              )}
                            </div>
                          </div>
                          <DialogDescription className="text-base">
                            {solution.problem}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-lg font-semibold text-slate-800">
                                Solution Steps
                              </h3>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(solution.solution)
                                }
                                className="text-slate-600"
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copy
                              </Button>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700">
                              {formatSolutionSteps(solution.solution)}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-2">
                                Statistics
                              </h4>
                              <div className="space-y-1 text-sm text-slate-600">
                                <div>
                                  Confidence:{" "}
                                  {Math.round(solution.confidence * 100)}%
                                </div>
                                <div>
                                  Usage Count: {solution.usageCount} times
                                </div>
                                <div>Last Used: {solution.lastUsed}</div>
                                <div>
                                  Created:{" "}
                                  {new Date(
                                    solution.createdAt,
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-slate-800 mb-2">
                                Tags
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {solution.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {solution.documentationLinks &&
                            solution.documentationLinks.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-slate-800 mb-2">
                                  Documentation Links
                                </h4>
                                <div className="space-y-2">
                                  {solution.documentationLinks.map(
                                    (link, index) => (
                                      <a
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                        {link}
                                      </a>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
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
                <div className="text-3xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-blue-700">Total Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">94%</div>
                <div className="text-sm text-green-700">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">156</div>
                <div className="text-sm text-purple-700">
                  Problems Solved Today
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <code className="bg-slate-100 px-2 py-1 rounded text-green-600">
                  POST /ask
                </code>
                <p className="text-slate-600 mt-1">Search for solutions</p>
              </div>
              <div className="text-sm">
                <code className="bg-slate-100 px-2 py-1 rounded text-blue-600">
                  POST /solution
                </code>
                <p className="text-slate-600 mt-1">Add new solution</p>
              </div>
              <div className="text-sm">
                <code className="bg-slate-100 px-2 py-1 rounded text-purple-600">
                  POST /investigate
                </code>
                <p className="text-slate-600 mt-1">Start investigation</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
