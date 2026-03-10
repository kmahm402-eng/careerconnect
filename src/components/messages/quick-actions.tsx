"use client";

interface QuickActionProps {
  onAction: (action: "interested_now" | "maybe" | "pass") => void;
  loading?: boolean;
}

export function QuickActionButtons({ onAction, loading }: QuickActionProps) {
  return (
    <div className="p-4 border-t bg-card">
      <p className="text-center text-xs text-muted-foreground mb-3">How do you feel about this scout?</p>
      <div className="space-y-2">
        <button
          onClick={() => onAction("interested_now")}
          disabled={loading}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 shadow-soft flex items-center justify-center gap-2"
        >
          <span>&#x1F525;</span> I want to talk now
        </button>
        <button
          onClick={() => onAction("maybe")}
          disabled={loading}
          className="w-full py-3 bg-card text-primary border-2 border-primary rounded-xl font-semibold text-sm hover:bg-primary/5 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <span>&#x2615;</span> A little interested
        </button>
        <button
          onClick={() => onAction("pass")}
          disabled={loading}
          className="w-full py-2.5 text-muted-foreground text-sm hover:text-foreground transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <span>&#x1F4A4;</span> Not right now
        </button>
      </div>
    </div>
  );
}
