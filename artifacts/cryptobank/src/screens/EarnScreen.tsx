import { useState } from "react";

const PRODUCTS = [
  { id:"btc",  label:"Bitcoin",    sym:"BTC", apy:8.0, term:"90 дней", min:"0.01 BTC",  badge:"Лучший %",    bg:"#FFFBEB", color:"#F59E0B", textC:"#92400E" },
  { id:"usdt", label:"Tether USD", sym:"USDT",apy:6.5, term:"30 дней", min:"500 USDT",  badge:"Популярный",  bg:"#ECFDF5", color:"#10B981", textC:"#065F46" },
  { id:"eth",  label:"Ethereum",   sym:"ETH", apy:5.2, term:"60 дней", min:"0.1 ETH",   badge:null,          bg:"#F5F3FF", color:"#8B5CF6", textC:"#4C1D95" },
];

function PressBtn({ children, onClick, style: s }: { children:React.ReactNode; onClick?:()=>void; style?:React.CSSProperties }) {
  const [pr, setPr] = useState(false);
  return (
    <button
      onPointerDown={()=>setPr(true)}
      onPointerUp={()=>{ setPr(false); onClick?.(); }}
      onPointerLeave={()=>setPr(false)}
      onClick={onClick}
      style={{ border:"none", cursor:"pointer", transform:pr?"scale(0.97)":"scale(1)", transition:"transform 0.12s cubic-bezier(0.34,1.56,0.64,1)", ...s }}
    >{children}</button>
  );
}

