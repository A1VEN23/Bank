import { useState } from "react";

const RATES: Record<string,{rate:number;flag:string;name:string}> = {
  CNY:{ rate:0.0809, flag:"🇨🇳", name:"Китайский юань"   },
  AED:{ rate:0.0277, flag:"🇦🇪", name:"Дирхам ОАЭ"       },
  TRY:{ rate:0.882,  flag:"🇹🇷", name:"Турецкая лира"    },
  INR:{ rate:0.847,  flag:"🇮🇳", name:"Индийская рупия"  },
  USD:{ rate:0.011,  flag:"🇺🇸", name:"Доллар США"       },
  EUR:{ rate:0.0101, flag:"🇪🇺", name:"Евро"             },
  KZT:{ rate:4.98,   flag:"🇰🇿", name:"Казахский тенге"  },
};

const STEPS = ["Ввод","Маршрут","Подтверждение"];

type State = "idle"|"processing"|"done";

function Field({ label, children }: { label:string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize:"12px", fontWeight:600, color:"var(--t2)", letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:"8px" }}>{label}</div>
      {children}
    </div>
  );
}

function RouteNode({ flag, code, label, active }: { flag:string;code:string;label:string;active?:boolean }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
      <div style={{ fontSize:"22px" }}>{flag}</div>
      <div style={{ fontSize:"14px", fontWeight:700, color: active?"var(--brand)":"var(--t1)" }}>{code}</div>
      <div style={{ fontSize:"10px", color:"var(--t2)", textAlign:"center", maxWidth:"52px", lineHeight:1.3 }}>{label}</div>
    </div>
  );
}

function FeeRow({ label, value, highlight }: { label:string;value:string;highlight?:boolean }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", padding:"11px 0", borderBottom:"1px solid var(--sep)" }}>
      <span style={{ fontSize:"14px", color:"var(--t2)" }}>{label}</span>
      <span style={{ fontSize:"14px", fontWeight: highlight?700:500, color: highlight?"var(--t1)":"var(--t2)" }}>{value}</span>
    </div>
  );
}

