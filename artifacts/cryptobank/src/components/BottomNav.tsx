import { useState } from "react";
import type { Tab } from "@/App";

const TABS: { id: Tab; label: string; path: string }[] = [
  { id:"home",    label:"Home",   path:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
  { id:"bridge",  label:"Bridge", path:"M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" },
  { id:"earn",    label:"Earn",   path:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { id:"history", label:"AML",    path:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
];

interface Props { activeTab: Tab; onTabChange: (t: Tab) => void; }

export default function BottomNav({ activeTab, onTabChange }: Props) {
  const [pressed, setPressed] = useState<Tab | null>(null);

  return (
    <div style={{
      flexShrink: 0,
      background: "rgba(245,244,240,0.92)",
      borderTop: "1px solid var(--border)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
    }}>
      <div style={{ display:"flex", justifyContent:"space-around", padding:"10px 4px 0" }}>
        {TABS.map((t) => {
          const active = activeTab === t.id;
          return (
            <button key={t.id}
              onPointerDown={() => setPressed(t.id)}
              onPointerUp={() => { setPressed(null); onTabChange(t.id); }}
              onPointerLeave={() => setPressed(null)}
              style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:"5px",
                padding:"8px 16px", borderRadius:"16px", border:"none", cursor:"pointer",
                background: active ? "rgba(10,9,8,0.07)" : "transparent",
                transform: pressed === t.id ? "scale(0.9)" : "scale(1)",
                transition: "transform 0.1s ease, background 0.2s ease",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={active ? "var(--dark)" : "var(--ink-35)"}
                strokeWidth={active ? "2" : "1.5"}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transition:"stroke 0.2s, stroke-width 0.2s", filter: active ? "none" : "none" }}
              >
                <path d={t.path}/>
              </svg>
              <span style={{
                fontSize:"9px", letterSpacing:"0.08em", textTransform:"uppercase",
                fontWeight: active ? 700 : 400,
                color: active ? "var(--ink)" : "var(--ink-35)",
                transition: "color 0.2s, font-weight 0.2s",
              }}>
                {t.label}
              </span>
              {active && (
                <div style={{
                  position:"absolute", bottom:"0",
                  width:"4px", height:"4px", borderRadius:"50%",
                  background:"var(--dark)",
                  marginTop:"auto",
                }} />
              )}
            </button>
          );
        })}
      </div>
      <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 8px" }}>
        <div style={{ width:"130px", height:"5px", borderRadius:"3px", background:"rgba(15,13,10,0.15)" }} />
      </div>
    </div>
  );
}
