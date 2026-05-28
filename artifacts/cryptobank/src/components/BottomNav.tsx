import { Home, ArrowLeftRight, TrendingUp, ShieldCheck } from "lucide-react";
import type { Tab } from "@/App";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "bridge", label: "B2B Bridge", icon: ArrowLeftRight },
  { id: "earn", label: "Earn", icon: TrendingUp },
  { id: "history", label: "AML Feed", icon: ShieldCheck },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div
      className="flex-shrink-0 relative"
      style={{
        background: "rgba(4, 12, 24, 0.95)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-2xl transition-all duration-200 relative"
              style={{
                minWidth: "72px",
                background: isActive ? "rgba(0,255,128,0.08)" : "transparent",
              }}
            >
              {isActive && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: "24px",
                    height: "2px",
                    background: "#00ff80",
                    boxShadow: "0 0 8px rgba(0,255,128,0.8)",
                    top: "-1px",
                  }}
                />
              )}
              <Icon
                size={20}
                style={{
                  color: isActive ? "#00ff80" : "rgba(255,255,255,0.35)",
                  filter: isActive ? "drop-shadow(0 0 6px rgba(0,255,128,0.6))" : "none",
                  transition: "all 0.2s",
                }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color: isActive ? "#00ff80" : "rgba(255,255,255,0.35)",
                  fontSize: "10px",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="rounded-full" style={{ width: "120px", height: "4px", background: "rgba(255,255,255,0.15)" }} />
      </div>
    </div>
  );
}
