"use client";

interface QuickActionProps {
  onAction: (action: "interested_now" | "maybe" | "pass") => void;
  loading?: boolean;
}

export function QuickActionButtons({ onAction, loading }: QuickActionProps) {
  return (
    <div className="p-4 border-t bg-card">
      <p className="text-center text-xs text-muted-foreground mb-3">このスカウトについてどう思いますか？</p>
      <div className="space-y-2">
        <button onClick={() => onAction("interested_now")} disabled={loading} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 shadow-soft flex items-center justify-center gap-2">
          <span>🔥</span> 今すぐ話したい
        </button>
        <button onClick={() => onAction("maybe")} disabled={loading} className="w-full py-3 bg-card text-primary border-2 border-primary rounded-xl font-semibold text-sm hover:bg-primary/5 transition disabled:opacity-50 flex items-center justify-center gap-2">
          <span>☕</span> ちょっと興味ある
        </button>
        <button onClick={() => onAction("pass")} disabled={loading} className="w-full py-2.5 text-muted-foreground text-sm hover:text-foreground transition disabled:opacity-50 flex items-center justify-center gap-2">
          <span>💤</span> 今はいいや
        </button>
      </div>
    </div>
  );
}
