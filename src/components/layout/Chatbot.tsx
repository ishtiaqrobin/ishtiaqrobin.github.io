"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2, Bot, User, RotateCcw, Trash } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { chatbotService } from "@/services/chatbot.service";
import type { IChatMessage } from "@/types/chatbot.type";
import ChatbotIcon from "./ChatbotIcon";
import { IoArrowUpOutline } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Textarea } from "../ui/textarea";
import { RiDeleteBinLine } from "react-icons/ri";

// ── Session ID — persistent per browser tab ───────────────
const getSessionId = (): string => {
  const key = "chatbot_session_id";
  if (typeof window === "undefined") return crypto.randomUUID();
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
};

const WELCOME_MESSAGE: IChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Ishtiaq's assistant. Ask me anything about his skills, projects, or how to hire him!",
  timestamp: new Date(),
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<IChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(getSessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // Add user message immediately
    const userMsg: IChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const { data, error } = await chatbotService.sendMessage({
      message: text,
      sessionId,
    });

    if (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: error.message.includes("Too many requests")
            ? `⏳ ${error.message}`
            : "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } else if (data) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        },
      ]);
    }

    setIsLoading(false);
  }, [input, isLoading, sessionId]);

  // isLoading false হলে focus restore করো
  useEffect(() => {
    if (!isLoading && isOpen) {
      inputRef.current?.focus();
    }
  }, [isLoading, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    sessionStorage.removeItem("chatbot_session_id");
    // window.location.reload(); // new session id
  };

  return (
    <>
      {/* ── Floating Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            // max-h-[600px]
            className="fixed bottom-38 sm:bottom-26 right-4 sm:right-7 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[600px] flex flex-col rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-2">
                {/* <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
                </div> */}
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-text-primary"
                  >
                    <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-primary font-medium leading-5">
                    Assistant{" "}
                    <span className="text-[#71717a] dark:text-[#a1a1aa]">
                      build by Ishtiaq
                    </span>
                  </p>
                  {/* <p className="text-xs text-muted-foreground mt-0.5">
                    Always here to help
                  </p> */}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-text-primary cursor-pointer"
                  onClick={handleReset}
                  title="Reset conversation"
                >
                  <RiDeleteBinLine className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-text-primary cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-[420px] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5 items-end",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full shrink-0 flex items-center justify-center mb-0.5",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="h-3 w-3" />
                    ) : (
                      // <Bot className="h-3 w-3 text-primary" />
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 text-primary"
                      >
                        <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
                      </svg>
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={cn(
                      "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-zinc-200/50 dark:bg-zinc-800/50 text-foreground rounded-bl-sm",
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-end">
                  {/* <div className="w-6 h-6 rounded-full bg-muted shrink-0 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary" />
                  </div> */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 text-primary"
                  >
                    <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
                  </svg>
                  <div className="bg-zinc-200/50 dark:bg-zinc-800/50 px-3.5 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2 border-t border-border/50 bg-muted/20">
              <div className="relative flex gap-2 items-center">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="h-14 rounded-xl bg-background border border-zinc-200 dark:border-zinc-800 text-sm focus-visible:ring-2"
                  disabled={isLoading}
                  maxLength={500}
                />
                <Button
                  size="icon"
                  className={`absolute right-2.5 bottom-3 w-8 h-8 rounded-full shrink-0
                    ${!input.trim() ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? (
                    <MdCheckBoxOutlineBlank className="h-4 w-4" />
                  ) : (
                    <IoArrowUpOutline className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {/* <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
                Powered by AI · Answers may not always be accurate
              </p> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Toggle Button ── */}
      <TooltipProvider delayDuration={300}>
        <Tooltip open={isOpen ? false : undefined}>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => setIsOpen((prev) => !prev)}
              className={cn(
                "fixed bottom-20 sm:bottom-6 right-4 sm:right-7 z-50 transition-colors duration-200",
              )}
              aria-label={isOpen ? "Close chat" : "Open chat"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChatbotIcon />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Open Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Unread dot — show when closed and messages > 1 */}
      {!isOpen && messages.length > 1 && (
        <span className="fixed bottom-30 sm:bottom-17 right-4 sm:right-7 z-50 w-3 h-3 rounded-full bg-primary border-2 border-background pointer-events-none" />
      )}
    </>
  );
}
