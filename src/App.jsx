import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import ProviderSelector from './components/ProviderSelector';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import SessionSidebar from './components/SessionSidebar';

function createNewSession() {
  return {
    id: crypto.randomUUID(),
    title: 'New conversation',
    createdAt: Date.now(),
    messages: [],
    provider: 'openai',
  };
}

export default function App() {
  const [sessions, setSessions] = useState([createNewSession()]);
  const [activeId, setActiveId] = useState(sessions[0].id);
  const [isStreaming, setIsStreaming] = useState(false);

  const active = useMemo(() => sessions.find((s) => s.id === activeId)!, [sessions, activeId]);

  const updateActive = (updater) => {
    setSessions((prev) => prev.map((s) => (s.id === activeId ? { ...s, ...updater(s || s) } : s)));
  };

  const handleProviderChange = (provider) => {
    updateActive(() => ({ provider }));
  };

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text };
    const assistantMsg = { role: 'assistant', content: '' };
    setIsStreaming(true);
    setSessions((prev) => prev.map((s) => (
      s.id === activeId ? { ...s, title: s.messages.length ? s.title : text.slice(0, 40), messages: [...s.messages, userMsg, assistantMsg] } : s
    )));

    // Simulated streaming for demo (no backend required yet)
    const demo = `Sure! Here is a streaming demo for "${text}".\n\n` +
      '• This UI supports provider switching, sessions, and message bubbles.\n' +
      '• In a real app, responses would stream from your backend.\n' +
      '• The dark, cyberpunk theme is tuned for readability.';

    for (const ch of demo.split('')) {
      await new Promise((r) => setTimeout(r, 8));
      setSessions((prev) => prev.map((s) => {
        if (s.id !== activeId) return s;
        const msgs = [...s.messages];
        const lastIdx = msgs.length - 1;
        msgs[lastIdx] = { ...msgs[lastIdx], content: msgs[lastIdx].content + ch };
        return { ...s, messages: msgs };
      }));
    }

    setIsStreaming(false);
  };

  const newSession = () => {
    const s = createNewSession();
    setSessions((prev) => [s, ...prev]);
    setActiveId(s.id);
  };

  const clearMessages = () => {
    setSessions((prev) => prev.map((s) => (s.id === activeId ? { ...s, messages: [] } : s)));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <main className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12 -mt-10 md:-mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6">
          <SessionSidebar
            sessions={sessions}
            activeId={activeId}
            onSelect={setActiveId}
          />

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <ProviderSelector provider={active.provider} onChange={handleProviderChange} />
              <div className="text-xs text-white/50">Session ID: {active.id.slice(0, 8)}</div>
            </div>

            <ChatWindow messages={active.messages} isStreaming={isStreaming} />

            <ChatInput
              onSend={sendMessage}
              onNewSession={newSession}
              onClear={clearMessages}
              disabled={isStreaming}
            />
          </section>
        </div>

        <footer className="py-10 text-center text-xs text-white/40">
          Built for exploration — switch models, start new sessions, and chat in style.
        </footer>
      </main>
    </div>
  );
}
