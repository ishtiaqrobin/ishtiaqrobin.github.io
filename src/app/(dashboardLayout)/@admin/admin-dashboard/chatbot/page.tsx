import { ChatbotManager } from "@/components/modules/dashboard/admin/chatbot/ChatbotManager";
import { chatbotService } from "@/services/chatbot.service";
import { sessionService } from "@/services/session.service";

export default async function AdminChatbotPage() {
  const session = await sessionService.getSession();
  const token = session.data?.session.token;

  const [aiConfigRes, chatbotConfigRes] = await Promise.all([
    chatbotService.getAiProviderConfig(token),
    chatbotService.getChatbotConfig(token),
  ]);

  return (
    <div className="min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chatbot</h1>
        <p className="mt-2 text-muted-foreground">
          Configure AI provider and chatbot behavior for your portfolio
        </p>
      </div>

      <ChatbotManager
        aiConfig={aiConfigRes.data}
        chatbotConfig={chatbotConfigRes.data}
        token={token}
      />
    </div>
  );
}
