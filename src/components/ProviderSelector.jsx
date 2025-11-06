import React from 'react';

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI' },
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'azure', name: 'Azure OpenAI' },
  { id: 'local', name: 'Local LLM' },
];

export default function ProviderSelector({ provider, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs uppercase tracking-wider text-white/60">Model</label>
      <div className="relative">
        <select
          value={provider}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white/5 text-white/90 border border-white/10 rounded-md px-3 py-2 pr-8 backdrop-blur outline-none focus:ring-2 focus:ring-violet-400/50"
        >
          {PROVIDERS.map((p) => (
            <option key={p.id} value={p.id} className="bg-slate-900">
              {p.name}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 12l-4-4h8l-4 4z" />
        </svg>
      </div>
    </div>
  );
}
