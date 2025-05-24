import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { openChat, useChatContext } from "@/hooks/use-chat-context";
import { Bot, Maximize2, MessageCircle, Minimize2, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const LiveChat = () => {
  const { context, isOpen, closeChatContext } = useChatContext();
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant. I can help you with troubleshooting questions, explain solutions, or guide you through technical procedures. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle solution context when it's provided
  useEffect(() => {
    if (context?.solution) {
      setIsMinimized(false);

      const contextMessage: Message = {
        id: `context-${Date.now()}`,
        content: `I see you're asking about the solution: "${context.solution.title}". This is a ${
          context.solution.verified ? "verified" : "ai"
        } solution. How can I help you with this specific solution?`,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, contextMessage]);
    }
  }, [context]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response with context awareness
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(currentMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    // Context-aware responses if we have solution context
    if (context?.solution) {
      if (input.includes("step") || input.includes("how")) {
        return `For the solution "${context.solution.title}", let me walk you through the steps. Would you like me to explain any specific step in more detail?`;
      } else if (input.includes("why") || input.includes("explain")) {
        return `This ${
          context.solution.verified ? "verified" : "ai"
        } solution works by addressing the root cause described in: ${
          context.solution.description
        }. What specific aspect would you like me to explain further?`;
      } else if (input.includes("alternative") || input.includes("different")) {
        return `If this solution doesn't work for your specific case, I can suggest alternative approaches. Can you tell me more about what's happening when you try these steps?`;
      }
    }

    if (input.includes("plc") || input.includes("error")) {
      return "For PLC errors, I recommend first checking the error code in your system manual. Common issues include communication faults, power supply problems, or sensor malfunctions. Would you like me to walk you through the basic troubleshooting steps?";
    } else if (input.includes("motor") || input.includes("controller")) {
      return "Motor controller issues can be tricky. Start by checking your power connections, communication cables, and parameter settings. Is the motor controller showing any specific error codes or LED indicators?";
    } else if (input.includes("hydraulic") || input.includes("pressure")) {
      return "Hydraulic pressure issues often stem from fluid levels, pump problems, or filter blockages. Have you checked the hydraulic fluid level and condition recently? I can guide you through a systematic diagnosis.";
    } else if (input.includes("temperature") || input.includes("sensor")) {
      return "Temperature sensor problems usually involve calibration, wiring, or environmental factors. Are you seeing consistent readings or erratic behavior? Let me help you isolate the issue.";
    } else if (input.includes("help") || input.includes("how")) {
      return "I'm here to help! I can assist with troubleshooting equipment issues, explaining technical procedures, interpreting error codes, or guiding you through maintenance tasks. What specific area would you like help with?";
    } else {
      return "I understand you're looking for assistance. Could you provide more details about the specific equipment or issue you're dealing with? The more information you share, the better I can help you troubleshoot the problem.";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-100">
        <Button
          onClick={() => openChat()}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-[100] transition-all duration-300 ${
        isMinimized ? "w-80 h-12" : "w-80 h-96"
      }`}
    >
      <Card className="flex flex-col h-full shadow-xl border-blue-200">
        <CardHeader className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-sm">AI Assistant</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Online
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeChatContext}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 h-0 flex flex-col flex-grow">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.sender === "user" ? "bg-blue-100" : "bg-slate-100"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Bot className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.sender === "user" ? "text-right" : ""}`}>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white ml-4"
                          : "bg-slate-100 text-slate-800 mr-4"
                      }`}
                    >
                      {message.content}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 px-3">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-full bg-slate-100">
                    <Bot className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="bg-slate-100 text-slate-800 p-3 rounded-lg mr-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 text-sm border-slate-300"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
