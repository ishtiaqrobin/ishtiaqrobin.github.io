"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Bot,
  Key,
  Settings,
  Eye,
  EyeOff,
  Save,
  Loader2,
  Cpu,
  Thermometer,
  Hash,
  Link,
  ToggleLeft,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  upsertAiProviderConfigAction,
  upsertChatbotConfigAction,
} from "@/actions/chatbot.action";
import type { IAiProviderConfig, IChatbotConfig } from "@/types/chatbot.type";

interface ChatbotManagerProps {
  aiConfig: IAiProviderConfig | null;
  chatbotConfig: IChatbotConfig | null;
  token: string;
}

const PROVIDER_PRESETS: Record<
  string,
  { endpoint: string; modelPlaceholder: string; docsUrl: string }
> = {
  gemini: {
    endpoint: "",
    modelPlaceholder: "gemini-2.0-flash",
    docsUrl: "https://aistudio.google.com",
  },
  openai: {
    endpoint: "https://api.openai.com/v1/chat/completions",
    modelPlaceholder: "gpt-4o-mini",
    docsUrl: "https://platform.openai.com",
  },
  groq: {
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    modelPlaceholder: "llama-3.3-70b-versatile",
    docsUrl: "https://console.groq.com",
  },
  custom: {
    endpoint: "",
    modelPlaceholder: "your-model-name",
    docsUrl: "",
  },
};

