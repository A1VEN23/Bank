export function ObsidianIvory() {
  const ivory = "#F5F0E8";
  const ivoryDim = "rgba(245,240,232,0.06)";
  const ivoryBorder = "rgba(245,240,232,0.08)";
  const warm = "#D4926A";

  const assets = [
    { sym: "BTC", name: "Bitcoin", price: "$47,248", chg: "+3.84%", bar: 78 },
    { sym: "ETH", name: "Ethereum", price: "$2,618", chg: "+2.11%", bar: 52 },
    { sym: "TON", name: "TON", price: "$6.18", chg: "+4.72%", bar: 34 },
    { sym: "USDT", name: "Tether", price: "$1.000", chg: "+0.01%", bar: 24 },
  ];

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"#060504", fontFamily:"'Inter', system-ui, sans-serif",
    }}>
      <div style={{
        width:"390px", height:"844px", borderRadius:"44px",
        background:"linear-gradient(160deg, #0f0e0c 0%, #0a0908 100%)",
        border:"1px solid rgba(245,240,232,0.06)",
        boxShadow:"0 0 0 1px rgba(245,240,232,0.03), 0 40px 80px rgba(0,0,0,0.95)",
        display:"flex", flexDirection:"column", overflow:"hidden", position:"relative",
      }}>
        {/* Status bar */}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"14px 28px 0", flexShrink:0 }}>
          <span style={{ color:"rgba(245,240,232,0.4)", fontSize:"12px", fontWeight:600 }}>9:41</span>
          <span style={{ color:"rgba(245,240,232,0.2)", fontSize:"10px" }}>●●●●</span>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"20px 22px 80px" }}>
          {/* Top bar */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"30px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ width:"40px", height:"40px", borderRadius:"14px", background:ivoryDim, border:ivoryBorder, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:ivory, fontSize:"14px", fontWeight:600 }}>АК</span>
              </div>
              <div>
                <div style={{ color:"rgba(245,240,232,0.25)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase" }}>Private Banking</div>
                <div style={{ color:ivory, fontSize:"14px", fontWeight:400 }}>Alexei Koval</div>
              </div>
            </div>
            <div style={{ width:"36px", height:"36px", borderRadius:"12px", background:ivoryDim, border:ivoryBorder, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"rgba(245,240,232,0.4)", fontSize:"13px" }}>🔔</span>
            </div>
          </div>

          {/* Main balance — editorial style */}
          <div style={{ marginBottom:"28px", paddingBottom:"28px", borderBottom:"1px solid rgba(245,240,232,0.05)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
              <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:warm, boxShadow:`0 0 8px ${warm}` }} />
              <span style={{ color:"rgba(245,240,232,0.3)", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase" }}>Total Balance</span>
            </div>
            <div style={{ fontSize:"52px", fontWeight:200, color:ivory, letterSpacing:"-2.5px", lineHeight:1, marginBottom:"10px" }}>
              67,204
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"6px", marginBottom:"8px" }}>
              <span style={{ color:"rgba(245,240,232,0.3)", fontSize:"16px", fontWeight:300 }}>BYN</span>
              <span style={{ color:"rgba(245,240,232,0.12)", fontSize:"14px" }}>/</span>
              <span style={{ color:"rgba(245,240,232,0.2)", fontSize:"14px" }}>1,842,000 ₽</span>
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 12px", borderRadius:"10px", background:`rgba(212,146,106,0.1)`, border:`1px solid rgba(212,146,106,0.2)` }}>
              <span style={{ color:warm, fontSize:"11px", fontWeight:500 }}>+4.28%</span>
              <span style={{ color:"rgba(212,146,106,0.5)", fontSize:"11px" }}>today</span>
            </div>
          </div>

          {/* Wallets row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"28px" }}>
            {[{l:"Fiat Wallet",v:"24,850",c:"BYN",bar:38},{l:"Crypto Wallet",v:"42,354",c:"USD",bar:62}].map(i=>(
              <div key={i.l} style={{ padding:"16px", borderRadius:"18px", background:ivoryDim, border:ivoryBorder }}>
                <div style={{ color:"rgba(245,240,232,0.2)", fontSize:"9px", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"10px" }}>{i.l}</div>
                <div style={{ color:ivory, fontSize:"18px", fontWeight:300, marginBottom:"4px" }}>{i.v}</div>
                <div style={{ color:"rgba(245,240,232,0.2)", fontSize:"10px", marginBottom:"10px" }}>{i.c}</div>
                <div style={{ height:"2px", borderRadius:"1px", background:"rgba(245,240,232,0.06)" }}>
                  <div style={{ width:`${i.bar}%`, height:"100%", borderRadius:"1px", background:warm }} />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"6px", marginBottom:"28px" }}>
            {[{s:"↑",l:"Send"},{s:"↓",l:"Receive"},{s:"⇄",l:"Bridge"},{s:"◈",l:"Earn"}].map(a=>(
              <div key={a.l} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", padding:"14px 4px", borderRadius:"16px", background:ivoryDim, border:ivoryBorder }}>
                <span style={{ color:ivory, fontSize:"17px", fontWeight:200, opacity:0.7 }}>{a.s}</span>
                <span style={{ color:"rgba(245,240,232,0.25)", fontSize:"9px", textTransform:"uppercase", letterSpacing:"0.08em" }}>{a.l}</span>
              </div>
            ))}
          </div>

          {/* Assets with allocation bars */}
          <div style={{ color:"rgba(245,240,232,0.15)", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"14px" }}>Allocation</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
            {assets.map((a,i) => (
              <div key={a.sym} style={{ padding:"14px", borderRadius:"14px", background: i===0 ? ivoryDim : "transparent", border: i===0 ? ivoryBorder : "1px solid transparent" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <span style={{ color:ivory, fontSize:"13px", fontWeight:500, opacity:0.8 }}>{a.sym}</span>
                    <span style={{ color:"rgba(245,240,232,0.2)", fontSize:"11px" }}>{a.name}</span>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <span style={{ color:ivory, fontSize:"13px", fontWeight:400, opacity:0.9 }}>{a.price}</span>
                    <span style={{ color:warm, fontSize:"10px", marginLeft:"8px" }}>{a.chg}</span>
                  </div>
                </div>
                <div style={{ height:"2px", borderRadius:"1px", background:"rgba(245,240,232,0.04)" }}>
                  <div style={{ width:`${a.bar}%`, height:"100%", borderRadius:"1px", background:`rgba(245,240,232,${i===0?0.3:0.12})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(10,9,8,0.97)", borderTop:"1px solid rgba(245,240,232,0.04)", padding:"12px 0 24px", display:"flex", justifyContent:"space-around", backdropFilter:"blur(20px)" }}>
          {[{icon:"⌂",label:"Home",active:true},{icon:"⇄",label:"Bridge"},{icon:"◈",label:"Earn"},{icon:"◉",label:"AML"}].map(t=>(
            <div key={t.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
              <span style={{ fontSize:"18px", opacity:t.active?0.9:0.2 }}>{t.icon}</span>
              <span style={{ fontSize:"9px", color:t.active?warm:"rgba(245,240,232,0.2)", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:t.active?500:400 }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"absolute", bottom:"20px", left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
        <div style={{ color:ivory, fontSize:"14px", fontWeight:400, letterSpacing:"0.12em" }}>OBSIDIAN IVORY</div>
        <div style={{ color:"rgba(245,240,232,0.2)", fontSize:"11px", marginTop:"2px" }}>Warm black · Cream · Editorial luxury</div>
      </div>
    </div>
  );
}
