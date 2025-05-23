import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const ApiDocs = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-slate-900">
            API Documentation
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Integrate with Verifix's troubleshooting engine through our REST API
          </p>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Authentication
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">
                  All API requests require an API key to be included in the
                  request headers:
                </p>
                <div className="bg-slate-800 text-white p-4 rounded-md mb-4 font-mono text-sm overflow-x-auto">
                  <div className="flex justify-between items-center">
                    <span>Authorization: Bearer YOUR_API_KEY</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard("Authorization: Bearer YOUR_API_KEY")
                      }
                      className="text-slate-300 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  Contact your administrator to get your API key.
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="ask">
            <TabsList className="grid grid-cols-3 w-full max-w-lg">
              <TabsTrigger value="ask">Ask Endpoint</TabsTrigger>
              <TabsTrigger value="solution">Solution Endpoint</TabsTrigger>
              <TabsTrigger value="investigate">
                Investigate Endpoint
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ask" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-600">POST</Badge>
                    <span className="font-mono text-slate-800">/ask</span>
                  </div>
                  <CardTitle className="text-xl">
                    Find Solutions to Problems
                  </CardTitle>
                  <CardDescription>
                    Submit a question or problem description to find the most
                    relevant solution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Request Body
                      </h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "question": "PLC error 4096 on line 3"
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "question": "PLC error 4096 on line 3"\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Response (Found Solution)
                      </h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "solution_found": true,
  "solution": {
    "id": "sol_12345",
    "title": "Fixing PLC Error 4096",
    "problem": "PLC error 4096 on line 3 during startup sequence",
    "solution": "1. Reset the PLC using the master control panel\\n2. Check cable connections\\n3. Verify input settings in panel B",
    "confidence": 0.92,
    "tags": ["plc", "error-4096", "line-3"],
    "created_at": "2023-05-20T15:30:00Z",
    "documentation_links": ["https://internal.docs/plc-errors/4096"]
  }
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "solution_found": true,\n  "solution": {\n    "id": "sol_12345",\n    "title": "Fixing PLC Error 4096",\n    "problem": "PLC error 4096 on line 3 during startup sequence",\n    "solution": "1. Reset the PLC using the master control panel\\n2. Check cable connections\\n3. Verify input settings in panel B",\n    "confidence": 0.92,\n    "tags": ["plc", "error-4096", "line-3"],\n    "created_at": "2023-05-20T15:30:00Z",\n    "documentation_links": ["https://internal.docs/plc-errors/4096"]\n  }\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Response (AI-Generated Solution)
                      </h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "solution_found": false,
  "ai_solution": {
    "title": "Potential Fix for PLC Error 4096",
    "analysis": "Error 4096 typically indicates a memory corruption issue in the PLC firmware",
    "suggested_solution": "1. Power cycle the entire system\\n2. Upload firmware version 2.3 or later\\n3. Check for interference from nearby equipment",
    "confidence": "medium",
    "sources": ["Technical manual v3.2", "Similar case reports"]
  }
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "solution_found": false,\n  "ai_solution": {\n    "title": "Potential Fix for PLC Error 4096",\n    "analysis": "Error 4096 typically indicates a memory corruption issue in the PLC firmware",\n    "suggested_solution": "1. Power cycle the entire system\\n2. Upload firmware version 2.3 or later\\n3. Check for interference from nearby equipment",\n    "confidence": "medium",\n    "sources": ["Technical manual v3.2", "Similar case reports"]\n  }\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="solution" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-600">POST</Badge>
                    <span className="font-mono text-slate-800">/solution</span>
                  </div>
                  <CardTitle className="text-xl">Add a New Solution</CardTitle>
                  <CardDescription>
                    Document a new solution to be added to the knowledge base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Request Body
                      </h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "title": "Motor Controller Communication Fault",
  "problem": "Motor controller shows red communication fault light and error E-135",
  "solution": "1. Check ethernet cable connection\\n2. Verify IP settings match documentation\\n3. Reset controller by power cycling",
  "tags": ["motor", "communication", "e-135"],
  "documentation_links": ["https://example.com/docs/motor-errors"]
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "title": "Motor Controller Communication Fault",\n  "problem": "Motor controller shows red communication fault light and error E-135",\n  "solution": "1. Check ethernet cable connection\\n2. Verify IP settings match documentation\\n3. Reset controller by power cycling",\n  "tags": ["motor", "communication", "e-135"],\n  "documentation_links": ["https://example.com/docs/motor-errors"]\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Response</h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "solution_id": "sol_67890",
  "status": "created",
  "created_at": "2024-05-23T13:45:22Z"
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "solution_id": "sol_67890",\n  "status": "created",\n  "created_at": "2024-05-23T13:45:22Z"\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-600">GET</Badge>
                    <span className="font-mono text-slate-800">
                      /solution/{"{solution_id}"}
                    </span>
                  </div>
                  <CardTitle className="text-xl">Get Solution by ID</CardTitle>
                  <CardDescription>
                    Retrieve details for a specific solution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Response</h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "id": "sol_67890",
  "title": "Motor Controller Communication Fault",
  "problem": "Motor controller shows red communication fault light and error E-135",
  "solution": "1. Check ethernet cable connection\\n2. Verify IP settings match documentation\\n3. Reset controller by power cycling",
  "tags": ["motor", "communication", "e-135"],
  "documentation_links": ["https://example.com/docs/motor-errors"],
  "created_at": "2024-05-23T13:45:22Z",
  "view_count": 12
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "id": "sol_67890",\n  "title": "Motor Controller Communication Fault",\n  "problem": "Motor controller shows red communication fault light and error E-135",\n  "solution": "1. Check ethernet cable connection\\n2. Verify IP settings match documentation\\n3. Reset controller by power cycling",\n  "tags": ["motor", "communication", "e-135"],\n  "documentation_links": ["https://example.com/docs/motor-errors"],\n  "created_at": "2024-05-23T13:45:22Z",\n  "view_count": 12\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investigate" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-600">POST</Badge>
                    <span className="font-mono text-slate-800">
                      /investigate
                    </span>
                  </div>
                  <CardTitle className="text-xl">
                    Start an AI Investigation
                  </CardTitle>
                  <CardDescription>
                    Submit a complex problem for detailed AI analysis when no
                    immediate solution exists
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Request Body
                      </h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "problem": "Conveyor system randomly stops with error code BZX-441 every 2-3 hours",
  "system_details": "Model XJ-2000, firmware v5.6.2, installed January 2024",
  "troubleshooting_done": "Replaced power supply, checked all sensors, verified voltages"
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "problem": "Conveyor system randomly stops with error code BZX-441 every 2-3 hours",\n  "system_details": "Model XJ-2000, firmware v5.6.2, installed January 2024",\n  "troubleshooting_done": "Replaced power supply, checked all sensors, verified voltages"\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Response</h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "investigation_id": "inv_54321",
  "status": "in_progress",
  "estimated_completion_time": "2024-05-23T15:30:00Z",
  "initial_findings": "Error BZX-441 is typically associated with timing issues in the control loop. Initial analysis suggests possible electromagnetic interference or a firmware bug in v5.6.2."
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "investigation_id": "inv_54321",\n  "status": "in_progress",\n  "estimated_completion_time": "2024-05-23T15:30:00Z",\n  "initial_findings": "Error BZX-441 is typically associated with timing issues in the control loop. Initial analysis suggests possible electromagnetic interference or a firmware bug in v5.6.2."\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-600">GET</Badge>
                    <span className="font-mono text-slate-800">
                      /investigate/{"{investigation_id}"}
                    </span>
                  </div>
                  <CardTitle className="text-xl">
                    Check Investigation Status
                  </CardTitle>
                  <CardDescription>
                    Get the status and results of an ongoing or completed
                    investigation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Response (Completed Investigation)
                      </h3>
                      <div className="bg-slate-800 text-white p-4 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                        {`{
  "investigation_id": "inv_54321",
  "status": "completed",
  "problem": "Conveyor system randomly stops with error code BZX-441 every 2-3 hours",
  "findings": {
    "root_cause": "Firmware bug in v5.6.2 causing timer overflow after exactly 150 minutes of operation",
    "evidence": "Log analysis shows consistent timing pattern, error always occurs at 150 minute mark",
    "recommended_solution": "1. Update firmware to v5.6.3 which contains the fix\\n2. If update not possible, implement a scheduled restart every 140 minutes\\n3. Contact manufacturer for permanent solution",
    "confidence": "high",
    "references": [
      "Manufacturer bulletin TB-2024-03",
      "Similar issue reported in 3 other installations"
    ]
  },
  "completed_at": "2024-05-23T15:28:45Z"
}`}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            '{\n  "investigation_id": "inv_54321",\n  "status": "completed",\n  "problem": "Conveyor system randomly stops with error code BZX-441 every 2-3 hours",\n  "findings": {\n    "root_cause": "Firmware bug in v5.6.2 causing timer overflow after exactly 150 minutes of operation",\n    "evidence": "Log analysis shows consistent timing pattern, error always occurs at 150 minute mark",\n    "recommended_solution": "1. Update firmware to v5.6.3 which contains the fix\\n2. If update not possible, implement a scheduled restart every 140 minutes\\n3. Contact manufacturer for permanent solution",\n    "confidence": "high",\n    "references": [\n      "Manufacturer bulletin TB-2024-03",\n      "Similar issue reported in 3 other installations"\n    ]\n  },\n  "completed_at": "2024-05-23T15:28:45Z"\n}'
                          )
                        }
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Response Codes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-slate-200 px-4 py-2 text-left">
                      Code
                    </th>
                    <th className="border border-slate-200 px-4 py-2 text-left">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        200
                      </Badge>
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      Success - The request was successful
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200"
                      >
                        400
                      </Badge>
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      Bad Request - Missing or invalid parameters
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200"
                      >
                        401
                      </Badge>
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      Unauthorized - Invalid API key
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200"
                      >
                        404
                      </Badge>
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      Not Found - Resource not found
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200"
                      >
                        500
                      </Badge>
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      Server Error - Something went wrong on our end
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Need Help?
            </h2>
            <p className="text-blue-700 mb-4">
              If you need assistance integrating with our API or have any
              questions, our support team is here to help.
            </p>
            <div className="flex items-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                View GitHub Examples
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApiDocs;
