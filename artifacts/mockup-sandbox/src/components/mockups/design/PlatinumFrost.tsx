export function PlatinumFrost() {
  const plat = "#E8ECF0";
  const platDim = "rgba(232,236,240,0.07)";
  const platBorder = "rgba(232,236,240,0.1)";
  const accent = "#7DD3C0";

  const assets = [
    { sym: "BTC", price: "$47,248", chg: "+3.84%" },
    { sym: "ETH", price: "$2,618", chg: "+2.11%" },
    { sym: "TON", price: "$6.18", chg: "+4.72%" },
    { sym: "USDT", price: "$1.000", chg: "+0.01%" },
  ];

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"#080c10", fontFamily:"'Inter', system-ui, sans-serif",
    }}>
      <div style={{
        width:"390px", height:"844px", borderRadius:"44px",
        background:"linear-gradient(180deg, #0d1117 0%, #0a0e12 100%)",
        border:"1px solid rgba(232,236,240,0.06)",
        boxShadow:"0 0 0 1px rgba(232,236,240,0.03), 0 40px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)",
        display:"flex", flexDirection:"column", overflow:"hidden", position:"relative",
      }}>
        {/* Subtle top glow */}
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"200px", height:"1px", background:"linear-gradient(90deg, transparent, rgba(232,236,240,0.2), transparent)" }} />

        {/* Status bar */}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"14px 28px 0", flexShrink:0 }}>
          <span style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px", fontWeight:600 }}>9:41</span>
          <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"10px" }}>●●●●</span>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"18px 20px 80px" }}>
          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"32px" }}>
            <div>
              <div style={{ color:"rgba(255,255,255,0.2)", fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"4px" }}>Good morning</div>
              <div style={{ color:plat, fontSize:"22px", fontWeight:300, letterSpacing:"-0.5px" }}>Alexei</div>
            </div>
            <div style={{ display:"flex", gap:"8px" }}>
              <div style={{ padding:"7px 14px", borderRadius:"20px", background:platDim, border:platBorder, display:"flex", alignItems:"center", gap:"6px" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:accent, boxShadow:`0 0 6px ${accent}` }} />
                <span style={{ color:"rgba(255,255,255,0.5)", fontSize:"10px", fontWeight:500 }}>Protected</span>
              </div>
            </div>
          </div>

          {/* Balance — large, clean */}
          <div style={{ marginBottom:"32px" }}>
            <div style={{ color:"rgba(255,255,255,0.2)", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"12px" }}>Net Worth</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"8px", marginBottom:"6px" }}>
              <span style={{ color:plat, fontSize:"48px", fontWeight:200, letterSpacing:"-2px", lineHeight:1 }}>67,204</span>
              <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"18px", fontWeight:300 }}>BYN</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ color:accent, fontSize:"12px", fontWeight:500 }}>+4.28% today</span>
              <span style={{ color:"rgba(255,255,255,0.15)", fontSize:"12px" }}>· ≈ $18,420 USD</span>
            </div>
          </div>

          {/* Two balance pills */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"32px" }}>
            {[{l:"Fiat",v:"24,850",c:"BYN"},{l:"Crypto",v:"42,354",c:"USD"}].map(i => (
              <div key={i.l} style={{ padding:"18px", borderRadius:"20px", background:platDim, border:platBorder }}>
                <div style={{ color:"rgba(255,255,255,0.2)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"10px" }}>{i.l}</div>
                <div style={{ color:plat, fontSize:"20px", fontWeight:300 }}>{i.v}</div>
                <div style={{ color:"rgba(255,255,255,0.2)", fontSize:"11px", marginTop:"2px" }}>{i.c}</div>
              </div>
            ))}
          </div>

          {/* Actions — icon-only row */}
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"32px", padding:"0 4px" }}>
            {[{sym:"↑",l:"Send"},{sym:"↓",l:"Receive"},{sym:"⇄",l:"Bridge"},{sym:"◈",l:"Earn"}].map(a => (
              <div key={a.l} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
                <div style={{ width:"52px", height:"52px", borderRadius:"18px", background:platDim, border:platBorder, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:plat, fontSize:"20px", fontWeight:200 }}>{a.sym}</span>
                </div>
                <span style={{ color:"rgba(255,255,255,0.25)", fontSize:"10px" }}>{a.l}</span>
              </div>
            ))}
          </div>

          {/* Section label */}
          <div style={{ color:"rgba(255,255,255,0.15)", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"14px" }}>Assets</div>

          {/* Assets — ultra minimal rows */}
          <div style={{ display:"flex", flexDirection:"column" }}>
            {assets.map((a, i) => (
              <div key={a.sym} style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"16px 4px",
                borderBottom: i < assets.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                  <div style={{ width:"32px", height:"32px", borderRadius:"10px", background:platDim, border:platBorder, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:"rgba(255,255,255,0.5)", fontSize:"10px", fontWeight:600 }}>{a.sym.slice(0,1)}</span>
                  </div>
                  <span style={{ color:"rgba(255,255,255,0.6)", fontSize:"14px", fontWeight:400 }}>{a.sym}</span>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:plat, fontSize:"14px", fontWeight:400 }}>{a.price}</div>
                  <div style={{ color:accent, fontSize:"11px", marginTop:"1px" }}>{a.chg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(10,14,18,0.97)", borderTop:"1px solid rgba(255,255,255,0.04)", padding:"12px 0 24px", display:"flex", justifyContent:"space-around", backdropFilter:"blur(20px)" }}>
          {[{icon:"⌂",label:"Home",active:true},{icon:"⇄",label:"Bridge"},{icon:"◈",label:"Earn"},{icon:"◉",label:"AML"}].map(t => (
            <div key={t.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
              <span style={{ fontSize:"18px", opacity:t.active ? 1 : 0.25, filter: t.active ? `drop-shadow(0 0 6px ${accent})` : "none" }}>{t.icon}</span>
              <span style={{ fontSize:"9px", color:t.active ? accent : "rgba(255,255,255,0.2)", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:t.active?600:400 }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"absolute", bottom:"20px", left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
        <div style={{ color:plat, fontSize:"14px", fontWeight:500, letterSpacing:"0.1em" }}>PLATINUM FROST</div>
        <div style={{ color:"rgba(255,255,255,0.25)", fontSize:"11px", marginTop:"2px" }}>Cold dark · Silver-white · Airy spacing</div>
      </div>
    </div>
  );
}