export function ChatbotManager({
  aiConfig,
  chatbotConfig,
  token,
}: ChatbotManagerProps) {
  // ── AI Config state ───────────────────────────────────────
  const [provider, setProvider] = useState(aiConfig?.provider ?? "gemini");
  const [apiKey, setApiKey] = useState(aiConfig?.apiKey ?? "");
  const [model, setModel] = useState(aiConfig?.model ?? "");
  const [endpoint, setEndpoint] = useState(aiConfig?.endpoint ?? "");
  const [maxTokens, setMaxTokens] = useState(aiConfig?.maxTokens ?? 1000);
  const [temperature, setTemperature] = useState(aiConfig?.temperature ?? 0.7);
  const [aiEnabled, setAiEnabled] = useState(aiConfig?.isEnabled ?? true);
  const [showKey, setShowKey] = useState(false);
  const [aiSaving, setAiSaving] = useState(false);

  // ── Chatbot Config state ──────────────────────────────────
  const [botEnabled, setBotEnabled] = useState(
    chatbotConfig?.isEnabled ?? true,
  );
  const [botName, setBotName] = useState(
    chatbotConfig?.botName ?? "Ishtiaq's Assistant",
  );
  const [welcomeMsg, setWelcomeMsg] = useState(chatbotConfig?.welcomeMsg ?? "");
  const [systemPrompt, setSystemPrompt] = useState(
    chatbotConfig?.systemPrompt ?? "",
  );
  const [botSaving, setBotSaving] = useState(false);

  // ── Provider change — auto-fill preset ───────────────────
  const handleProviderChange = (val: string) => {
    setProvider(val);
    const preset = PROVIDER_PRESETS[val];
    if (preset) {
      setEndpoint(preset.endpoint);
      if (!model) setModel(preset.modelPlaceholder);
    }
  };

  // ── Save AI config ────────────────────────────────────────
  const handleSaveAiConfig = async () => {
    if (!apiKey || !model || !provider) {
      toast.error("Provider, API Key, and Model are required");
      return;
    }

    setAiSaving(true);
    const result = await upsertAiProviderConfigAction(
      {
        provider,
        apiKey,
        model,
        endpoint: endpoint || null,
        maxTokens,
        temperature,
        isEnabled: aiEnabled,
      },
      token,
    );

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setAiSaving(false);
  };

  // ── Save chatbot config ───────────────────────────────────
  const handleSaveBotConfig = async () => {
    setBotSaving(true);
    const result = await upsertChatbotConfigAction(
      {
        isEnabled: botEnabled,
        botName: botName || undefined,
        welcomeMsg: welcomeMsg || undefined,
        systemPrompt: systemPrompt || undefined,
      },
      token,
    );

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setBotSaving(false);
  };

  const preset = PROVIDER_PRESETS[provider];

  return (
    <Tabs defaultValue="ai-config" className="space-y-6">
      <TabsList className="grid grid-cols-2 w-full max-w-sm">
        <TabsTrigger value="ai-config" className="gap-2">
          <Key className="h-3.5 w-3.5" />
          AI Provider
        </TabsTrigger>
        <TabsTrigger value="bot-config" className="gap-2">
          <Settings className="h-3.5 w-3.5" />
          Chatbot
        </TabsTrigger>
      </TabsList>

      {/* ── AI Provider Config ── */}
      <TabsContent value="ai-config" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Cpu className="h-4 w-4 text-primary" />
                  AI Provider Settings
                </CardTitle>
                <CardDescription className="mt-1">
                  Configure which AI model powers your chatbot. Changes take
                  effect immediately.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={aiEnabled ? "default" : "secondary"}>
                  {aiEnabled ? "Enabled" : "Disabled"}
                </Badge>
                <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Provider */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Provider
              </Label>
              <Select value={provider} onValueChange={handleProviderChange}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="gemini">Google Gemini</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="groq">Groq (Free)</SelectItem>
                  <SelectItem value="custom">Custom / Other</SelectItem>
                </SelectContent>
              </Select>
              {preset?.docsUrl && (
                <p className="text-xs text-muted-foreground">
                  Get API key at{" "}
                  <a
                    href={preset.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    {preset.docsUrl}
                  </a>
                </p>
              )}
            </div>

            {/* API Key */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Key className="h-3 w-3" />
                API Key
              </Label>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key..."
                  className="h-10 pr-10 font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                Model Name
              </Label>
              <Input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={preset?.modelPlaceholder ?? "model-name"}
                className="h-10 font-mono text-sm"
              />
            </div>

            {/* Endpoint */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Link className="h-3 w-3" />
                Endpoint{" "}
                <span className="font-normal text-muted-foreground/60">
                  (optional)
                </span>
              </Label>
              <Input
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder={
                  provider === "gemini"
                    ? "Leave empty to use default"
                    : "https://api.example.com/v1/chat/completions"
                }
                className="h-10 font-mono text-sm"
              />
            </div>

            {/* Max Tokens */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                Max Tokens
                <span className="ml-auto font-normal text-foreground">
                  {maxTokens}
                </span>
              </Label>
              <Slider
                min={100}
                max={4000}
                step={100}
                value={[maxTokens]}
                onValueChange={([v]) => setMaxTokens(v)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground/60">
                <span>100 (concise)</span>
                <span>4000 (verbose)</span>
              </div>
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Thermometer className="h-3 w-3" />
                Temperature
                <span className="ml-auto font-normal text-foreground">
                  {temperature.toFixed(1)}
                </span>
              </Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={([v]) => setTemperature(v)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground/60">
                <span>0.0 (focused)</span>
                <span>1.0 (creative)</span>
              </div>
            </div>

            <Button
              onClick={handleSaveAiConfig}
              disabled={aiSaving}
              className="w-full"
            >
              {aiSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save AI Config
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── Chatbot Config ── */}
      <TabsContent value="bot-config" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bot className="h-4 w-4 text-primary" />
                  Chatbot Behavior
                </CardTitle>
                <CardDescription className="mt-1">
                  Customize how your chatbot appears and responds to visitors.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={botEnabled ? "default" : "secondary"}>
                  {botEnabled ? "Live" : "Hidden"}
                </Badge>
                <Switch checked={botEnabled} onCheckedChange={setBotEnabled} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Bot Name */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Bot className="h-3 w-3" />
                Bot Name
              </Label>
              <Input
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Ishtiaq's Assistant"
                className="h-10"
              />
            </div>

            {/* Welcome Message */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <MessageSquare className="h-3 w-3" />
                Welcome Message
              </Label>
              <Input
                value={welcomeMsg}
                onChange={(e) => setWelcomeMsg(e.target.value)}
                placeholder="Hi! Ask me anything about Ishtiaq 👋"
                className="h-10"
              />
            </div>

            {/* System Prompt */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ToggleLeft className="h-3 w-3" />
                System Prompt
                <span className="font-normal text-muted-foreground/60 ml-1">
                  — extra context for the AI
                </span>
              </Label>
              <Textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder={`My hourly rate is $25. I am available Monday–Friday, 9AM–6PM BST. I prefer long-term projects...`}
                className="min-h-[180px] font-mono text-sm resize-none rounded-xl"
              />
              <p className="text-xs text-muted-foreground">
                This is combined with live DB data (skills, projects,
                experience). Add anything the DB doesn&apos;t have — rates,
                availability, working style.
              </p>
            </div>

            <Button
              onClick={handleSaveBotConfig}
              disabled={botSaving}
              className="w-full"
            >
              {botSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Chatbot Config
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
