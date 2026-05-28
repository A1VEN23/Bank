import { useState, useCallback } from "react";
import HomeScreen from "@/screens/HomeScreen";
import BridgeScreen from "@/screens/BridgeScreen";
import EarnScreen from "@/screens/EarnScreen";
import HistoryScreen from "@/screens/HistoryScreen";
import BottomNav from "@/components/BottomNav";

export type Tab = "home" | "bridge" | "earn" | "history";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at 50% 0%, #1a110a 0%, #060504 60%)",
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "390px",
        height: "844px",
        borderRadius: "44px",
        background: "linear-gradient(160deg, #100e0c 0%, #0a0908 100%)",
        border: "1px solid rgba(245,240,232,0.06)",
        boxShadow: [
          "0 0 0 1px rgba(245,240,232,0.03)",
          "0 60px 120px rgba(0,0,0,0.95)",
          "inset 0 1px 0 rgba(245,240,232,0.05)",
        ].join(", "),
        overflow: "hidden",
      }}>
        {/* Ambient top glow */}
        <div style={{
          position: "absolute",
          top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "200px", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,146,106,0.25), transparent)",
          zIndex: 10,
        }} />

        {/* Status bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 28px 0",
          flexShrink: 0,
          zIndex: 5,
        }}>
          <span style={{ color: "rgba(245,240,232,0.5)", fontSize: "12px", fontWeight: 600 }}>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ display: "flex", gap: "2px", alignItems: "flex-end" }}>
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} style={{ width: "3px", borderRadius: "1px", height: `${h}px`, background: "rgba(245,240,232,0.5)" }} />
              ))}
            </div>
            <span style={{ color: "rgba(245,240,232,0.5)", fontSize: "10px", letterSpacing: "1px" }}>◉</span>
            <div style={{ width: "24px", height: "11px", borderRadius: "3px", border: "1px solid rgba(245,240,232,0.3)", padding: "1px" }}>
              <div style={{ width: "75%", height: "100%", borderRadius: "2px", background: "rgba(245,240,232,0.6)" }} />
            </div>
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex: 1, overflowY: "auto", position: "relative" }} key={activeTab}>
          <div className="fade-up">
            {activeTab === "home" && <HomeScreen />}
            {activeTab === "bridge" && <BridgeScreen />}
            {activeTab === "earn" && <EarnScreen />}
            {activeTab === "history" && <HistoryScreen />}
          </div>
        </div>

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}
