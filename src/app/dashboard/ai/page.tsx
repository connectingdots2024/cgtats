'use client';

import { useState } from 'react';
import {
  Brain, Sparkles, Send, Bot, User, Zap, Target,
  FileText, Users, TrendingUp, MessageSquare, RotateCcw,
  ThumbsUp, Copy, Lightbulb
} from 'lucide-react';
import { candidates as mockCandidates, jobs as mockJobs, aiInsights } from '@/lib/mock-data';

const quickActions = [
  { icon: Target, label: 'Match candidates to job', prompt: 'Find the best candidates for our Senior Full-Stack Engineer position' },
  { icon: FileText, label: 'Parse resume', prompt: 'Parse and score this resume against the ML Engineer role' },
  { icon: Users, label: 'Score all candidates', prompt: 'Run AI scoring for all pending candidates' },
  { icon: MessageSquare, label: 'Draft outreach', prompt: 'Write a personalized outreach message for Alex Rivera' },
  { icon: Lightbulb, label: 'Pipeline insights', prompt: 'Analyze our current hiring pipeline and suggest improvements' },
  { icon: TrendingUp, label: 'Predict time to hire', prompt: 'Predict time-to-hire for our open positions' },
];

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIEnginePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Hello! I'm your AI recruitment assistant. I can help you with:\n\n• **Candidate matching** — Find the best fit for any position\n• **Resume parsing** — Extract and score candidate data\n• **Pipeline analysis** — Get insights on your hiring process\n• **Outreach drafting** — Create personalized messages\n• **Scoring** — AI-powered candidate evaluation\n\nWhat would you like to do today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: prompt,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        const aiResponse = generateAIResponse(prompt);
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      }, 1500);

      setInput('');
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">AI Engine</h1>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Beta</span>
          </div>
          <p className="text-text-secondary mt-1">AI-powered recruitment tools and chat assistant</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat area */}
        <div className="lg:col-span-2 flex flex-col rounded-xl bg-surface border border-border overflow-hidden" style={{ height: 'calc(100vh - 240px)' }}>
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">RecruitAI Assistant</h3>
              <p className="text-[10px] text-success">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.role === 'user' ? '' : ''}`}>
                  <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-surface-hover text-text-primary rounded-bl-md'
                  }`}>
                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />')
                    }} />
                  </div>
                  <div className={`flex items-center gap-2 mt-1.5 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    <span className="text-[10px] text-text-muted">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1">
                        <button className="text-text-muted hover:text-text-primary transition-colors">
                          <Copy className="w-3 h-3" />
                        </button>
                        <button className="text-text-muted hover:text-success transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface-hover rounded-2xl rounded-bl-md p-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask AI anything about your recruitment..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Quick actions & insights */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-xl bg-surface border border-border p-5">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-surface-hover/50 hover:bg-surface-hover text-left transition-all group"
                >
                  <action.icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="rounded-xl bg-surface border border-border p-5">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              AI Insights
            </h3>
            <div className="space-y-3">
              {aiInsights.slice(0, 3).map((insight) => (
                <div
                  key={insight.id}
                  className="p-3 rounded-lg bg-surface-hover/50 border border-border/50 cursor-pointer hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      insight.priority === 'high' ? 'bg-danger' : 'bg-warning'
                    }`} />
                    <p className="text-xs font-semibold text-text-primary">{insight.title}</p>
                  </div>
                  <p className="text-[11px] text-text-muted line-clamp-2">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">AI Performance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Matches Made</span>
                <span className="text-sm font-bold text-white">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Accuracy Rate</span>
                <span className="text-sm font-bold text-success">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Resumes Parsed</span>
                <span className="text-sm font-bold text-white">3,891</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Avg. Score Time</span>
                <span className="text-sm font-bold text-white">2.3s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateAIResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('best candidate') || lower.includes('match') || lower.includes('find')) {
    return `Based on my analysis, here are the **top candidates** for the Senior Full-Stack Engineer position:\n\n🥇 **Alex Rivera** — Score: 94/100\n• 7 years experience in React, Node.js, TypeScript\n• Strong system design skills\n• Led team of 8 engineers\n\n🥈 **Rachel Green** — Score: 92/100\n• 10 years experience, Engineering Manager\n• Managed 30+ person organization\n\n🥉 **David Kim** — Score: 85/100\n• 4 years in React, Vue.js, TypeScript\n• Excellent portfolio and testing skills\n\nWould you like me to schedule interviews with any of these candidates?`;
  }

  if (lower.includes('outreach') || lower.includes('message')) {
    return `Here's a personalized outreach message for **Alex Rivera**:\n\n---\n\nHi Alex,\n\nI came across your profile and was really impressed by your experience leading an engineering team of 8 and your expertise in React and TypeScript.\n\nWe have an exciting **Senior Full-Stack Engineer** opportunity at a fast-growing company in San Francisco. The role involves building scalable web applications with a modern tech stack that aligns perfectly with your background.\n\n**Key highlights:**\n• ₹180K - ₹220K salary range\n• Impact-driven engineering culture\n• Opportunity to shape product architecture\n\nWould you be open to a brief chat this week?\n\n---\n\nShall I send this or would you like to make changes?`;
  }

  if (lower.includes('pipeline') || lower.includes('insight') || lower.includes('analyze')) {
    return `📊 **Pipeline Analysis**\n\nHere's your current hiring pipeline overview:\n\n**Bottleneck Detected:** Screening Stage\n• 2 candidates waiting > 5 days\n• Recommendation: Schedule additional screening sessions\n\n**Conversion Rates:**\n• Applied → Screening: 62% ✅\n• Screening → Interview: 38% ⚠️\n• Interview → Offer: 47% ✅\n• Offer → Hired: 67% ✅\n\n**AI Recommendations:**\n1. Focus on screening backlog to improve flow\n2. Alex Rivera (94/100) should be fast-tracked to interview\n3. Consider expanding ML Engineer search criteria — 0 candidates with MLOps experience\n\nWant me to drill deeper into any of these areas?`;
  }

  if (lower.includes('score') || lower.includes('resume') || lower.includes('parse')) {
    return `✅ **AI Scoring Complete**\n\nI've analyzed all pending candidates. Here's a summary:\n\n**Scored:** 8 candidates\n**Average Score:** 86.5/100\n**Top Match:** Alex Rivera (94/100)\n\n**Breakdown by skill match:**\n• Technical Skills: 89% avg match\n• Experience Level: 82% avg match\n• Culture Fit: 85% avg match\n\n**Key findings:**\n• 3 candidates scored above 90 — high priority\n• 2 candidates have skill gaps in required areas\n• 1 candidate's resume needs manual review (formatting issues)\n\nWould you like me to generate detailed reports for each candidate?`;
  }

  if (lower.includes('predict') || lower.includes('time to hire')) {
    return `⏱️ **Time-to-Hire Predictions**\n\nBased on historical data and current pipeline:\n\n• **Senior Full-Stack Engineer:** ~25 days\n  (3 strong candidates in interview stage)\n\n• **ML Engineer:** ~38 days\n  (Limited qualified candidates, consider expanding search)\n\n• **DevOps Engineer:** ~12 days\n  (Emma Watson is in Offer stage, likely to accept)\n\n• **Engineering Manager:** ~30 days\n  (Rachel Green in interview, strong match)\n\n**Overall avg. time-to-hire:** 28 days (improving from 31 days last quarter)\n\nWant me to suggest ways to speed up any specific role?`;
  }

  return `I understand your question. Let me help you with that.\n\nBased on our data, here are some relevant insights:\n\n• **Active candidates:** 156 in the pipeline\n• **Open positions:** 5 currently active\n• **AI-recommended:** 6 candidates scored 80+\n\nCould you provide more details about what you'd like me to help with? I can:\n• Match candidates to specific jobs\n• Parse and score resumes\n• Analyze pipeline performance\n• Draft outreach messages\n• Generate reports`;
}
