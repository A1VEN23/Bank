import { useState } from "react";

type EarnTab = "deposit"|"staking"|"loan";

const DEPOSITS = [
  { asset:"BTC",  name:"Bitcoin",      apyTiers:[{d:"30",apy:5.5},{d:"90",apy:8.0},{d:"180",apy:10.5}], min:"0.01 BTC",  badge:"Макс. доход" },
  { asset:"ETH",  name:"Ethereum",     apyTiers:[{d:"30",apy:4.2},{d:"90",apy:5.8},{d:"180",apy:7.5}],  min:"0.1 ETH",   badge:null },
  { asset:"USDT", name:"Tether USD",   apyTiers:[{d:"30",apy:6.5},{d:"90",apy:8.2},{d:"180",apy:10.0}], min:"500 USDT",  badge:"Популярный" },
  { asset:"USDC", name:"USD Coin",     apyTiers:[{d:"30",apy:6.3},{d:"90",apy:8.0},{d:"180",apy:9.8}],  min:"500 USDC",  badge:null },
  { asset:"TON",  name:"TON Crystal",  apyTiers:[{d:"30",apy:5.0},{d:"90",apy:7.2},{d:"180",apy:9.0}],  min:"50 TON",    badge:null },
];

const VALIDATORS = [
  { name:"Everstake",    network:"ETH + TON", apy:6.8, commission:3, uptime:"99.95%", staked:"$1.2B", verified:true  },
  { name:"P2P Validator",network:"ETH + SOL", apy:6.5, commission:5, uptime:"99.90%", staked:"$980M", verified:true  },
  { name:"Certus One",   network:"TON",       apy:6.2, commission:4, uptime:"99.88%", staked:"$540M", verified:true  },
  { name:"Kiln Finance", network:"ETH",       apy:5.9, commission:5, uptime:"99.82%", staked:"$320M", verified:false },
];

function TabBtn({ label, active, onClick, badge }: { label:string;active:boolean;onClick:()=>void;badge?:string }) {
  const [pr, setPr] = useState(false);
  return (
    <button
      onPointerDown={()=>setPr(true)} onPointerUp={()=>{ setPr(false); onClick(); }} onPointerLeave={()=>setPr(false)}
      style={{
        flex:1, padding:"9px 6px", borderRadius:"7px", border:"none", cursor:"pointer",
        background:active?"var(--surface-2)":"transparent",
        color:active?"var(--t1)":"var(--t3)",
        fontWeight:700, fontSize:"11px", letterSpacing:"0.04em", textTransform:"uppercase",
        boxShadow:active?"0 1px 6px rgba(0,0,0,0.4)":"none",
        transform:pr?"scale(0.94)":"scale(1)", transition:"all 0.15s",
        display:"flex", flexDirection:"column", alignItems:"center", gap:"2px",
      }}
    >
      {label}
      {badge && <div style={{ fontSize:"8px", color:active?"var(--gold)":"var(--t3)", letterSpacing:"0.06em" }}>{badge}</div>}
    </button>
  );
}

