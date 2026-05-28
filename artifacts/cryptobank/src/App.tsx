import { useState, useCallback } from "react";
import HomeScreen    from "@/screens/HomeScreen";
import BridgeScreen  from "@/screens/BridgeScreen";
import EarnScreen    from "@/screens/EarnScreen";
import HistoryScreen from "@/screens/HistoryScreen";
import BottomNav     from "@/components/BottomNav";
export type Tab = "home"|"bridge"|"earn"|"history";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const go = useCallback((t:Tab)=>setTab(t),[]);

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"radial-gradient(ellipse 100% 70% at 50% 0%, #CFCFE0 0%, #B8B8C8 100%)",
    }}>
      <div style={{
        position:"relative", display:"flex", flexDirection:"column",
        width:"390px", height:"844px", borderRadius:"52px",
        background:"var(--bg)",
        boxShadow:"0 0 0 8px rgba(255,255,255,0.18), 0 40px 80px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.08)",
        overflow:"hidden",
      }}>
        {/* Screen glare top edge */}
        <div style={{ position:"absolute", top:0, left:"12%", right:"12%", height:"1px", zIndex:20, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)" }}/>
        {/* Dynamic island */}
        <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)", width:120, height:34, borderRadius:20, background:"#0F0F10", zIndex:15 }}/>

        {/* Status bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 28px 0", flexShrink:0, zIndex:5 }}>
          <span style={{ color:"var(--t1)", fontSize:"15px", fontWeight:700 }}>9:41</span>
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="var(--t1)">
              <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.3"/>
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity="0.5"/>
              <rect x="9" y="0.5" width="3" height="11.5" rx="1" opacity="0.7"/>
              <rect x="13.5" y="0" width="3" height="12" rx="1"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="var(--t1)" strokeWidth="1.5">
              <path d="M8 3C10.2 3 12.2 4 13.6 5.6" opacity="0.4"/>
              <path d="M8 3C9.5 3 10.8 3.8 11.8 5" opacity="0.7"/>
              <path d="M8 3C8.8 3 9.5 3.5 10 4.2"/>
              <circle cx="8" cy="10.5" r="1.2" fill="var(--t1)" stroke="none"/>
            </svg>
            <div style={{ display:"flex", alignItems:"center", gap:"2px" }}>
              <div style={{ width:"25px", height:"12px", borderRadius:"3.5px", border:"1.5px solid rgba(15,15,16,0.35)", padding:"1.5px", display:"flex", alignItems:"center" }}>
                <div style={{ width:"65%", height:"100%", borderRadius:"2px", background:"var(--t1)" }}/>
              </div>
            </div>
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex:1, overflowY:"auto", position:"relative" }} key={tab}>
          <div className="fade-up">
            {tab==="home"    && <HomeScreen   onNavigate={go}/>}
            {tab==="bridge"  && <BridgeScreen />}
            {tab==="earn"    && <EarnScreen   />}
            {tab==="history" && <HistoryScreen/>}
          </div>
        </div>

        <BottomNav active={tab} onChange={go}/>
      </div>
    </div>
  );
}
