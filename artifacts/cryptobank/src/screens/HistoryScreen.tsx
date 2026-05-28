import { useState } from "react";

type Tx = {
  id:string; type:"in"|"out"|"swap"|"stake";
  name:string; cat:string; icon:string; bg:string;
  amt:number; cur:string; time:string; date:string;
  aml:number; txid:string; fee:string; network:string; party:string;
  origin:{ exchange:number; p2p:number; mixer:number };
};

const ALL: Tx[] = [
  { id:"1",  type:"in",    name:"Яндекс.Маркет — Возврат", cat:"Возврат",     icon:"📦", bg:"var(--surface-3)", amt:+1240.00,  cur:"BYN", time:"14:32", date:"Сегодня",  aml:99, txid:"byn_ref_0x7a8b9c0d1e2f3456", fee:"0 BYN",       network:"Fiat Rail BY",      party:"Яндекс.Маркет",      origin:{exchange:100,p2p:0,mixer:0} },
  { id:"2",  type:"out",   name:"Яндекс Такси",              cat:"Транспорт",   icon:"🚕", bg:"var(--surface-3)", amt:-178.50,   cur:"BYN", time:"11:15", date:"Сегодня",  aml:97, txid:"ton_0x2c3d4e5f6a7b8c9d0e",  fee:"0.12 BYN",    network:"TON Blockchain",    party:"Taxi Aggregator RU", origin:{exchange:95,p2p:5,mixer:0} },
  { id:"3",  type:"out",   name:"Пятёрочка",                 cat:"Продукты",    icon:"🛒", bg:"var(--surface-3)", amt:-89.40,    cur:"BYN", time:"09:48", date:"Сегодня",  aml:98, txid:"byn_pos_0xabcdef12345678",   fee:"0 BYN",       network:"Fiat Rail BY",      party:"X5 Retail Group",    origin:{exchange:100,p2p:0,mixer:0} },
  { id:"4",  type:"swap",  name:"B2B Bridge RUB→CNY",        cat:"ВЭД-перевод", icon:"⇄",  bg:"var(--surface-3)", amt:-150000,   cur:"RUB", time:"16:20", date:"Вчера",    aml:100,txid:"bridge_0x9d8c7b6a5f4e3d2c", fee:"375 RUB",     network:"PBT Bridge Layer",  party:"Shenzhen TechBridge", origin:{exchange:100,p2p:0,mixer:0} },
  { id:"5",  type:"stake", name:"Стейкинг Everstake",        cat:"Доходность",  icon:"✦",  bg:"var(--surface-3)", amt:+12.45,    cur:"TON", time:"06:00", date:"Вчера",    aml:100,txid:"ton_stake_7f8a9b0c1d2e",  fee:"0.01 TON",    network:"TON Blockchain",    party:"Everstake Pool",     origin:{exchange:100,p2p:0,mixer:0} },
  { id:"6",  type:"out",   name:"Netflix",                   cat:"Подписки",    icon:"🎬", bg:"var(--surface-3)", amt:-15.99,    cur:"USD", time:"13:00", date:"Вчера",    aml:96, txid:"usdt_0x1a2b3c4d5e6f7a8b",   fee:"0.5 USDT",    network:"TON Blockchain",    party:"Netflix Inc.",       origin:{exchange:92,p2p:8,mixer:0} },
  { id:"7",  type:"in",    name:"Перевод от Ивана К.",        cat:"Входящий",    icon:"↙",  bg:"var(--surface-3)", amt:+5000.00,  cur:"BYN", time:"09:14", date:"24 мая",   aml:99, txid:"byn_p2p_0x3d4e5f6a7b8c",   fee:"0 BYN",       network:"Fiat Rail BY",      party:"Иван Коваленко",     origin:{exchange:90,p2p:10,mixer:0} },
  { id:"8",  type:"out",   name:"McDonald's",                cat:"Рестораны",   icon:"🍔", bg:"var(--surface-3)", amt:-42.80,    cur:"BYN", time:"20:33", date:"24 мая",   aml:97, txid:"byn_pos_0xfed9876543210",  fee:"0 BYN",       network:"Fiat Rail BY",      party:"McD Russia LLC",     origin:{exchange:100,p2p:0,mixer:0} },
  { id:"9",  type:"swap",  name:"ETH → USDT (DEX)",          cat:"Обмен",       icon:"⇄",  bg:"var(--surface-3)", amt:-0.5,      cur:"ETH", time:"18:12", date:"24 мая",   aml:96, txid:"eth_0x5f6a7b8c9d0e1f2a",   fee:"0.0018 ETH",  network:"Ethereum Mainnet",  party:"Uniswap v3 Router",  origin:{exchange:88,p2p:12,mixer:0} },
];

