import { useState } from "react";
import type { Tab } from "@/App";

const ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id:"home",    label:"Главная",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg> },
  { id:"bridge",  label:"Bridge",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16"/></svg> },
  { id:"earn",    label:"Вклады",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg> },
  { id:"history", label:"AML",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
];

export default function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const [pressed, setPressed] = useState<Tab | null>(null);

  return (
    <div style={{
      flexShrink:0,
      background:"rgba(11,15,25,0.96)",
      borderTop:"1px solid var(--border)",
      backdropFilter:"blur(20px)",
      WebkitBackdropFilter:"blur(20px)",
    }}>
      <div style={{ display:"flex", padding:"8px 0 0" }}>
        {ITEMS.map(item => {
          const on = active === item.id;
          const pr = pressed === item.id;
          return (
            <button key={item.id}
              onPointerDown={()=>setPressed(item.id)}
              onPointerUp={()=>{ setPressed(null); onChange(item.id); }}
              onPointerLeave={()=>setPressed(null)}
              style={{
                flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"5px",
                padding:"6px 0 10px", background:"none", border:"none", cursor:"pointer",
                transform: pr ? "scale(0.88)" : "scale(1)",
                transition:"transform 0.12s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <div style={{ color: on ? "var(--green)" : "var(--t3)", transition:"color 0.2s" }}>
                {item.icon}
              </div>
              <span style={{
                fontSize:"9px", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase",
                color: on ? "var(--green)" : "var(--t3)", transition:"color 0.2s",
              }}>
                {item.label}
              </span>
              {on && <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"var(--green)", marginTop:"1px" }}/>}
            </button>
          );
        })}
      </div>
      <div style={{ display:"flex", justifyContent:"center", padding:"8px 0 10px" }}>
        <div style={{ width:"130px", height:"5px", borderRadius:"3px", background:"rgba(248,250,252,0.12)" }}/>
      </div>
    </div>
  );
}
