import { useState } from "react";
import type { Tab } from "@/App";

const ITEMS: { id: Tab; label: string; d: string }[] = [
  { id:"home",    label:"Главная", d:"M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9" },
  { id:"bridge",  label:"Переводы",d:"M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" },
  { id:"earn",    label:"Вклады",  d:"M12 3v1m0 16v1M4.22 4.22l.707.707M18.36 18.36l.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.36 5.64l.707-.707M12 7a5 5 0 110 10A5 5 0 0112 7z" },
  { id:"history", label:"История", d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
];

export default function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const [pressed, setPressed] = useState<Tab | null>(null);

  return (
    <div style={{
      flexShrink:0, background:"rgba(248,248,250,0.92)",
      borderTop:"1px solid var(--sep)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
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
                flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px",
                padding:"6px 0 10px", background:"none", border:"none", cursor:"pointer",
                transform: pr ? "scale(0.88)" : "scale(1)",
                transition:"transform 0.12s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke={on ? "var(--brand)" : "var(--t3)"}
                strokeWidth={on ? "2" : "1.7"}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transition:"stroke 0.18s, stroke-width 0.18s" }}
              >
                <path d={item.d}/>
              </svg>
              <span style={{
                fontSize:"10px", fontWeight: on ? 600 : 400,
                color: on ? "var(--brand)" : "var(--t3)",
                letterSpacing:"0.01em", transition:"color 0.18s, font-weight 0.18s",
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Home indicator */}
      <div style={{ display:"flex", justifyContent:"center", padding:"8px 0 10px" }}>
        <div style={{ width:"134px", height:"5px", borderRadius:"3px", background:"rgba(15,15,16,0.18)" }}/>
      </div>
    </div>
  );
}
