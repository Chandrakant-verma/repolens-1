import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useAI from "../../hooks/useAI";
import Logo from "../../components/ui/Logo";
import Button from "../../components/common/Button";

const Chat = () => {
  const navigate = useNavigate();
  const { repositoryId } = useParams();
  const { askQuestion } = useAI();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I'm RepoLens AI.\nAsk me anything about this repository.",
    },
  ]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;
    setQuestion("");

    try {
      setLoading(true);

      const response = await askQuestion(repositoryId, currentQuestion);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.answer,
        },
      ]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[var(--ink)] text-[var(--text)]">
      <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
        <Logo />
        <Button variant="ghost" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-5">
          {messages.map((message, index) => {
            const isUser = message.sender === "user";
            return (
              <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    isUser
                      ? "border border-[var(--border)] bg-[var(--surface-2)]"
                      : "border border-[var(--ai)]/30 bg-transparent"
                  }`}
                >
                  <strong className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    {isUser ? "You" : "AI"}:
                  </strong>
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-[var(--ai)]/30 px-4 py-3">
                <p className="font-mono text-xs text-[var(--text-muted)]">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
          <span className="font-mono text-[var(--code)]">›</span>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about the repository..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]/60"
          />
          <Button onClick={handleAsk} disabled={loading} className="!rounded-full !px-5 !py-2">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;