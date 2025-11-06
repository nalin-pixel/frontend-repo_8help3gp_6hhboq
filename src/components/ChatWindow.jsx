import React, { useEffect, useRef } from 'react';

function MessageBubble({ role, content, streaming }) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow/50 shadow-black/20 backdrop-blur 
        ${role === 'user' ? 'bg-violet-500/20 border border-violet-400/20 text-violet-50' : 'bg-white/5 border border-white/10 text-white/90'}`}
      >
        <div className="whitespace-pre-wrap">
          {content}
          {streaming && <span className="ml-1 animate-pulse">▍</span>}
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({ messages, isStreaming }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  return (
    <div className="relative w-full h-[48vh] md:h-[52vh] overflow-y-auto p-4 md:p-6 space-y-3 bg-gradient-to-b from-slate-900/60 to-slate-950/60 rounded-xl border border-white/10">
      {messages.length === 0 && (
        <div className="h-full flex items-center justify-center text-white/50 text-sm">
          Ask anything. Try "Explain quantum tunneling like I\'m 5".
        </div>
      )}
      {messages.map((m, idx) => (
        <MessageBubble key={idx} role={m.role} content={m.content} streaming={isStreaming && idx === messages.length - 1 && m.role === 'assistant'} />)
      )}
      <div ref={endRef} />
    </div>
  );
}
