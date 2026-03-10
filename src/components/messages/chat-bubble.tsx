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
    <div className={`flex ${isCompany ? "justify-start" : "justify-end"} mb-4 animate-fade-up`}>
      <div className={`max-w-[80%] ${isCompany ? "order-1" : "order-1"}`}>
        {/* Sign-on bonus badge */}
        {isCompany && signOnBonus && (
          <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
            <span className="text-sm">&#x1F381;</span>
            <span className="text-sm font-semibold text-amber-600">Entry bonus {signOnBonus.toLocaleString()} yen guaranteed!</span>
          </div>
        )}

        {/* Offered position & salary */}
        {isCompany && (offeredPosition || offeredSalaryRange) && (
          <div className="mb-2 flex flex-wrap gap-2">
            {offeredPosition && (
              <span className="inline-flex items-center px-2.5 py-1 bg-primary/5 text-primary text-xs font-medium rounded-lg">
                {offeredPosition}
              </span>
            )}
            {offeredSalaryRange && (
              <span className="inline-flex items-center px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg">
                {offeredSalaryRange}
              </span>
            )}
          </div>
        )}

        {/* Message bubble */}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isCompany
            ? "bg-card border text-foreground rounded-tl-md"
            : "bg-primary text-primary-foreground rounded-tr-md"
        }`}>
          {content}
        </div>

        {/* Time & read status */}
        <div className={`flex items-center gap-1.5 mt-1 ${isCompany ? "justify-start" : "justify-end"}`}>
          <span className="text-[11px] text-muted-foreground">{time}</span>
          {!isCompany && (
            <span className={`text-[11px] ${isRead ? "text-primary" : "text-muted-foreground"}`}>
              {isRead ? "Read" : "Sent"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