function groupBy<T>(arr: T[], key: (x:T)=>string): Record<string,T[]> {
  return arr.reduce((a,x)=>{ const k=key(x); a[k]??=[]; a[k].push(x); return a; },{} as Record<string,T[]>);
}
const GROUPED = groupBy(ALL,t=>t.date);

const TYPE_COLOR: Record<string,string> = { in:"var(--green)", out:"var(--t2)", swap:"var(--cyan)", stake:"var(--gold)" };

function AMLRing({ score }: { score:number }) {
  const ok = score >= 95;
  const r=9, c=14, circ=2*Math.PI*r, dash=(score/100)*circ;
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"4px" }}>
      <svg width="28" height="28" viewBox="0 0 28 28" style={{ transform:"rotate(-90deg)" }}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--border-2)" strokeWidth="2.5"/>
        <circle cx={c} cy={c} r={r} fill="none" stroke={ok?"var(--green)":"var(--red)"} strokeWidth="2.5"
          strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"/>
      </svg>
      <span style={{ fontSize:"10px", fontWeight:700, color:ok?"var(--green)":"var(--red)", fontFamily:"var(--mono)" }}>{score}</span>
    </div>
  );
}

function OriginBar({ origin }: { origin:{exchange:number;p2p:number;mixer:number} }) {
  return (
    <div style={{ marginTop:"12px", padding:"12px 14px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)" }}>
      <div className="lbl" style={{ marginBottom:"10px" }}>Происхождение актива</div>
      {[
        { l:"Биржа (CEX)",  v:origin.exchange, c:"var(--green)" },
        { l:"P2P",          v:origin.p2p,       c:"var(--cyan)"  },
        { l:"Миксер",       v:origin.mixer,     c:"var(--red)"   },
      ].map(r=>(
        <div key={r.l} style={{ marginBottom:"7px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"3px" }}>
            <span style={{ fontSize:"11px", color:"var(--t2)" }}>{r.l}</span>
            <span style={{ fontSize:"11px", fontWeight:700, color:r.c, fontFamily:"var(--mono)" }}>{r.v}%</span>
          </div>
          <div style={{ height:"2px", background:"var(--border-2)", borderRadius:"1px", overflow:"hidden" }}>
            <div style={{ width:`${r.v}%`, height:"100%", background:r.c, borderRadius:"1px" }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailRow({ l, v, mono }: { l:string;v:string;mono?:boolean }) {
  return (
    <div className="stat">
      <span style={{ fontSize:"13px", color:"var(--t2)" }}>{l}</span>
      <span style={{ fontSize:"12px", fontWeight:600, color:"var(--t1)", fontFamily:mono?"var(--mono)":undefined, maxWidth:"175px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", textAlign:"right" }}>{v}</span>
    </div>
  );
}

export default function HistoryScreen() {
  const [sel, setSel]     = useState<Tx|null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all"|"in"|"out"|"swap">("all");

  const monthOut = ALL.filter(t=>t.type==="out"&&t.cur==="BYN").reduce((s,t)=>s+Math.abs(t.amt),0);
  const monthIn  = ALL.filter(t=>t.type==="in" &&t.cur==="BYN").reduce((s,t)=>s+t.amt,0);
  const avgAml   = Math.round(ALL.reduce((s,t)=>s+t.aml,0)/ALL.length);

  const vis = ALL
    .filter(t=> filter==="all" || t.type===filter)
    .filter(t=> !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.cat.toLowerCase().includes(search.toLowerCase()));
  const grouped = groupBy(vis,t=>t.date);

  return (
    <div style={{ padding:"20px 16px 28px", position:"relative" }}>

      {/* Header */}
      <div className="fu" style={{ marginBottom:"18px" }}>
        <div className="lbl" style={{ marginBottom:"6px" }}>Neural AML Engine v4.2 · Росфинмониторинг</div>
        <div style={{ fontSize:"26px", fontWeight:700, color:"var(--t1)", letterSpacing:"-1px", marginBottom:"18px" }}>История операций</div>

        {/* Monthly stats */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px", marginBottom:"16px" }}>
          {[
            { l:"Расход / май",  v:`${monthOut.toLocaleString("ru-RU",{maximumFractionDigits:0})} BYN`, c:"var(--t1)"   },
            { l:"Приход / май",  v:`${monthIn.toLocaleString("ru-RU",{maximumFractionDigits:0})} BYN`,  c:"var(--green)"},
            { l:"AML ср. оценка",v:`${avgAml}/100`,                                                     c:"var(--cyan)" },
          ].map(s=>(
            <div key={s.l} className="card" style={{ padding:"10px 10px" }}>
              <div style={{ fontSize:"12px", fontWeight:700, color:s.c, fontFamily:"var(--mono)", marginBottom:"3px" }}>{s.v}</div>
              <div style={{ fontSize:"9px", color:"var(--t3)", lineHeight:1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* AML banner */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", borderRadius:"var(--r)", background:"var(--green-bg)", border:"1px solid var(--green-bdr)", marginBottom:"14px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"12px", fontWeight:700, color:"var(--green)" }}>9/9 транзакций верифицированы · Нарушений не выявлено</div>
            <div style={{ fontSize:"10px", color:"var(--green)", opacity:0.7 }}>OFAC · EU · UN · FinCEN · Росфинмониторинг</div>
          </div>
          <div style={{ padding:"3px 8px", borderRadius:"5px", background:"var(--green)", flexShrink:0 }}>
            <span style={{ fontSize:"9px", fontWeight:800, color:"#fff" }}>SAFE</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 12px", borderRadius:"var(--r)", background:"var(--surface)", border:"1px solid var(--border)", marginBottom:"10px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Поиск операций..." style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:"13px", color:"var(--t1)", caretColor:"var(--cyan)" }}/>
          {search && <button onClick={()=>setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--t3)", fontSize:"16px" }}>×</button>}
        </div>

        {/* Filter */}
        <div style={{ display:"flex", gap:"5px" }}>
          {(["all","in","out","swap"] as const).map(f=>{
            const labels = { all:"Все", in:"Приход", out:"Расход", swap:"Обмен" };
            return (
              <button key={f} onClick={()=>setFilter(f)} style={{
                padding:"5px 11px", borderRadius:"6px", border:"1px solid",
                borderColor:filter===f?"var(--cyan-bdr)":"var(--border)",
                background:filter===f?"var(--cyan-bg)":"transparent",
                fontSize:"11px", fontWeight:600, color:filter===f?"var(--cyan)":"var(--t3)",
                cursor:"pointer", transition:"all 0.15s",
              }}>{labels[f]}</button>
            );
          })}
        </div>
      </div>

      {/* Transactions */}
      <div className="fu s2">
        {Object.entries(grouped).map(([date,txs])=>(
          <div key={date} style={{ marginBottom:"18px" }}>
            <div style={{ fontSize:"11px", fontWeight:700, color:"var(--t3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"8px" }}>{date}</div>
            <div className="card" style={{ overflow:"hidden", padding:0 }}>
              {txs.map((tx,i)=>(
                <button key={tx.id} onClick={()=>setSel(tx)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px",
                    borderBottom:i<txs.length-1?"1px solid var(--border)":"none",
                    background:"transparent", border:"none", cursor:"pointer", textAlign:"left", transition:"background 0.1s" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="var(--surface-2)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                >
                  <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:"var(--surface-3)", border:"1px solid var(--border-2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"18px" }}>
                    {tx.icon}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"13px", fontWeight:600, color:"var(--t1)", marginBottom:"4px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{tx.name}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <span style={{ fontSize:"10px", color:"var(--t3)" }}>{tx.cat}</span>
                      <AMLRing score={tx.aml}/>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:"13px", fontWeight:700, color:TYPE_COLOR[tx.type], fontFamily:"var(--mono)", marginBottom:"2px" }}>
                      {tx.type==="in"||tx.type==="stake"?"+":""}{Math.abs(tx.amt).toLocaleString("ru-RU",{minimumFractionDigits:tx.cur==="ETH"?2:0})} {tx.cur}
                    </div>
                    <div style={{ fontSize:"10px", color:"var(--t3)" }}>{tx.time}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail sheet */}
      {sel && (
        <div className="ss"
          onClick={()=>setSel(null)}
          style={{ position:"absolute", inset:0, zIndex:50, display:"flex", flexDirection:"column", justifyContent:"flex-end", background:"rgba(0,0,0,0.65)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)" }}
        >
          <div onClick={e=>e.stopPropagation()} style={{ borderRadius:"var(--r-lg) var(--r-lg) 0 0", background:"var(--surface)", border:"1px solid var(--border)", padding:"20px 20px 32px" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"16px" }}>
              <div style={{ width:"36px", height:"4px", borderRadius:"2px", background:"var(--border-2)" }}/>
            </div>

            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"var(--surface-3)", border:"1px solid var(--border-2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px" }}>{sel.icon}</div>
                <div>
                  <div style={{ fontSize:"16px", fontWeight:700, color:"var(--t1)", marginBottom:"5px" }}>{sel.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <AMLRing score={sel.aml}/>
                    <span style={{ fontSize:"11px", color:"var(--t2)" }}>Neural AML Engine v4.2</span>
                  </div>
                </div>
              </div>
              <button onClick={()=>setSel(null)} style={{ width:"30px", height:"30px", borderRadius:"8px", background:"var(--surface-3)", border:"1px solid var(--border)", cursor:"pointer", color:"var(--t2)", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
            </div>

            {/* Amount */}
            <div style={{ padding:"16px", borderRadius:"var(--r)", background:"var(--surface-3)", border:"1px solid var(--border)", textAlign:"center", marginBottom:"16px" }}>
              <div style={{ fontSize:"32px", fontWeight:300, color:TYPE_COLOR[sel.type], letterSpacing:"-1.5px", fontFamily:"var(--mono)" }}>
                {sel.type==="in"||sel.type==="stake"?"+":""}{Math.abs(sel.amt).toLocaleString("ru-RU",{minimumFractionDigits:2})} {sel.cur}
              </div>
              <div style={{ fontSize:"12px", color:"var(--t3)", marginTop:"4px" }}>{sel.date} · {sel.time}</div>
            </div>

            {/* Details */}
            <div style={{ marginBottom:"12px" }}>
              <DetailRow l="TXID"    v={sel.txid}    mono/>
              <DetailRow l="Сеть"    v={sel.network}     />
              <DetailRow l="Комиссия"v={sel.fee}         />
              <DetailRow l="Контрагент" v={sel.party}    />
            </div>

            {/* AML Verdict */}
            <div style={{ padding:"12px 14px", borderRadius:"var(--r)", background:"var(--green-bg)", border:"1px solid var(--green-bdr)", marginBottom:"12px" }}>
              <div style={{ fontSize:"12px", fontWeight:700, color:"var(--green)", marginBottom:"3px" }}>Neural AML Verdict: ЛЕГАЛЬНО И БЕЗОПАСНО</div>
              <div style={{ fontSize:"10px", color:"var(--green)", opacity:0.7 }}>Нет нарушений · Оценка {sel.aml}/100 · Декрет №19 · CFA-compliant</div>
            </div>

            {/* Origin breakdown */}
            <OriginBar origin={sel.origin}/>
          </div>
        </div>
      )}
    </div>
  );
}
