import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { solutions } from "@/data/solutions";
import { AlertCircle, CheckCircle, Clock, Database, TrendingUp } from "lucide-react";
import { KnowledgeDialog } from "./KnowledgeDialog";

export const KnowledgeBase = () => {
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
              {solutions.map((solution) => (
                <div
                  key={solution.id}
                  className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800">{solution.title}</h3>
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

                  <p className="text-sm text-slate-600 mb-3">{solution.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{Math.round(solution.confidence * 100)}% confidence</span>
                      <span>Used {solution.usageCount} times</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {solution.lastUsed}
                      </span>
                    </div>

                    <KnowledgeDialog solution={solution} />
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
                <div className="text-sm text-purple-700">Problems Solved Today</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
