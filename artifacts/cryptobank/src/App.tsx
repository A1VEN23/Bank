import { useState, useCallback } from "react";
import { AccountProvider } from "@/context/AccountContext";
import HomeScreen    from "@/screens/HomeScreen";
import BridgeScreen  from "@/screens/BridgeScreen";
import EarnScreen    from "@/screens/EarnScreen";
import HistoryScreen from "@/screens/HistoryScreen";
import BottomNav     from "@/components/BottomNav";
export type Tab = "home"|"bridge"|"earn"|"history";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const go = useCallback((t: Tab) => setTab(t), []);

  return (
    <AccountProvider>
      <div style={{
        minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        background:"radial-gradient(ellipse 80% 60% at 50% -10%,#0E1728 0%,#060810 70%)",
      }}>
        <div style={{
          position:"relative", display:"flex", flexDirection:"column",
          width:"390px", height:"844px", borderRadius:"50px",
          background:"var(--bg)",
          boxShadow:"0 0 0 1px rgba(255,255,255,0.06),0 0 0 8px rgba(255,255,255,0.03),0 40px 80px rgba(0,0,0,0.7)",
          overflow:"hidden",
        }}>
          {/* Side specular */}
          <div style={{ position:"absolute", top:0, left:"12%", right:"12%", height:"1px", zIndex:20, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)" }}/>
          {/* Dynamic island */}
          <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)", width:120, height:34, borderRadius:20, background:"#000", zIndex:15 }}/>

          {/* Status bar */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 28px 0", flexShrink:0, zIndex:5 }}>
            <span style={{ color:"var(--t1)", fontSize:"15px", fontWeight:700, fontFamily:"var(--mono)" }}>9:41</span>
            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                {[0,1,2,3].map((i)=>(
                  <rect key={i} x={i*4.5} y={10-[3,5,8,11][i]} width="3" height={[3,5,8,11][i]} rx="1"
                    fill="var(--t1)" opacity={[0.25,0.45,0.7,1][i]}/>
                ))}
              </svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="var(--t1)" strokeWidth="1.4">
                <path d="M7.5 2C9.7 2 11.6 3.1 12.8 4.8" opacity="0.3"/>
                <path d="M7.5 2C9 2 10.3 2.9 11.2 4.2" opacity="0.6"/>
                <path d="M7.5 2C8.3 2 9 2.5 9.5 3.3"/>
                <circle cx="7.5" cy="9.5" r="1.2" fill="var(--t1)" stroke="none"/>
              </svg>
              <div style={{ display:"flex", alignItems:"center", gap:"2px" }}>
                <div style={{ width:"24px", height:"12px", borderRadius:"3.5px", border:"1.5px solid rgba(248,250,252,0.3)", padding:"1.5px", display:"flex", alignItems:"center" }}>
                  <div style={{ width:"68%", height:"100%", borderRadius:"1.5px", background:"var(--t1)" }}/>
                </div>
              </div>
            </div>
          </div>

          {/* Screen */}
          <div style={{ flex:1, overflowY:"auto", position:"relative" }} key={tab}>
            <div className="fu">
              {tab==="home"    && <HomeScreen   onNavigate={go}/>}
              {tab==="bridge"  && <BridgeScreen />}
              {tab==="earn"    && <EarnScreen   />}
              {tab==="history" && <HistoryScreen/>}
            </div>
          </div>

          <BottomNav active={tab} onChange={go}/>
        </div>
      </div>
    </AccountProvider>
  );
}
