export function NoirGold() {
  const gold = "#C9A84C";
  const goldDim = "rgba(201,168,76,0.12)";
  const goldBorder = "rgba(201,168,76,0.2)";

  const assets = [
    { sym: "BTC", name: "Bitcoin", price: "$47,248", chg: "+3.84%", up: true },
    { sym: "ETH", name: "Ethereum", price: "$2,618", chg: "+2.11%", up: true },
    { sym: "TON", name: "TON", price: "$6.18", chg: "+4.72%", up: true },
    { sym: "USDT", name: "Tether", price: "$1.000", chg: "+0.01%", up: true },
  ];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#050505", fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{
        width: "390px", height: "844px", borderRadius: "44px",
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 0 0 1px rgba(201,168,76,0.08), 0 40px 80px rgba(0,0,0,0.9)",
        display: "flex", flexDirection: "column", overflow: "hidden", position: "relative",
      }}>
        {/* Status bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 28px 0", flexShrink:0 }}>
          <span style={{ color:"rgba(255,255,255,0.6)", fontSize:"12px", fontWeight:600 }}>9:41</span>
          <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
            <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"10px" }}>●●●●</span>
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 80px" }}>
          {/* Top bar */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
            <div>
              <div style={{ color:"rgba(255,255,255,0.25)", fontSize:"11px", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"2px" }}>Portfolio</div>
              <div style={{ color:"white", fontSize:"15px", fontWeight:500 }}>Alexei Koval</div>
            </div>
            <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
              <div style={{ padding:"6px 12px", borderRadius:"20px", background:goldDim, border:`1px solid ${goldBorder}` }}>
                <span style={{ color:gold, fontSize:"10px", fontWeight:600, letterSpacing:"0.05em" }}>AI SHIELD</span>
              </div>
              <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"rgba(255,255,255,0.5)", fontSize:"14px" }}>🔔</span>
              </div>
            </div>
          </div>

          {/* Balance card */}
          <div style={{
            borderRadius:"24px", padding:"28px", marginBottom:"24px",
            background:"linear-gradient(145deg, #111108, #0d0d0a)",
            border:`1px solid ${goldBorder}`,
            position:"relative", overflow:"hidden",
          }}>
            <div style={{
              position:"absolute", top:"-40px", right:"-40px",
              width:"150px", height:"150px", borderRadius:"50%",
              background:`radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)`,
              filter:"blur(20px)",
            }} />
            <div style={{ color:"rgba(255,255,255,0.3)", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"8px" }}>Total Wealth</div>
            <div style={{ fontSize:"36px", fontWeight:300, color:"white", letterSpacing:"-1px", marginBottom:"4px" }}>
              67,204 <span style={{ color:gold, fontSize:"20px", fontWeight:500 }}>BYN</span>
            </div>
            <div style={{ color:"rgba(255,255,255,0.2)", fontSize:"12px", marginBottom:"24px" }}>≈ 1,842,000 ₽ · ≈ $18,420</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              {[{label:"Fiat Wallet",val:"24,850 BYN"},{label:"Crypto Wallet",val:"$42,354"}].map(item => (
                <div key={item.label} style={{ padding:"14px", borderRadius:"16px", background:"rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ color:"rgba(255,255,255,0.25)", fontSize:"9px", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"6px" }}>{item.label}</div>
                  <div style={{ color:"white", fontSize:"15px", fontWeight:500 }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px", marginBottom:"28px" }}>
            {[{icon:"₿",label:"Buy"},{icon:"↑↓",label:"Send"},{icon:"⇄",label:"Bridge"},{icon:"◈",label:"Earn"}].map(a => (
              <div key={a.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", padding:"14px 8px", borderRadius:"18px", background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.05)", cursor:"pointer" }}>
                <span style={{ fontSize:"18px", color:"rgba(255,255,255,0.7)" }}>{a.icon}</span>
                <span style={{ color:"rgba(255,255,255,0.35)", fontSize:"9px", letterSpacing:"0.05em", textTransform:"uppercase" }}>{a.label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
            <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,0.05)" }} />
            <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase" }}>Markets</span>
            <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,0.05)" }} />
          </div>

          {/* Assets */}
          <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
            {assets.map(a => (
              <div key={a.sym} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderRadius:"16px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.035)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                  <div style={{ width:"36px", height:"36px", borderRadius:"12px", background:goldDim, border:goldBorder, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:gold, fontSize:"11px", fontWeight:700 }}>{a.sym.slice(0,1)}</span>
                  </div>
                  <div>
                    <div style={{ color:"white", fontSize:"13px", fontWeight:500 }}>{a.sym}</div>
                    <div style={{ color:"rgba(255,255,255,0.25)", fontSize:"10px" }}>{a.name}</div>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:"white", fontSize:"13px", fontWeight:500 }}>{a.price}</div>
                  <div style={{ color: gold, fontSize:"11px" }}>{a.chg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(10,10,10,0.95)", borderTop:"1px solid rgba(255,255,255,0.04)", padding:"12px 0 24px", display:"flex", justifyContent:"space-around", backdropFilter:"blur(20px)" }}>
          {[{icon:"⌂",label:"Home",active:true},{icon:"⇄",label:"Bridge"},{icon:"◈",label:"Earn"},{icon:"🛡",label:"AML"}].map(t => (
            <div key={t.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", cursor:"pointer" }}>
              <span style={{ fontSize:"18px", opacity: t.active ? 1 : 0.3 }}>{t.icon}</span>
              <span style={{ fontSize:"9px", letterSpacing:"0.05em", color: t.active ? gold : "rgba(255,255,255,0.25)", textTransform:"uppercase", fontWeight: t.active ? 600 : 400 }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Label */}
      <div style={{ position:"absolute", bottom:"20px", left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
        <div style={{ color:gold, fontSize:"14px", fontWeight:600, letterSpacing:"0.1em" }}>NOIR GOLD</div>
        <div style={{ color:"rgba(255,255,255,0.3)", fontSize:"11px", marginTop:"2px" }}>Pure black · Warm gold · Ultra-minimal</div>
      </div>
    </div>
  );
}
