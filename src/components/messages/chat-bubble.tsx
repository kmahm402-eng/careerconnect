"use client";

interface ChatBubbleProps {
  content: string;
  senderType: "company" | "seeker";
  signOnBonus?: number | null;
  offeredPosition?: string | null;
  offeredSalaryRange?: string | null;
  time: string;
  isRead?: boolean;
}

export function ChatBubble({ content, senderType, signOnBonus, offeredPosition, offeredSalaryRange, time, isRead }: ChatBubbleProps) {
  const isCompany = senderType === "company";
  return (
    <div className={"flex " + (isCompany ? "justify-start" : "justify-end") + " mb-4"}>
      <div className="max-w-[80%]">
        {isCompany && signOnBonus && (
          <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
            <span className="text-sm">🎁</span>
            <span className="text-sm font-semibold text-amber-600">入社祈い金 {signOnBonus.toLocaleString()}円 確約！</span>
          </div>
        )}
        {isCompany && (offeredPosition || offeredSalaryRange) && (
          <div className="mb-2 flex flex-wrap gap-2">
            {offeredPosition && <span className="inline-flex items-center px-2.5 py-1 bg-primary/5 text-primary text-xs font-medium rounded-lg">{offeredPosition}</span>}
            {offeredSalaryRange && <span className="inline-flex items-center px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg">{offeredSalaryRange}</span>}
          </div>
        )}
        <div className={"px-4 py-3 rounded-2xl text-sm leading-relaxed " + (isCompany ? "bg-card border text-foreground rounded-tl-md" : "bg-primary text-primary-foreground rounded-tr-md")}>
          {content}
        </div>
        <div className={"flex items-center gap-1.5 mt-1 " + (isCompany ? "justify-start" : "justify-end")}>
          <span className="text-[11px] text-muted-foreground">{time}</span>
          {!isCompany && <span className={"text-[11px] " + (isRead ? "text-primary" : "text-muted-foreground")}>{isRead ? "既読" : "送信済み"}</span>}
        </div>
      </div>
    </div>
  );
}
