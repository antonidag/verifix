import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { openChat, useChatContext } from "@/hooks/use-chat-context";
import { Bot, Maximize2, MessageCircle, Minimize2, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { VefiApi, AskRequestModel } from '@/api-client';

// Initialize the API client
const api = new VefiApi({
    BASE: 'http://localhost:8000'
});

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

  const generateBotResponse = async (userInput: string) => {
    try {
        const request: AskRequestModel = {
            question: userInput
        };
        
        const response = await api.default.chat(request);
        return response.message;
    } catch (error) {
        console.error('Error getting response:', error);
        return "I apologize, but I encountered an error while processing your request. Please try again or rephrase your question.";
    }
  };

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

    try {
        const botResponse = await generateBotResponse(currentMessage);
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: botResponse,
            sender: "bot",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error('Error in chat:', error);
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: "I apologize, but I encountered an error. Please try again.",
            sender: "bot",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsTyping(false);
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
