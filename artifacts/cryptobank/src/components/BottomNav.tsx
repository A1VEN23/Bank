import type { Tab } from "@/App";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; glyph: string }[] = [
  { id: "home",    label: "Home",    glyph: "⌂"  },
  { id: "bridge",  label: "Bridge",  glyph: "⇄"  },
  { id: "earn",    label: "Earn",    glyph: "◈"  },
  { id: "history", label: "AML",     glyph: "◉"  },
];

const WARM = "#D4926A";

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div style={{
      flexShrink: 0,
      background: "rgba(9,8,7,0.97)",
      borderTop: "1px solid rgba(245,240,232,0.05)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "14px 8px 0" }}>
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                padding: "0 16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {active && (
                <div style={{
                  position: "absolute",
                  top: "-14px",
                  width: "20px",
                  height: "1.5px",
                  borderRadius: "1px",
                  background: WARM,
                  boxShadow: `0 0 8px ${WARM}`,
                }} />
              )}
              <span style={{
                fontSize: "20px",
                opacity: active ? 1 : 0.2,
                filter: active ? `drop-shadow(0 0 8px rgba(212,146,106,0.5))` : "none",
                transition: "all 0.25s",
                lineHeight: 1,
                color: active ? WARM : "rgba(245,240,232,0.6)",
              }}>
                {tab.glyph}
              </span>
              <span style={{
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: active ? 600 : 400,
                color: active ? WARM : "rgba(245,240,232,0.2)",
                transition: "all 0.25s",
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px" }}>
        <div style={{ width: "120px", height: "4px", borderRadius: "2px", background: "rgba(245,240,232,0.1)" }} />
      </div>
    </div>
  );
}
