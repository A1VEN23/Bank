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
    <div className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #020b14 0%, #040d1a 40%, #020810 100%)" }}>
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "390px",
          height: "844px",
          borderRadius: "44px",
          background: "linear-gradient(180deg, #060f1e 0%, #040c18 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-8 pt-4 pb-1 flex-shrink-0">
          <span className="text-white text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5 items-end h-3">
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} className="w-1 rounded-sm bg-white" style={{ height: `${h}px` }} />
              ))}
            </div>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
              <path d="M8 2.4C10.4 2.4 12.6 3.4 14.1 5L15.5 3.6C13.6 1.4 10.9 0 8 0C5.1 0 2.4 1.4 0.5 3.6L1.9 5C3.4 3.4 5.6 2.4 8 2.4Z"/>
              <path d="M8 5.6C9.5 5.6 10.9 6.2 11.9 7.3L13.3 5.9C12 4.5 10.1 3.6 8 3.6C5.9 3.6 4 4.5 2.7 5.9L4.1 7.3C5.1 6.2 6.5 5.6 8 5.6Z"/>
              <circle cx="8" cy="10.5" r="1.5"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="rounded-sm bg-white" style={{ width: "22px", height: "11px", padding: "1px" }}>
                <div className="bg-white rounded-sm w-full h-full" style={{ background: "linear-gradient(90deg, #00ff80 70%, transparent 70%)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide relative">
          {activeTab === "home" && <HomeScreen />}
          {activeTab === "bridge" && <BridgeScreen />}
          {activeTab === "earn" && <EarnScreen />}
          {activeTab === "history" && <HistoryScreen />}
        </div>

        {/* Bottom nav */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}
