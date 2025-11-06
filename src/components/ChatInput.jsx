import React, { useState } from 'react';
import { Send, Plus, Trash2 } from 'lucide-react';

export default function ChatInput({ onSend, onNewSession, onClear, disabled }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onNewSession}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
        >
          <Plus className="h-4 w-4" /> New session
        </button>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200 hover:bg-red-500/20 transition"
        >
          <Trash2 className="h-4 w-4" /> Clear messages
        </button>
      </div>

      <div className="flex items-stretch gap-2">
        <textarea
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Send a message..."
          className="flex-1 resize-none rounded-lg bg-white/5 border border-white/10 text-white/90 placeholder-white/40 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-400/40"
        />
        <button
          onClick={submit}
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-lg bg-violet-500 hover:bg-violet-600 disabled:opacity-50 px-4 text-white font-medium transition"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
