import { useState } from "react";
import { useAccount } from "@/context/AccountContext";

type TxState = "idle"|"aml_check"|"routing"|"done";
type Step    = 0|1|2;

const CURRENCIES: Record<string,{flag:string;name:string;rate:number;sys:string}> = {
  CNY:{ flag:"🇨🇳", name:"Китайский юань",   rate:0.0809, sys:"CIPS / Unionpay"    },
  AED:{ flag:"🇦🇪", name:"Дирхам ОАЭ",       rate:0.0277, sys:"UAEFTS"             },
  TRY:{ flag:"🇹🇷", name:"Турецкая лира",    rate:0.882,  sys:"EFT"                },
  INR:{ flag:"🇮🇳", name:"Рупия Индия",      rate:0.847,  sys:"UPI"                },
  USD:{ flag:"🇺🇸", name:"Доллар США",       rate:0.011,  sys:"Fedwire"            },
  EUR:{ flag:"🇪🇺", name:"Евро",             rate:0.0101, sys:"SEPA"               },
  KZT:{ flag:"🇰🇿", name:"Тенге Казахстан",  rate:4.98,   sys:"IBSC"               },
};

function AMLWidget({ address }: { address: string }) {
  const clean = address.length > 3;
  const score = clean ? 2 : 0;
  const w = clean ? (100 - score) : 0;
  if (!clean) return null;
  return (
    <div style={{ marginTop:"10px", padding:"12px 14px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
        <span style={{ fontSize:"10px", fontWeight:700, color:"var(--t2)", letterSpacing:"0.08em", textTransform:"uppercase" }}>AI AML Сканер</span>
        <div style={{ padding:"2px 8px", borderRadius:"4px", background:"var(--green-bg)", border:"1px solid var(--green-bdr)" }}>
          <span style={{ fontSize:"9px", fontWeight:800, color:"var(--green)" }}>Верифицировано AI Compliance</span>
        </div>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
            <span style={{ fontSize:"11px", color:"var(--t2)" }}>Риск-анализ ИИ</span>
            <span style={{ fontSize:"11px", fontWeight:700, color:"var(--green)", fontFamily:"var(--mono)" }}>{score}% (Чистый адрес)</span>
          </div>
          <div style={{ height:"3px", background:"var(--border-2)", borderRadius:"2px", overflow:"hidden" }}>
            <div style={{ width:`${w}%`, height:"100%", background:"var(--green)", borderRadius:"2px" }}/>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px" }}>
        {[{ l:"Биржа",    v:"94%", c:"var(--green)" },
          { l:"P2P",      v:"6%",  c:"var(--cyan)"  },
          { l:"Миксер",   v:"0%",  c:"var(--t3)"    },
        ].map(r=>(
          <div key={r.l} style={{ textAlign:"center", padding:"8px", borderRadius:"6px", background:"var(--surface)", border:"1px solid var(--border)" }}>
            <div style={{ fontSize:"9px", color:"var(--t3)", marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{r.l}</div>
            <div style={{ fontSize:"14px", fontWeight:700, color:r.c, fontFamily:"var(--mono)" }}>{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pipeline({ from, to, stab }: { from:string; to:string; stab:string }) {
  const { mode } = useAccount();
  const isBiz = mode==="business";
  return (
    <div style={{ padding:"14px 16px", borderRadius:"var(--r-lg)", background:"var(--surface)", border:"1px solid var(--border)", marginBottom:"14px" }}>
      <div style={{ fontSize:"10px", fontWeight:700, color:"var(--t3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"14px" }}>
        {isBiz ? "B2B Конвертационный конвейер · ВЭД" : "Маршрут перевода"}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"0" }}>
        {[
          { label:`Ввод фиата`,    code:from,  sub:"Фиат-шлюз ПВТ",   color:"var(--cyan)" },
          { label:"Авто-конверт.", code:stab,  sub:"~30 сек · Polygon",color:"var(--gold)"  },
          { label:"Вывод партн.",  code:to,    sub:CURRENCIES[to]?.sys||"", color:"var(--green)"},
        ].map((node, i, arr) => (
          <div key={node.code} style={{ display:"flex", alignItems:"center", flex: i<arr.length-1?1:undefined }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
              <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:`${node.color}14`, border:`1px solid ${node.color}26`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:"10px", fontWeight:800, color:node.color, fontFamily:"var(--mono)" }}>{node.code}</span>
              </div>
              <div style={{ fontSize:"9px", color:"var(--t3)", textAlign:"center", maxWidth:"56px", lineHeight:1.3 }}>{node.label}</div>
              <div style={{ fontSize:"8px", color:"var(--t3)", textAlign:"center", maxWidth:"56px", opacity:0.7 }}>{node.sub}</div>
            </div>
            {i<arr.length-1 && (
              <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,${node.color}60,${arr[i+1].color}60)`, margin:"0 4px 18px" }}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BridgeScreen() {
  const { mode }            = useAccount();
  const isBiz               = mode==="business";
  const [amount, setAmount] = useState("150000");
  const [from]              = useState("RUB");
  const [to, setTo]         = useState("CNY");
  const [stab, setStab]     = useState<"USDT"|"USDC">("USDT");
  const [step, setStep]     = useState<Step>(0);
  const [txState, setTxState] = useState<TxState>("idle");
  const [walletAddr, setWalletAddr] = useState("bc1q9k2rsln...");
  const [showCurr, setShowCurr]     = useState(false);
  /* B2B fields */
  const [contract, setContract]     = useState("ДОГ-2025/447");
  const [hsCode, setHsCode]         = useState("8471.30.000 0");
  const [partner, setPartner]       = useState("Shenzhen TechBridge Co., Ltd");

  const num      = parseFloat(amount)||0;
  const info     = CURRENCIES[to];
  const received = (num*(info?.rate||0)).toLocaleString("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2});
  const fee      = (num*0.0025).toLocaleString("ru-RU",{maximumFractionDigits:0});
  const saving   = (num*0.0025*0.3).toFixed(0);

  const execute = () => {
    if(txState!=="idle") return;
    setTxState("aml_check");
    setTimeout(()=>{ setTxState("routing"); setStep(1); },1200);
    setTimeout(()=>{ setTxState("done");    setStep(2); },2600);
  };

  const STEPS = ["Ввод","Маршрут","Исполнен"];

  const FieldInput = ({ label, value, onChange, mono=false, disabled=false }: { label:string;value:string;onChange?:(v:string)=>void;mono?:boolean;disabled?:boolean }) => (
    <div style={{ marginBottom:"10px" }}>
      <div className="lbl" style={{ marginBottom:"5px" }}>{label}</div>
      <input value={value} onChange={e=>onChange?.(e.target.value)} disabled={disabled}
        style={{
          width:"100%", padding:"10px 12px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)",
          color:"var(--t1)", fontSize:"13px", fontWeight:500, outline:"none", fontFamily:mono?"var(--mono)":undefined,
          opacity:disabled?0.5:1,
        }}
      />
    </div>
  );

  return (
    <div style={{ padding:"20px 16px 28px" }}>

      {/* Header */}
      <div className="fu" style={{ marginBottom:"22px" }}>
        <div className="lbl" style={{ marginBottom:"6px" }}>Союзное государство · Декрет №19</div>
        <div style={{ fontSize:"26px", fontWeight:700, color:"var(--t1)", letterSpacing:"-1px", marginBottom:"4px" }}>
          {isBiz ? "B2B ВЭД Bridge" : "Трансграничный Bridge"}
        </div>
        <div style={{ fontSize:"12px", color:"var(--t3)" }}>Беспоставочный финансовый инструмент · Без SWIFT</div>
      </div>

      {/* Progress steps */}
      <div className="fu s1" style={{ display:"flex", alignItems:"center", marginBottom:"22px" }}>
        {STEPS.map((s,i)=>(
          <div key={s} style={{ display:"flex", alignItems:"center", flex:i<STEPS.length-1?1:undefined }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
              <div style={{
                width:"26px", height:"26px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                background:i<step?"var(--green)":i===step?"var(--cyan-bg)":"var(--surface-3)",
                border:`1px solid ${i<step?"var(--green)":i===step?"var(--cyan-bdr)":"var(--border)"}`,
                transition:"all 0.3s",
              }}>
                {i<step
                  ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <span style={{ fontSize:"11px", fontWeight:700, color:i===step?"var(--cyan)":"var(--t3)" }}>{i+1}</span>
                }
              </div>
              <span style={{ fontSize:"9px", fontWeight:600, letterSpacing:"0.06em", color:i<=step?"var(--cyan)":"var(--t3)", whiteSpace:"nowrap" }}>{s}</span>
            </div>
            {i<STEPS.length-1 && (
              <div style={{ flex:1, height:"1px", background:i<step?"var(--green)":"var(--border)", margin:"0 6px 16px", transition:"background 0.4s" }}/>
            )}
          </div>
        ))}
      </div>

      {/* AML status */}
      <div className="fu s2" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", borderRadius:"var(--r)", background:"var(--green-bg)", border:"1px solid var(--green-bdr)", marginBottom:"18px" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
        </svg>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:"12px", fontWeight:700, color:"var(--green)" }}>AI AML-мониторинг — Нарушений не выявлено</div>
          <div style={{ fontSize:"10px", color:"var(--green)", opacity:0.7 }}>OFAC · EU · UN · FinCEN · Росфинмониторинг — все реестры проверены</div>
        </div>
        <div style={{ padding:"3px 8px", borderRadius:"5px", background:"var(--green)", flexShrink:0 }}>
          <span style={{ fontSize:"9px", fontWeight:800, color:"#fff" }}>✓ CLEAN</span>
        </div>
      </div>

      {/* Transfer form */}
      <div className="fu s2 card" style={{ padding:"16px", marginBottom:"14px" }}>
        <div className="lbl" style={{ marginBottom:"12px" }}>Сумма перевода</div>
        {/* Send */}
        <div style={{ padding:"12px 14px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)", marginBottom:"6px" }}>
          <div className="lbl" style={{ marginBottom:"6px" }}>Вы отправляете · RUB / BYN</div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ display:"flex", gap:"4px" }}>
              {(["RUB","BYN"] as const).map(c=>(
                <div key={c} style={{ padding:"4px 10px", borderRadius:"5px", background:from===c?"var(--surface-2)":"transparent", border:"1px solid var(--border)", fontSize:"11px", fontWeight:700, color:from===c?"var(--t1)":"var(--t3)", cursor:"pointer" }}>{c}</div>
              ))}
            </div>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}
              style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:"26px", fontWeight:300, color:"var(--t1)", textAlign:"right", fontFamily:"var(--mono)" }}
            />
          </div>
          <div style={{ fontSize:"11px", color:"var(--t3)", marginTop:"4px", fontFamily:"var(--mono)" }}>
            ≈ ${(num*0.011).toLocaleString("en-US",{maximumFractionDigits:0})} USD
          </div>
        </div>

        {/* Stablecoin selector */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 14px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)", marginBottom:"6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
          <span style={{ fontSize:"11px", color:"var(--t2)", flex:1 }}>Авто-конвертация в стейблкоин</span>
          <div style={{ display:"flex", gap:"4px" }}>
            {(["USDT","USDC"] as const).map(s=>(
              <button key={s} onClick={()=>setStab(s)} style={{
                padding:"4px 10px", borderRadius:"5px", fontSize:"11px", fontWeight:700, cursor:"pointer", border:"1px solid",
                borderColor:stab===s?"var(--gold-bdr)":"var(--border)",
                background:stab===s?"var(--gold-bg)":"transparent",
                color:stab===s?"var(--gold)":"var(--t3)",
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Receive */}
        <div style={{ padding:"12px 14px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)" }}>
          <div className="lbl" style={{ marginBottom:"6px" }}>Партнёр получит</div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <button onClick={()=>setShowCurr(!showCurr)} style={{
              display:"flex", alignItems:"center", gap:"6px", padding:"6px 10px", borderRadius:"6px",
              background:"var(--surface-2)", border:"1px solid var(--border-2)", cursor:"pointer",
            }}>
              <span style={{ fontSize:"16px" }}>{info?.flag}</span>
              <span style={{ fontSize:"12px", fontWeight:700, color:"var(--t1)" }}>{to}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div style={{ flex:1, fontSize:"26px", fontWeight:300, color:"var(--green)", textAlign:"right", fontFamily:"var(--mono)" }}>{received}</div>
          </div>
          <div style={{ fontSize:"11px", color:"var(--t3)", marginTop:"4px", fontFamily:"var(--mono)" }}>Курс: 1 RUB = {info?.rate} {to} · {info?.sys}</div>
        </div>

        {/* Currency picker */}
        {showCurr && (
          <div style={{ marginTop:"8px", borderRadius:"var(--r)", border:"1px solid var(--border)", overflow:"hidden" }}>
            {Object.entries(CURRENCIES).map(([code,c],i,arr)=>(
              <button key={code} onClick={()=>{ setTo(code); setShowCurr(false); }}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px",
                  background:to===code?"var(--surface-3)":"var(--surface-2)", border:"none",
                  borderBottom:i<arr.length-1?"1px solid var(--border)":"none", cursor:"pointer", textAlign:"left" }}
              >
                <span style={{ fontSize:"18px" }}>{c.flag}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"13px", fontWeight:600, color:"var(--t1)" }}>{c.name}</div>
                  <div style={{ fontSize:"10px", color:"var(--t3)" }}>{c.sys}</div>
                </div>
                <span style={{ fontSize:"12px", fontWeight:700, color:"var(--cyan)", fontFamily:"var(--mono)" }}>{code}</span>
                {to===code && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AML widget for wallet address */}
      <div className="fu s3 card" style={{ padding:"16px", marginBottom:"14px" }}>
        <div className="lbl" style={{ marginBottom:"8px" }}>Адрес получателя ({stab})</div>
        <input value={walletAddr} onChange={e=>setWalletAddr(e.target.value)}
          style={{ width:"100%", padding:"10px 12px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)", color:"var(--t1)", fontSize:"12px", outline:"none", fontFamily:"var(--mono)" }}
        />
        <AMLWidget address={walletAddr}/>
      </div>

      {/* B2B specific fields */}
      {isBiz && (
        <div className="fu s3 card" style={{ padding:"16px", marginBottom:"14px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
            <div style={{ width:"8px", height:"8px", borderRadius:"2px", background:"var(--gold)" }}/>
            <span style={{ fontSize:"13px", fontWeight:700, color:"var(--t1)" }}>ВЭД-документация</span>
            <div style={{ padding:"2px 8px", borderRadius:"5px", background:"var(--gold-bg)", border:"1px solid var(--gold-bdr)" }}>
              <span style={{ fontSize:"9px", fontWeight:700, color:"var(--gold)" }}>B2B PREMIUM</span>
            </div>
          </div>
          <FieldInput label="Номер контракта" value={contract} onChange={setContract} mono/>
          <FieldInput label="Код ТН ВЭД (HS Code)" value={hsCode} onChange={setHsCode} mono/>
          <FieldInput label="Организация-партнёр" value={partner} onChange={setPartner}/>
          <FieldInput label="Правовой статус" value="Кастодиальное хранение · Декрет №19" disabled/>
        </div>
      )}

      {/* Pipeline */}
      <div className="fu s3">
        <Pipeline from={from==="RUB"?"RUB":"BYN"} to={to} stab={stab}/>
      </div>

      {/* Fee breakdown */}
      <div className="fu s4 card" style={{ padding:"16px", marginBottom:"14px" }}>
        {[
          { l:"Комиссия платформы (0.25%)", v:`${fee} RUB`, hi:false },
          { l:"Сетевая комиссия",           v:"~$0.80 USDT",hi:false },
          { l:"Экономия через арбитраж",    v:`$${saving}`, hi:true,  c:"var(--green)" },
          { l:"Время исполнения",           v:"~2 мин 30 сек",hi:false },
          { l:"Правовой узел",              v:"BY-PBT-012",  hi:true,  c:"var(--cyan)" },
        ].map(r=>(
          <div key={r.l} className="stat">
            <span style={{ fontSize:"13px", color:"var(--t2)" }}>{r.l}</span>
            <span style={{ fontSize:"13px", fontWeight:700, color:r.hi?(r.c||"var(--t1)"):"var(--t2)", fontFamily:"var(--mono)" }}>{r.v}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="fu s5">
        <button onClick={execute} disabled={txState!=="idle"}
          style={{
            width:"100%", padding:"16px", borderRadius:"var(--r-lg)", border:"none", cursor:txState!=="idle"?"default":"pointer",
            fontSize:"15px", fontWeight:700, letterSpacing:"0.02em",
            background:txState==="done"?"var(--green)":txState==="aml_check"?"var(--gold)":"var(--cyan)",
            color:txState==="aml_check"?"#000":"#fff",
            boxShadow:txState!=="idle"?"none":"0 4px 24px rgba(6,182,212,0.25)",
            transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)",
            display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
          }}
          onPointerDown={e=>{ if(txState==="idle")(e.currentTarget.style.transform="scale(0.97)"); }}
          onPointerUp={e=>(e.currentTarget.style.transform="scale(1)")}
          onPointerLeave={e=>(e.currentTarget.style.transform="scale(1)")}
        >
          {(txState==="aml_check"||txState==="routing") && (
            <svg className="sp" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
          )}
          {txState==="idle"    && "Выполнить трансграничный перевод"}
          {txState==="aml_check" && "AML-мониторинг..."}
          {txState==="routing"   && "Построение маршрута..."}
          {txState==="done"      && "✓ Перевод исполнен"}
        </button>
        <div style={{ textAlign:"center", marginTop:"10px" }}>
          <span style={{ fontSize:"10px", color:"var(--t3)" }}>Беспоставочный инструмент · Декрет №19 (РБ) · ФЗ-259 (РФ) · Полная правовая защита</span>
        </div>
      </div>
    </div>
  );
}
