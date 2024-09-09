"use strict";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Check } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "ai";
  timestamp: string;
}

export function ChatBubble({ message, sender, timestamp }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${sender === "user" ? "flex-row-reverse" : "flex-row"} items-end`}>
        <Avatar className="w-8 h-8">
          <img
            alt={sender === "user" ? "User Avatar" : "AI Avatar"}
            src="/placeholder.svg?height=32&width=32"
          />
        </Avatar>
        <div className={`mx-2 ${sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"} rounded-lg p-3 max-w-md`}>
          <p className="text-sm">{message}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs opacity-50">{timestamp}</span>
            {sender === "ai" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {copied ? "Copied!" : "Copy to clipboard"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}