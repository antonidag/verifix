import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface VoiceInputProps {
  onInputCapture: (text: string) => void;
}

export const VoiceInput = ({ onInputCapture }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      onInputCapture("PLC error 4096 on line 3 - conveyor belt stopped");
      setIsListening(false);
      toast({
        title: "Voice input captured",
        description: "Problem description has been transcribed",
      });
    }, 2000);
  };

  return (
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
  );
};