function LiqPriceWidget({ asset, price, amt, ltv }: { asset:string;price:number;amt:number;ltv:number }) {
  const value  = amt * price;
  const loan   = value * (ltv/100);
  const liqLTV = 0.85;
  const liqPr  = loan / (amt * liqLTV);
  const drop   = ((price - liqPr)/price*100).toFixed(1);
  const safe   = ltv < 75;
  return (
    <div style={{ padding:"14px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)", marginTop:"14px" }}>
      <div className="lbl" style={{ marginBottom:"10px" }}>Калькулятор ликвидации</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
        {[
          { l:"Стоимость залога",   v:`$${value.toLocaleString("en-US",{maximumFractionDigits:0})}`, c:"var(--t1)" },
          { l:"Макс. займ",         v:`$${loan.toLocaleString("en-US",{maximumFractionDigits:0})}`,  c:"var(--cyan)" },
          { l:"Цена ликвидации",    v:`$${liqPr.toLocaleString("en-US",{maximumFractionDigits:0})}`,  c:safe?"var(--green)":"var(--red)" },
          { l:"Запас до ликв.",     v:`${drop}% падения`,  c:safe?"var(--green)":"var(--red)" },
        ].map(r=>(
          <div key={r.l} style={{ padding:"10px 12px", borderRadius:"var(--r)", background:"var(--surface)", border:"1px solid var(--border)" }}>
            <div style={{ fontSize:"9px", color:"var(--t3)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"5px" }}>{r.l}</div>
            <div style={{ fontSize:"15px", fontWeight:700, color:r.c, fontFamily:"var(--mono)" }}>{r.v}</div>
          </div>
        ))}
      </div>
      {!safe && (
        <div style={{ marginTop:"8px", padding:"8px 10px", borderRadius:"6px", background:"var(--red-bg)", border:"1px solid var(--red-bdr)" }}>
          <span style={{ fontSize:"11px", color:"var(--red)", fontWeight:600 }}>⚠ Высокий LTV — риск ликвидации. Рекомендован LTV ≤ 70%.</span>
        </div>
      )}
    </div>
  );
}

export default function EarnScreen() {
  const [tab, setTab]       = useState<EarnTab>("deposit");
  const [selDep, setSelDep] = useState("BTC");
  const [selTier, setSelTier] = useState(1);
  const [depAmt, setDepAmt] = useState(5000);
  const [selVal, setSelVal] = useState("Everstake");
  const [stakAmt, setStakAmt] = useState(1000);
  const [collAmt, setCollAmt] = useState(0.5);
  const [ltv, setLtv]       = useState(65);
  const [delegated, setDelegated] = useState(false);

  const dep  = DEPOSITS.find(d=>d.asset===selDep)!;
  const tier = dep.apyTiers[selTier];
  const monthly = (depAmt*(tier.apy/100)/12).toFixed(2);
  const annual  = (depAmt*(tier.apy/100)).toFixed(2);

  const val = VALIDATORS.find(v=>v.name===selVal)!;
  const stakReward = (stakAmt*val.apy/100/365).toFixed(4);

  const collPrice = 47248;

  return (
    <div style={{ padding:"20px 16px 28px" }}>

      {/* Header */}
      <div className="fu" style={{ marginBottom:"22px" }}>
        <div className="lbl" style={{ marginBottom:"6px" }}>Декрет №19 · Кастодиальное хранение</div>
        <div style={{ fontSize:"26px", fontWeight:700, color:"var(--t1)", letterSpacing:"-1px", marginBottom:"4px" }}>Вклады и Заработок</div>
        <div style={{ fontSize:"12px", color:"var(--t3)" }}>Арбитраж ликвидности · Верифицированные валидаторы</div>
      </div>

      {/* Summary */}
      <div className="fu s1" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px", marginBottom:"22px" }}>
        {[
          { l:"Активных вкладов", v:"3",     c:"var(--t1)" },
          { l:"Доход / мес.",     v:"$218",  c:"var(--green)" },
          { l:"Стейкинг",        v:"2 500", c:"var(--cyan)" },
        ].map(s=>(
          <div key={s.l} className="card" style={{ padding:"12px 10px", textAlign:"center" }}>
            <div style={{ fontSize:"18px", fontWeight:700, color:s.c, fontFamily:"var(--mono)", marginBottom:"4px" }}>{s.v}</div>
            <div style={{ fontSize:"9px", color:"var(--t3)", lineHeight:1.3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="fu s2" style={{ display:"flex", gap:"0", padding:"3px", borderRadius:"10px", background:"var(--surface-3)", border:"1px solid var(--border)", marginBottom:"22px" }}>
        <TabBtn label="Криптодепозиты" active={tab==="deposit"} onClick={()=>setTab("deposit")} badge="ДО 10.5%"/>
        <TabBtn label="Стейкинг"       active={tab==="staking"} onClick={()=>setTab("staking")} badge="ДО 6.8%"/>
        <TabBtn label="Займы"          active={tab==="loan"}    onClick={()=>setTab("loan")}    badge="4.5% год"/>
      </div>

      {/* ─── DEPOSITS ─── */}
      {tab==="deposit" && (
        <div className="fu s3">
          {/* Product list */}
          <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"18px" }}>
            {DEPOSITS.map(d=>{
              const on = selDep===d.asset;
              return (
                <button key={d.asset} onClick={()=>{ setSelDep(d.asset); setSelTier(1); }}
                  style={{
                    display:"flex", alignItems:"center", gap:"12px", padding:"12px 14px",
                    borderRadius:"var(--r-lg)", border:"1px solid", textAlign:"left", cursor:"pointer",
                    borderColor:on?"var(--cyan-bdr)":"var(--border)",
                    background:on?"var(--surface-2)":"var(--surface)",
                    transition:"all 0.2s",
                  }}>
                  <div style={{ width:"36px", height:"36px", borderRadius:"8px", background:on?"var(--cyan-bg)":"var(--surface-3)", border:`1px solid ${on?"var(--cyan-bdr)":"var(--border)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:"11px", fontWeight:800, color:on?"var(--cyan)":"var(--t2)", fontFamily:"var(--mono)" }}>{d.asset}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"2px" }}>
                      <span style={{ fontSize:"13px", fontWeight:700, color:"var(--t1)" }}>{d.name}</span>
                      {d.badge && <span style={{ fontSize:"8px", fontWeight:700, padding:"2px 6px", borderRadius:"4px", background:"var(--gold-bg)", color:"var(--gold)", border:"1px solid var(--gold-bdr)" }}>{d.badge}</span>}
                    </div>
                    <div style={{ fontSize:"10px", color:"var(--t3)" }}>от {d.min}</div>
                  </div>
                  <div style={{ display:"flex", gap:"4px" }}>
                    {d.apyTiers.map((t,i)=>(
                      <div key={t.d} style={{
                        padding:"3px 7px", borderRadius:"5px", fontSize:"11px", fontWeight:700,
                        background:on&&i===selTier?"var(--green)":on?"var(--surface-3)":"var(--surface-3)",
                        color:on&&i===selTier?"#fff":"var(--t3)",
                        cursor:"pointer", fontFamily:"var(--mono)",
                      }} onClick={e=>{e.stopPropagation();setSelDep(d.asset);setSelTier(i);}}>
                        {t.apy}%
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Calculator */}
          <div className="card" style={{ padding:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
              <div className="lbl">Калькулятор доходности</div>
              <div style={{ padding:"4px 10px", borderRadius:"6px", background:"var(--green-bg)", border:"1px solid var(--green-bdr)" }}>
                <span style={{ fontSize:"11px", fontWeight:700, color:"var(--green)", fontFamily:"var(--mono)" }}>{tier.apy}% · {tier.d} дней</span>
              </div>
            </div>

            {/* Tier selector */}
            <div style={{ display:"flex", gap:"6px", marginBottom:"14px" }}>
              {dep.apyTiers.map((t,i)=>(
                <button key={t.d} onClick={()=>setSelTier(i)} style={{
                  flex:1, padding:"8px 6px", borderRadius:"6px", border:"1px solid",
                  borderColor:i===selTier?"var(--green-bdr)":"var(--border)",
                  background:i===selTier?"var(--green-bg)":"var(--surface-2)",
                  cursor:"pointer", textAlign:"center",
                }}>
                  <div style={{ fontSize:"13px", fontWeight:700, color:i===selTier?"var(--green)":"var(--t2)", fontFamily:"var(--mono)" }}>{t.apy}%</div>
                  <div style={{ fontSize:"9px", color:"var(--t3)", marginTop:"2px" }}>{t.d} дней</div>
                </button>
              ))}
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <span style={{ fontSize:"12px", color:"var(--t2)" }}>Сумма вклада (USD)</span>
              <span style={{ fontSize:"16px", fontWeight:700, color:"var(--t1)", fontFamily:"var(--mono)" }}>${depAmt.toLocaleString()}</span>
            </div>
            <input type="range" min={100} max={100000} step={100} value={depAmt} onChange={e=>setDepAmt(+e.target.value)}
              style={{ width:"100%", marginBottom:"16px", background:`linear-gradient(to right,var(--green) ${depAmt/1000}%,var(--surface-3) ${depAmt/1000}%)` }}
            />

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"16px" }}>
              {[{l:"В месяц",v:`$${monthly}`},{l:"За срок",v:`$${annual}`}].map(r=>(
                <div key={r.l} style={{ padding:"12px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)", textAlign:"center" }}>
                  <div className="lbl" style={{ marginBottom:"5px" }}>{r.l}</div>
                  <div style={{ fontSize:"22px", fontWeight:300, color:"var(--green)", fontFamily:"var(--mono)" }}>{r.v}</div>
                </div>
              ))}
            </div>

            <button style={{
              width:"100%", padding:"14px", borderRadius:"var(--r)", border:"none", cursor:"pointer",
              background:"var(--green)", color:"#fff", fontSize:"14px", fontWeight:700,
              boxShadow:"0 4px 20px rgba(16,185,129,0.25)", transition:"transform 0.12s",
            }}
              onPointerDown={e=>(e.currentTarget.style.transform="scale(0.97)")}
              onPointerUp={e=>(e.currentTarget.style.transform="scale(1)")}
              onPointerLeave={e=>(e.currentTarget.style.transform="scale(1)")}
            >
              Открыть {dep.asset} вклад — {tier.apy}% годовых
            </button>
          </div>
        </div>
      )}

      {/* ─── STAKING ─── */}
      {tab==="staking" && (
        <div className="fu s3">
          <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"18px" }}>
            {VALIDATORS.map(v=>{
              const on = selVal===v.name;
              return (
                <button key={v.name} onClick={()=>setSelVal(v.name)}
                  style={{
                    display:"flex", alignItems:"center", gap:"12px", padding:"14px", cursor:"pointer",
                    borderRadius:"var(--r-lg)", border:"1px solid", textAlign:"left",
                    borderColor:on?"var(--cyan-bdr)":"var(--border)",
                    background:on?"var(--surface-2)":"var(--surface)", transition:"all 0.2s",
                  }}>
                  <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:on?"var(--cyan-bg)":"var(--surface-3)", border:`1px solid ${on?"var(--cyan-bdr)":"var(--border)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {v.verified
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    }
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"3px" }}>
                      <span style={{ fontSize:"14px", fontWeight:700, color:"var(--t1)" }}>{v.name}</span>
                      {v.verified && <span style={{ fontSize:"8px", fontWeight:700, padding:"2px 6px", borderRadius:"4px", background:"var(--cyan-bg)", color:"var(--cyan)", border:"1px solid var(--cyan-bdr)" }}>VERIFIED</span>}
                    </div>
                    <div style={{ fontSize:"11px", color:"var(--t3)" }}>{v.network} · Uptime {v.uptime} · {v.staked}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:"20px", fontWeight:300, color:"var(--green)", fontFamily:"var(--mono)" }}>{v.apy}%</div>
                    <div style={{ fontSize:"9px", color:"var(--t3)" }}>Комис. {v.commission}%</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="card" style={{ padding:"16px" }}>
            <div className="lbl" style={{ marginBottom:"12px" }}>Прямое делегирование · {val.name}</div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <span style={{ fontSize:"12px", color:"var(--t2)" }}>Стейк (USD)</span>
              <span style={{ fontSize:"16px", fontWeight:700, color:"var(--t1)", fontFamily:"var(--mono)" }}>${stakAmt.toLocaleString()}</span>
            </div>
            <input type="range" min={100} max={50000} step={100} value={stakAmt} onChange={e=>setStakAmt(+e.target.value)}
              style={{ width:"100%", marginBottom:"16px", background:`linear-gradient(to right,var(--cyan) ${stakAmt/500}%,var(--surface-3) ${stakAmt/500}%)` }}
            />
            <div style={{ padding:"12px 14px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)", marginBottom:"14px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                <span style={{ fontSize:"12px", color:"var(--t2)" }}>Ежедневное вознаграждение</span>
                <span style={{ fontSize:"13px", fontWeight:700, color:"var(--green)", fontFamily:"var(--mono)" }}>+${stakReward}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:"12px", color:"var(--t2)" }}>APY после вычета комиссии</span>
                <span style={{ fontSize:"13px", fontWeight:700, color:"var(--cyan)", fontFamily:"var(--mono)" }}>{(val.apy-val.commission*val.apy/100).toFixed(1)}%</span>
              </div>
            </div>

            <button onClick={()=>setDelegated(d=>!d)} style={{
              width:"100%", padding:"14px", borderRadius:"var(--r)", border:"none", cursor:"pointer",
              background:delegated?"var(--surface-3)":"var(--cyan)", color:delegated?"var(--t2)":"#fff",
              fontSize:"14px", fontWeight:700, border_color:delegated?"var(--border)":undefined,
              boxShadow:delegated?"none":"0 4px 20px rgba(6,182,212,0.25)", transition:"all 0.2s",
            }}
              onPointerDown={e=>(e.currentTarget.style.transform="scale(0.97)")}
              onPointerUp={e=>(e.currentTarget.style.transform="scale(1)")}
              onPointerLeave={e=>(e.currentTarget.style.transform="scale(1)")}
            >
              {delegated ? "✓ Делегировано — Отозвать" : `Делегировать → ${val.name}`}
            </button>
          </div>
        </div>
      )}

      {/* ─── LOANS ─── */}
      {tab==="loan" && (
        <div className="fu s3">
          <div className="card" style={{ padding:"16px", marginBottom:"14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
              <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:"var(--gold-bg)", border:"1px solid var(--gold-bdr)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:"16px", fontWeight:800, color:"var(--gold)", fontFamily:"var(--mono)" }}>₿</span>
              </div>
              <div>
                <div style={{ fontSize:"15px", fontWeight:700, color:"var(--t1)" }}>Займ под залог BTC</div>
                <div style={{ fontSize:"11px", color:"var(--t3)" }}>Ставка 4.5% · LTV до 75% · Кастодиальное хранение</div>
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <span style={{ fontSize:"12px", color:"var(--t2)" }}>Залог BTC</span>
              <span style={{ fontSize:"16px", fontWeight:700, color:"var(--t1)", fontFamily:"var(--mono)" }}>{collAmt.toFixed(2)} BTC</span>
            </div>
            <input type="range" min={0.01} max={5} step={0.01} value={collAmt} onChange={e=>setCollAmt(+e.target.value)}
              style={{ width:"100%", marginBottom:"14px", background:`linear-gradient(to right,var(--gold) ${(collAmt/5)*100}%,var(--surface-3) ${(collAmt/5)*100}%)` }}
            />

            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
              <span style={{ fontSize:"12px", color:"var(--t2)" }}>LTV (Loan-to-Value)</span>
              <span style={{ fontSize:"12px", fontWeight:700, color:ltv<70?"var(--green)":"var(--red)", fontFamily:"var(--mono)" }}>{ltv}%</span>
            </div>
            <input type="range" min={20} max={85} step={5} value={ltv} onChange={e=>setLtv(+e.target.value)}
              style={{ width:"100%", marginBottom:"4px", background:`linear-gradient(to right,${ltv<70?"var(--green)":"var(--red)"} ${((ltv-20)/65)*100}%,var(--surface-3) ${((ltv-20)/65)*100}%)` }}
            />
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"9px", color:"var(--t3)", marginBottom:"16px" }}>
              <span>20%</span><span style={{ color:"var(--green)" }}>Безопасная зона</span><span style={{ color:"var(--red)" }}>85% — Ликвидация</span>
            </div>

            <LiqPriceWidget asset="BTC" price={collPrice} amt={collAmt} ltv={ltv}/>

            <button style={{
              width:"100%", padding:"14px", borderRadius:"var(--r)", border:"none", cursor:"pointer",
              background:"var(--gold)", color:"#000", fontSize:"14px", fontWeight:800, marginTop:"16px",
              boxShadow:"0 4px 20px rgba(245,158,11,0.2)", transition:"transform 0.12s",
            }}
              onPointerDown={e=>(e.currentTarget.style.transform="scale(0.97)")}
              onPointerUp={e=>(e.currentTarget.style.transform="scale(1)")}
              onPointerLeave={e=>(e.currentTarget.style.transform="scale(1)")}
            >
              Получить займ — {ltv}% LTV
            </button>
          </div>

          <div style={{ padding:"12px 14px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)" }}>
            <p style={{ fontSize:"11px", color:"var(--t3)", lineHeight:1.8 }}>
              Кастодиальное хранение залога согласно Указу №19. Уведомление о маржин-колле — за 24 ч. Автоматическая ликвидация при LTV = 85%.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
