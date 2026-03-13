"use client";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const handleSend = () => { if (!text.trim() || disabled) return; onSend(text.trim()); setText(""); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  return (
    <div className="p-3 border-t bg-card">
      <div className="flex items-end gap-2">
        <textarea value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} placeholder="メッセージを入力..." disabled={disabled} rows={1} className="flex-1 px-4 py-2.5 bg-secondary rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition max-h-32 disabled:opacity-50" />
        <button onClick={handleSend} disabled={!text.trim() || disabled} className="p-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition disabled:opacity-30 shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
        </button>
      </div>
    </div>
  );
}
