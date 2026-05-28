import { useState, useCallback } from "react";
import HomeScreen    from "@/screens/HomeScreen";
import BridgeScreen  from "@/screens/BridgeScreen";
import EarnScreen    from "@/screens/EarnScreen";
import HistoryScreen from "@/screens/HistoryScreen";
import BottomNav     from "@/components/BottomNav";
export type Tab = "home" | "bridge" | "earn" | "history";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const go = useCallback((t: Tab) => setTab(t), []);

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse 120% 80% at 50% 10%, #D8D4C8 0%, #AAAA9E 100%)",
    }}>
      <div style={{
        position: "relative", display: "flex", flexDirection: "column",
        width: "390px", height: "844px", borderRadius: "52px",
        background: "var(--bg)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.5), 0 32px 80px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}>
        {/* Screen glare */}
        <div style={{
          position: "absolute", top: 0, left: "8%", right: "8%", height: "1px", zIndex: 10,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
        }} />

        {/* Status bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 28px 0", flexShrink: 0, zIndex: 5,
        }}>
          <span style={{ color: "var(--ink)", fontSize: "13px", fontWeight: 600 }}>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{ display: "flex", gap: "2px", alignItems: "flex-end" }}>
              {[3,5,7,9].map((h,i) => (
                <div key={i} style={{ width:"3px", height:`${h}px`, borderRadius:"1px", background:"var(--ink)", opacity:0.7 }} />
              ))}
            </div>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.5C10.3 2.5 12.4 3.5 13.9 5.1L15.2 3.7C13.4 1.7 10.8 0.5 8 0.5C5.2 0.5 2.6 1.7 0.8 3.7L2.1 5.1C3.6 3.5 5.7 2.5 8 2.5Z" fill="var(--ink)" fillOpacity="0.7"/>
              <path d="M8 5.5C9.5 5.5 10.8 6.1 11.8 7.1L13.1 5.7C11.8 4.4 10 3.5 8 3.5C6 3.5 4.2 4.4 2.9 5.7L4.2 7.1C5.2 6.1 6.5 5.5 8 5.5Z" fill="var(--ink)" fillOpacity="0.7"/>
              <circle cx="8" cy="10.5" r="1.5" fill="var(--ink)" fillOpacity="0.7"/>
            </svg>
            <div style={{ display:"flex", alignItems:"center", gap:"1px" }}>
              <div style={{ width:"22px", height:"11px", borderRadius:"3px", border:"1.5px solid rgba(15,13,10,0.4)", padding:"1.5px", display:"flex" }}>
                <div style={{ width:"70%", borderRadius:"1.5px", background:"var(--ink)", opacity:0.7 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", position:"relative" }} key={tab}>
          <div className="fade-up">
            {tab === "home"    && <HomeScreen    onNavigate={go} />}
            {tab === "bridge"  && <BridgeScreen  />}
            {tab === "earn"    && <EarnScreen     />}
            {tab === "history" && <HistoryScreen  />}
          </div>
        </div>

        <BottomNav activeTab={tab} onTabChange={go} />
      </div>
    </div>
  );
}