export default function EarnScreen() {
  const [tab, setTab]   = useState<"deposit"|"loan">("deposit");
  const [sel, setSel]   = useState("btc");
  const [amt, setAmt]   = useState(5000);
  const [coll, setColl] = useState(0.5);

  const p        = PRODUCTS.find(x=>x.id===sel)!;
  const monthly  = (amt*(p.apy/100)/12).toFixed(2);
  const annual   = (amt*(p.apy/100)).toFixed(2);
  const collVal  = Math.round(coll*47248);
  const maxLoan  = Math.round(collVal*0.65);

  return (
    <div style={{ padding:"20px 16px 28px" }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:"28px" }}>
        <div style={{ fontSize:"13px", color:"var(--t2)", fontWeight:500, marginBottom:"6px" }}>Декрет №19 · Лицензировано</div>
        <div style={{ fontSize:"28px", fontWeight:700, color:"var(--t1)", letterSpacing:"-0.8px" }}>Вклады и займы</div>
      </div>

      {/* Tab */}
      <div className="fade-up s1" style={{ display:"flex", gap:"0", borderRadius:"14px", background:"var(--surface-2)", border:"1px solid var(--sep)", padding:"4px", marginBottom:"24px" }}>
        {(["deposit","loan"] as const).map(t=>(
          <PressBtn key={t} onClick={()=>setTab(t)} style={{
            flex:1, padding:"10px 8px", borderRadius:"10px", fontSize:"14px", fontWeight: tab===t?700:500,
            background: tab===t?"var(--surface)":"transparent",
            color: tab===t?"var(--t1)":"var(--t2)",
            boxShadow: tab===t?"var(--card-shadow)":"none",
            transition:"all 0.2s",
          }}>
            {t==="deposit" ? "Криптовклады" : "Крипто-займы"}
          </PressBtn>
        ))}
      </div>

      {tab==="deposit" && <>

        {/* Products */}
        <div className="fade-up s2" style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"24px" }}>
          {PRODUCTS.map(pr=>{
            const on = sel===pr.id;
            return (
              <PressBtn key={pr.id} onClick={()=>setSel(pr.id)} style={{
                display:"flex", alignItems:"center", gap:"14px", padding:"16px 18px",
                borderRadius:"18px", textAlign:"left", width:"100%",
                background: on?"var(--t1)":"var(--surface)",
                border:`1px solid ${on?"transparent":"var(--sep)"}`,
                boxShadow: on?"0 8px 24px rgba(15,15,16,0.2)":"var(--card-shadow)",
                transition:"all 0.25s cubic-bezier(0.16,1,0.3,1)",
              }}>
                <div style={{ width:"48px", height:"48px", borderRadius:"15px", background:pr.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:"16px", fontWeight:800, color:pr.color }}>{pr.sym[0]}</span>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3px" }}>
                    <span style={{ fontSize:"15px", fontWeight:700, color:on?"#fff":"var(--t1)" }}>{pr.label}</span>
                    {pr.badge && <span style={{ fontSize:"9px", fontWeight:700, padding:"2px 8px", borderRadius:"6px", background:on?"rgba(255,255,255,0.12)":pr.bg, color:on?"rgba(255,255,255,0.75)":pr.textC, letterSpacing:"0.04em" }}>{pr.badge}</span>}
                  </div>
                  <div style={{ fontSize:"12px", color:on?"rgba(255,255,255,0.45)":"var(--t2)" }}>от {pr.min} · срок {pr.term}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"28px", fontWeight:200, color:on?"#fff":pr.color, letterSpacing:"-0.5px" }}>{pr.apy}%</div>
                  <div style={{ fontSize:"10px", color:on?"rgba(255,255,255,0.35)":"var(--t3)", letterSpacing:"0.08em", textTransform:"uppercase" }}>годовых</div>
                </div>
              </PressBtn>
            );
          })}
        </div>

        {/* Calculator */}
        <div className="fade-up s3" style={{ borderRadius:"20px", background:"var(--surface)", border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)", padding:"20px" }}>
          <div style={{ fontSize:"13px", fontWeight:700, color:"var(--t1)", marginBottom:"18px" }}>Калькулятор доходности</div>

          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
            <span style={{ fontSize:"14px", color:"var(--t2)" }}>Сумма вклада</span>
            <span style={{ fontSize:"18px", fontWeight:700, color:"var(--t1)", letterSpacing:"-0.5px", fontVariantNumeric:"tabular-nums" }}>
              ${amt.toLocaleString("ru-RU")}
            </span>
          </div>
          <input type="range" min={100} max={50000} step={100} value={amt} onChange={e=>setAmt(+e.target.value)}
            style={{ width:"100%", marginBottom:"20px",
              background:`linear-gradient(to right,var(--brand) ${(amt/50000)*100}%,var(--sep) ${(amt/50000)*100}%)` }}
          />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"20px" }}>
            {[{label:"В месяц",val:`$${monthly}`},{label:"В год",val:`$${annual}`}].map(row=>(
              <div key={row.label} style={{ padding:"16px", borderRadius:"14px", background:"var(--surface-2)", border:"1px solid var(--sep)", textAlign:"center" }}>
                <div style={{ fontSize:"11px", color:"var(--t2)", fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:"8px" }}>{row.label}</div>
                <div style={{ fontSize:"26px", fontWeight:300, color:"var(--t1)", letterSpacing:"-0.5px" }}>{row.val}</div>
              </div>
            ))}
          </div>

          <PressBtn onClick={()=>{}} style={{
            width:"100%", padding:"16px", borderRadius:"14px",
            background:"var(--brand)", color:"#fff", fontSize:"15px", fontWeight:700,
            boxShadow:"0 4px 18px var(--brand-16)",
          }}>
            Открыть вклад {p.apy}% годовых
          </PressBtn>
        </div>
      </>}

      {tab==="loan" && <>

        {/* Loan card */}
        <div className="fade-up s2" style={{ borderRadius:"20px", background:"var(--surface)", border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)", padding:"20px", marginBottom:"14px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
            <div style={{ width:"48px", height:"48px", borderRadius:"15px", background:"#FFFBEB", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:"20px" }}>₿</span>
            </div>
            <div>
              <div style={{ fontSize:"17px", fontWeight:700, color:"var(--t1)" }}>Займ под BTC</div>
              <div style={{ fontSize:"12px", color:"var(--t2)", marginTop:"2px" }}>Получите рубли/стейблкоины под залог биткоина</div>
            </div>
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
            <span style={{ fontSize:"14px", color:"var(--t2)" }}>Залог</span>
            <span style={{ fontSize:"18px", fontWeight:700, color:"var(--t1)", fontVariantNumeric:"tabular-nums" }}>{coll} BTC</span>
          </div>
          <input type="range" min={0.01} max={5} step={0.01} value={coll} onChange={e=>setColl(+e.target.value)}
            style={{ width:"100%", marginBottom:"22px",
              background:`linear-gradient(to right,var(--t1) ${(coll/5)*100}%,var(--sep) ${(coll/5)*100}%)` }}
          />

          {/* LTV */}
          <div style={{ marginBottom:"22px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
              <span style={{ fontSize:"14px", color:"var(--t2)" }}>LTV (Loan-to-Value)</span>
              <span style={{ fontSize:"14px", fontWeight:700, color:"var(--green)" }}>65% — Безопасно</span>
            </div>
            <div style={{ height:"6px", borderRadius:"3px", background:"var(--surface-2)", border:"1px solid var(--sep)", overflow:"hidden" }}>
              <div style={{ width:"65%", height:"100%", background:"linear-gradient(90deg,var(--green),#34d399)", borderRadius:"3px", transition:"width 0.4s" }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"5px" }}>
              <span style={{ fontSize:"10px", color:"var(--green)", fontWeight:500 }}>Зона безопасности</span>
              <span style={{ fontSize:"10px", color:"var(--t3)" }}>Ликвидация при 85%</span>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"20px" }}>
            {[
              { l:"Стоимость залога", v:`$${collVal.toLocaleString("ru-RU")}`,  hi:false },
              { l:"Максимум займа",   v:`$${maxLoan.toLocaleString("ru-RU")}`,  hi:true  },
              { l:"Ставка",          v:"4,5% годовых",                          hi:false },
              { l:"Срок",            v:"Гибкий",                                hi:false },
            ].map(r=>(
              <div key={r.l} style={{ padding:"14px", borderRadius:"14px", background:"var(--surface-2)", border:"1px solid var(--sep)" }}>
                <div style={{ fontSize:"10px", color:"var(--t3)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>{r.l}</div>
                <div style={{ fontSize:"16px", fontWeight:r.hi?700:500, color:r.hi?"var(--t1)":"var(--t2)" }}>{r.v}</div>
              </div>
            ))}
          </div>

          <PressBtn onClick={()=>{}} style={{
            width:"100%", padding:"16px", borderRadius:"14px",
            background:"var(--t1)", color:"#fff", fontSize:"15px", fontWeight:700,
            boxShadow:"0 4px 18px rgba(15,15,16,0.18)",
          }}>
            Оформить займ
          </PressBtn>
        </div>

        <div style={{ padding:"12px 16px", borderRadius:"14px", background:"var(--surface-2)", border:"1px solid var(--sep)" }}>
          <p style={{ fontSize:"11px", color:"var(--t2)", lineHeight:1.7 }}>Залог хранится в лицензированном кастодии по Декрету №19. Уведомление о ликвидации — за 24 часа.</p>
        </div>
      </>}
    </div>
  );
}
