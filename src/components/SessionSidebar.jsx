import React from 'react';
import { Clock, MessageSquareText } from 'lucide-react';

export default function SessionSidebar({ sessions, activeId, onSelect }) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
        <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
          <Clock className="h-4 w-4" /> Recent Sessions
        </div>
        <div className="space-y-2 max-h-[52vh] overflow-y-auto pr-1">
          {sessions.length === 0 && (
            <div className="text-white/40 text-sm">No sessions yet</div>
          )}
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`w-full text-left rounded-lg px-3 py-2 border transition 
                ${activeId === s.id ? 'border-violet-400/30 bg-violet-500/10 text-white' : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'}`}
            >
              <div className="flex items-start gap-2">
                <MessageSquareText className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="text-sm line-clamp-1">{s.title || 'Untitled session'}</div>
                  <div className="text-[11px] text-white/50">{new Date(s.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
