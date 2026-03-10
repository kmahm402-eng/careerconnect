"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ChatBubble } from "@/components/messages/chat-bubble";
import { QuickActionButtons } from "@/components/messages/quick-actions";
import { ChatInput } from "@/components/messages/chat-input";

interface Message { id: string; company_id: string; seeker_id: string; sender_type: "company" | "seeker"; content: string; sign_on_bonus: number | null; offered_position: string | null; offered_salary_range: string | null; is_read: boolean; created_at: string; status: string; }
interface Company { id: string; company_name: string; is_verified: boolean; carrier: string; }

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params.id as string;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [passed, setPassed] = useState(false);
  const [seekerId, setSeekerId] = useState<string | null>(null);
  const hasReplied = messages.some((m) => m.sender_type === "seeker");

  useEffect(() => { fetchData(); }, [companyId]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  async function fetchData() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: seeker } = await supabase.from("seekers").select("id").eq("auth_user_id", user.id).single() as any;
    if (seeker) setSeekerId(seeker.id);
    const { data: comp } = await supabase.from("companies").select("id, company_name, is_verified, carrier").eq("id", companyId).single() as any;
    if (comp) setCompany(comp);
    if (seeker) {
      const { data: msgs } = await supabase.from("messages").select("*").eq("company_id", companyId).eq("seeker_id", seeker.id).order("created_at", { ascending: true }) as any;
      if (msgs) { setMessages(msgs); setPassed(msgs.some((m: Message) => m.status === "archived")); }
    }
    setLoading(false);
  }

  async function handleQuickAction(action: "interested_now" | "maybe" | "pass") {
    if (!seekerId || actionLoading) return;
    setActionLoading(true);
    const supabase = createClient();
    if (action === "pass") {
      await supabase.from("messages").update({ status: "archived", archived_at: new Date().toISOString() } as any).eq("company_id", companyId).eq("seeker_id", seekerId);
      setPassed(true); setActionLoading(false); return;
    }
    const content = action === "interested_now" ? "Thanks for the scout! I am very interested!" : "Thank you. I am a little interested. Could you tell me more?";
    const { data: newMsg } = await supabase.from("messages").insert({ company_id: companyId, seeker_id: seekerId, sender_type: "seeker", content } as any).select().single() as any;
    if (newMsg) setMessages((prev) => [...prev, newMsg]);
    setActionLoading(false);
  }

  async function handleSendMessage(text: string) {
    if (!seekerId) return;
    const supabase = createClient();
    const { data: newMsg } = await supabase.from("messages").insert({ company_id: companyId, seeker_id: seekerId, sender_type: "seeker", content: text } as any).select().single() as any;
    if (newMsg) setMessages((prev) => [...prev, newMsg]);
  }

  function formatTime(d: string) { return new Date(d).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }); }

  if (loading) return (<div className="flex items-center justify-center h-screen"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-3 px-4 py-3 border-b bg-card/80 backdrop-blur-xl sticky top-0 z-10">
        <button onClick={() => router.push("/messages")} className="p-1 -ml-1 text-muted-foreground hover:text-foreground transition"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></button>
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">{company?.company_name?.[0] || "C"}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5"><span className="font-semibold text-sm truncate">{company?.company_name || "Company"}</span>{company?.is_verified && (<svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>)}</div>
          <span className="text-xs text-muted-foreground">{company?.carrier}</span>
        </div>
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (<div className="text-center py-12"><p className="text-muted-foreground text-sm">No messages yet</p></div>)}
        {messages.map((msg) => (<ChatBubble key={msg.id} content={msg.content} senderType={msg.sender_type} signOnBonus={msg.sign_on_bonus} offeredPosition={msg.offered_position} offeredSalaryRange={msg.offered_salary_range} time={formatTime(msg.created_at)} isRead={msg.is_read} />))}
      </div>
      {passed ? (<div className="p-4 border-t bg-card text-center"><p className="text-sm text-muted-foreground">You passed on this scout</p></div>) : hasReplied ? (<ChatInput onSend={handleSendMessage} />) : messages.length > 0 ? (<QuickActionButtons onAction={handleQuickAction} loading={actionLoading} />) : (<ChatInput onSend={handleSendMessage} />)}
    </div>
  );
}