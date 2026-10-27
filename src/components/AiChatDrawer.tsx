import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage, TabType } from '../types';

interface AiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onNavigateTab: (tab: TabType) => void;
}

export const AiChatDrawer: React.FC<AiChatDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery,
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial query trigger
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: messages.slice(-4),
        }),
      });

      let replyText = '';
      const data = await response.json().catch(() => null);
      if (data && typeof data.reply === 'string' && data.reply.trim()) {
        replyText = data.reply.trim();
      }

      if (!replyText) {
        replyText = 'Pranav Gawande is a Full-Stack Developer specializing in Modern Web Technologies, High-Performance Microservices, and Scalable Cloud Architectures. Feel free to ask about his skills, experience, or reach out at pranavgawande59@gmail.com.';
      }

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Chat request issue, using grounded fallback:', err);
      // Fallback
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: `### Pranav Gawande — Full-Stack Developer
- **Core Skills**: React, Next.js, Node.js, Python, Java, SQL, Docker, AWS Cloud
- **Specialization**: Full-Stack Architecture, Distributed Systems & Cloud Microservices
- **Education**: BCA from CMCS Yavatmal, MCA from SPPU (Top 5%)
- **Email**: pranavgawande59@gmail.com`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl h-[85vh] max-h-[750px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-colors">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#0f172a] text-sm sm:text-base">
                  Ved — AI Assistant
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e0f2fe] text-[#0369a1]">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#64748b]">Powered by portfolio knowledge</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                title="Clear conversation"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#fcfdfe]">
          {messages.length === 0 && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#64748b]">
              <div className="w-12 h-12 rounded-2xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center mb-3">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-[#0f172a] mb-1">How can I help you?</h4>
              <p className="text-xs sm:text-sm max-w-sm mb-4 text-gray-500">
                Ask about Pranav's technical skills, experience, project implementations, publications, or contact info.
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                <button
                  onClick={() => handleSendMessage('Tell me about Pranav Gawande.')}
                  className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[#334155] hover:border-[#0284c7] hover:text-[#0284c7] transition-all"
                >
                  Tell me about Pranav
                </button>
                <button
                  onClick={() => handleSendMessage('What are his top projects?')}
                  className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[#334155] hover:border-[#0284c7] hover:text-[#0284c7] transition-all"
                >
                  Top Projects
                </button>
                <button
                  onClick={() => handleSendMessage('Why should I hire him?')}
                  className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[#334155] hover:border-[#0284c7] hover:text-[#0284c7] transition-all"
                >
                  Why Hire Him?
                </button>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#0284c7] text-white rounded-tr-xs'
                    : 'bg-white border border-gray-200 text-[#1e293b] rounded-tl-xs shadow-2xs'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="prose prose-sm max-w-none text-[#1e293b] prose-headings:text-[#0f172a] prose-headings:font-bold prose-headings:text-sm prose-strong:text-[#0f172a] prose-ul:my-1 prose-li:my-0.5">
                      <Markdown>{msg.text}</Markdown>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 text-[11px] text-[#94a3b8]">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-[#0284c7] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-bounce" />
                <span className="text-xs text-[#64748b] ml-1">Analyzing portfolio...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Navigation footer shortcuts */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-[#64748b]">
          <span>Explore deep views:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateTab('about');
              }}
              className="text-[#0284c7] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              About <ExternalLink className="w-3 h-3" />
            </button>
            <span>•</span>
            <button
              onClick={() => {
                onClose();
                onNavigateTab('projects');
              }}
              className="text-[#0284c7] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              Projects <ExternalLink className="w-3 h-3" />
            </button>
            <span>•</span>
            <button
              onClick={() => {
                onClose();
                onNavigateTab('research');
              }}
              className="text-[#0284c7] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              Research <ExternalLink className="w-3 h-3" />
            </button>
            <span>•</span>
            <button
              onClick={() => {
                onClose();
                onNavigateTab('resume');
              }}
              className="text-[#0284c7] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              Resume <ExternalLink className="w-3 h-3" />
            </button>
            <span>•</span>
            <button
              onClick={() => {
                onClose();
                onNavigateTab('contact');
              }}
              className="text-[#0284c7] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              Contact <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask follow-up question..."
            className="flex-1 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-[#0284c7] rounded-xl outline-none text-sm text-[#0f172a] placeholder:text-gray-400 transition-all"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl disabled:opacity-40 transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