export default function BridgeScreen() {
  const [amount, setAmount]   = useState("150000");
  const [from]                = useState("RUB");
  const [to, setTo]           = useState("CNY");
  const [step, setStep]       = useState(0);
  const [txState, setTxState] = useState<State>("idle");
  const [showCurr, setShowCurr] = useState(false);

  const num  = parseFloat(amount)||0;
  const info = RATES[to];
  const received = (num*info.rate).toLocaleString("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2});
  const fee  = (num*0.0025).toLocaleString("ru-RU",{maximumFractionDigits:0});

  const execute = () => {
    setTxState("processing");
    setTimeout(()=>{ setTxState("done"); },2200);
  };

  return (
    <div style={{ padding:"20px 16px 28px" }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:"28px" }}>
        <div style={{ fontSize:"13px", color:"var(--t2)", fontWeight:500, marginBottom:"6px" }}>Межграничные переводы</div>
        <div style={{ fontSize:"28px", fontWeight:700, color:"var(--t1)", letterSpacing:"-0.8px", marginBottom:"20px" }}>B2B Bridge</div>

        {/* Progress */}
        <div style={{ display:"flex", alignItems:"center", gap:0 }}>
          {STEPS.map((s,i)=>(
            <div key={s} style={{ display:"flex", alignItems:"center", flex: i<STEPS.length-1?1:undefined }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
                <div style={{
                  width:"28px", height:"28px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                  background: i<=step?"var(--brand)":"var(--surface)", border: i<=step?"none":"1px solid var(--sep)",
                  boxShadow: i===step?"0 0 0 4px var(--brand-08)":"none",
                  transition:"all 0.3s",
                }}>
                  {i<step
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    : <span style={{ fontSize:"12px", fontWeight:700, color:i<=step?"#fff":"var(--t3)" }}>{i+1}</span>
                  }
                </div>
                <span style={{ fontSize:"9px", fontWeight:600, color:i<=step?"var(--brand)":"var(--t3)", whiteSpace:"nowrap" }}>{s}</span>
              </div>
              {i<STEPS.length-1 && (
                <div style={{ flex:1, height:"1px", background: i<step?"var(--brand)":"var(--sep)", margin:"0 6px 16px", transition:"background 0.3s" }}/>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sanction badge */}
      <div className="fade-up s1" style={{
        display:"flex", alignItems:"center", gap:"12px", padding:"12px 14px",
        borderRadius:"14px", background:"var(--green-bg)", border:"1px solid rgba(0,185,107,0.2)", marginBottom:"20px",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
        </svg>
        <div style={{ flex:1 }}>
          <span style={{ fontSize:"13px", fontWeight:600, color:"var(--green)" }}>AI AML — Нет нарушений</span>
          <div style={{ fontSize:"11px", color:"var(--green)", opacity:0.7 }}>OFAC · EU · UN · FinCEN — все списки проверены</div>
        </div>
        <div style={{ fontSize:"11px", fontWeight:700, color:"var(--green)" }}>✓ CLEAN</div>
      </div>

      {/* Form */}
      <div className="fade-up s2" style={{ borderRadius:"20px", background:"var(--surface)", border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)", padding:"20px", marginBottom:"14px" }}>
        <Field label="Вы отправляете">
          <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"14px 16px", borderRadius:"14px", background:"var(--surface-2)", border:"1px solid var(--sep)" }}>
            <div style={{ padding:"6px 12px", borderRadius:"8px", background:"var(--t1)", flexShrink:0 }}>
              <span style={{ color:"#fff", fontSize:"13px", fontWeight:700 }}>🇷🇺 {from}</span>
            </div>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}
              style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:"28px", fontWeight:300, color:"var(--t1)", letterSpacing:"-1px", fontVariantNumeric:"tabular-nums", textAlign:"right" }}
              placeholder="0"
            />
          </div>
          <div style={{ fontSize:"12px", color:"var(--t2)", marginTop:"6px", paddingLeft:"4px" }}>≈ ${(num*0.011).toLocaleString("ru-RU",{maximumFractionDigits:0})} USD</div>
        </Field>

        <div style={{ display:"flex", justifyContent:"center", margin:"12px 0" }}>
          <div style={{ width:"32px", height:"32px", borderRadius:"10px", background:"var(--surface)", border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--t2)" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
          </div>
        </div>

        <Field label="Получатель получит">
          <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"14px 16px", borderRadius:"14px", background:"var(--surface-2)", border:"1px solid var(--sep)" }}>
            <button onClick={()=>setShowCurr(!showCurr)} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"6px 12px", borderRadius:"8px", background:"var(--brand-08)", border:"1px solid var(--brand-16)", flexShrink:0, cursor:"pointer" }}>
              <span style={{ fontSize:"14px" }}>{info.flag}</span>
              <span style={{ color:"var(--brand)", fontSize:"13px", fontWeight:700 }}>{to}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div style={{ flex:1, fontSize:"28px", fontWeight:300, color:"var(--brand)", letterSpacing:"-1px", textAlign:"right", fontVariantNumeric:"tabular-nums" }}>{received}</div>
          </div>
          <div style={{ fontSize:"12px", color:"var(--t2)", marginTop:"6px", paddingLeft:"4px" }}>Курс: 1 {from} = {info.rate} {to}</div>
        </Field>

        {/* Currency picker */}
        {showCurr && (
          <div style={{ marginTop:"12px", borderRadius:"14px", border:"1px solid var(--sep)", overflow:"hidden" }}>
            {Object.entries(RATES).map(([code, r], i, arr) => (
              <button key={code} onClick={()=>{ setTo(code); setShowCurr(false); }}
                style={{
                  width:"100%", display:"flex", alignItems:"center", gap:"12px", padding:"12px 16px",
                  background: to===code?"var(--brand-08)":"transparent", border:"none",
                  borderBottom: i<arr.length-1?"1px solid var(--sep)":"none", cursor:"pointer", textAlign:"left",
                }}
              >
                <span style={{ fontSize:"20px" }}>{r.flag}</span>
                <span style={{ flex:1, fontSize:"14px", fontWeight:500, color:"var(--t1)" }}>{r.name}</span>
                <span style={{ fontSize:"13px", fontWeight:700, color:"var(--brand)" }}>{code}</span>
                {to===code && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Route visualization */}
      <div className="fade-up s3" style={{ borderRadius:"20px", background:"var(--surface)", border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)", padding:"20px", marginBottom:"14px" }}>
        <div style={{ fontSize:"12px", fontWeight:700, color:"var(--t2)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"16px" }}>Маршрут перевода</div>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"center", gap:"0" }}>
          <RouteNode flag="🇷🇺" code="RUB" label="Фиат"/>
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", paddingTop:"8px" }}>
            <div style={{ width:"100%", height:"1px", background:"linear-gradient(90deg,var(--brand),var(--brand-16))", position:"relative" }}>
              <div style={{ position:"absolute", top:"-3px", left:"50%", transform:"translateX(-50%)", width:"6px", height:"6px", borderRadius:"50%", background:"var(--brand)" }}/>
            </div>
            <span style={{ fontSize:"9px", color:"var(--t2)", fontWeight:500 }}>≈30с</span>
          </div>
          <RouteNode flag="💵" code="USDT" label="Стейблкоин" active/>
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", paddingTop:"8px" }}>
            <div style={{ width:"100%", height:"1px", background:"linear-gradient(90deg,var(--brand-16),var(--brand))", position:"relative" }}>
              <div style={{ position:"absolute", top:"-3px", left:"50%", transform:"translateX(-50%)", width:"6px", height:"6px", borderRadius:"50%", background:"var(--brand)" }}/>
            </div>
            <span style={{ fontSize:"9px", color:"var(--t2)", fontWeight:500 }}>≈2мин</span>
          </div>
          <RouteNode flag={info.flag} code={to} label={info.name}/>
        </div>

        <div style={{ marginTop:"16px", borderTop:"1px solid var(--sep)", paddingTop:"4px" }}>
          <FeeRow label="Комиссия сети" value={`${fee} RUB`}/>
          <FeeRow label="Время исполнения" value="~2 мин 30 сек"/>
          <FeeRow label="Правовой узел" value="BY-PBT-012" highlight/>
        </div>
      </div>

      {/* CTA */}
      <div className="fade-up s4">
        <button onClick={execute} disabled={txState!=="idle"}
          style={{
            width:"100%", padding:"17px", borderRadius:"16px", border:"none", cursor:txState!=="idle"?"default":"pointer",
            fontSize:"16px", fontWeight:700, letterSpacing:"-0.2px",
            background: txState==="done" ? "var(--green)" : "var(--brand)",
            color:"#fff", boxShadow: txState!=="idle"?"none":"0 4px 20px var(--brand-16), 0 1px 4px rgba(0,0,0,0.1)",
            transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
            display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
          }}
          onPointerDown={e=>{ if(txState==="idle") (e.currentTarget.style.transform="scale(0.97)"); }}
          onPointerUp={e=>(e.currentTarget.style.transform="scale(1)")}
          onPointerLeave={e=>(e.currentTarget.style.transform="scale(1)")}
        >
          {txState==="processing" && <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>}
          {txState==="done"
            ? <>✓ Перевод отправлен</>
            : txState==="processing"
            ? "Обработка..."
            : "Выполнить перевод"
          }
        </button>
        <div style={{ textAlign:"center", marginTop:"10px" }}>
          <span style={{ fontSize:"11px", color:"var(--t3)" }}>Декрет №19 (РБ) · ФЗ-259 (РФ) · Полная правовая защита</span>
        </div>
      </div>
    </div>
  );
}
