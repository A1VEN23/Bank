import { useState } from "react";

type Tx = {
  id:string; type:"in"|"out"|"swap";
  name:string; cat:string; icon:string; bg:string; iconC:string;
  amt:number; cur:string; time:string; date:string;
  score:number; txid:string; fee:string; network:string; party:string;
};

const ALL: Tx[] = [
  { id:"1",  type:"in",   name:"Яндекс.Маркет — Возврат", cat:"Возврат",    icon:"📦", bg:"#EFF6FF", iconC:"#2563EB", amt:+1240,    cur:"BYN", time:"14:32", date:"Сегодня",     score:99,  txid:"byn_ref_0x7a8b9c0d1e2f", fee:"0 BYN",     network:"Internal",          party:"Яндекс.Маркет"    },
  { id:"2",  type:"out",  name:"Яндекс Такси",              cat:"Транспорт",  icon:"🚕", bg:"#FFF7ED", iconC:"#EA580C", amt:-178.50,  cur:"BYN", time:"11:15", date:"Сегодня",     score:97,  txid:"ton_0x2c3d4e5f6a7b8c",   fee:"0.12 BYN",  network:"TON Blockchain",    party:"Taxi Aggregator"  },
  { id:"3",  type:"out",  name:"Пятёрочка",                 cat:"Продукты",   icon:"🛒", bg:"#F0FDF4", iconC:"#16A34A", amt:-89.40,   cur:"BYN", time:"09:48", date:"Сегодня",     score:98,  txid:"byn_pos_0xabcdef1234",   fee:"0 BYN",     network:"Fiat Rail",         party:"Пятёрочка #0218"  },
  { id:"4",  type:"swap", name:"B2B Bridge: RUB→CNY",       cat:"Перевод",    icon:"⇄",  bg:"#EDE9FE", iconC:"#7C3AED", amt:-150000,  cur:"RUB", time:"16:20", date:"Вчера",       score:100, txid:"bridge_0x9d8c7b6a5f4e", fee:"375 RUB",   network:"PBT Bridge",        party:"CNY Merchant"     },
  { id:"5",  type:"in",   name:"Стейкинг — награда",        cat:"Доходность", icon:"✦",  bg:"#F0FDF4", iconC:"#16A34A", amt:+12.45,   cur:"TON", time:"06:00", date:"Вчера",       score:100, txid:"ton_stake_7f8a9b0c1d",   fee:"0.01 TON",  network:"TON Blockchain",    party:"Staking Pool #7"  },
  { id:"6",  type:"out",  name:"Netflix",                   cat:"Подписки",   icon:"🎬", bg:"#FFF1F2", iconC:"#E11D48", amt:-15.99,   cur:"USD", time:"13:00", date:"Вчера",       score:96,  txid:"usdt_0x1a2b3c4d5e6f",   fee:"0.5 USDT",  network:"TON Blockchain",    party:"Netflix Inc."     },
  { id:"7",  type:"in",   name:"Перевод от Ивана К.",        cat:"Входящий",   icon:"↙",  bg:"#F0FDF4", iconC:"#16A34A", amt:+5000,    cur:"BYN", time:"09:14", date:"24 мая",      score:99,  txid:"byn_p2p_0x3d4e5f6a7b",  fee:"0 BYN",     network:"Fiat Rail",         party:"Иван К."          },
  { id:"8",  type:"out",  name:"McDonald's",                cat:"Рестораны",  icon:"🍔", bg:"#FFF7ED", iconC:"#F59E0B", amt:-42.80,   cur:"BYN", time:"20:33", date:"24 мая",      score:97,  txid:"byn_pos_0xfed987654",   fee:"0 BYN",     network:"Fiat Rail",         party:"McDonald's #0041" },
  { id:"9",  type:"swap", name:"ETH → USDT",                cat:"Обмен",      icon:"⇄",  bg:"#EDE9FE", iconC:"#7C3AED", amt:-0.5,     cur:"ETH", time:"18:12", date:"24 мая",      score:96,  txid:"eth_0x5f6a7b8c9d0e",   fee:"0.0018 ETH",network:"Ethereum Mainnet",  party:"DEX Router v3"    },
];

function groupBy<T>(arr: T[], key: (x:T)=>string): Record<string,T[]> {
  return arr.reduce((acc,x)=>{ const k=key(x); acc[k]??=[]; acc[k].push(x); return acc; },{} as Record<string,T[]>);
}

const GROUPED = groupBy(ALL, t=>t.date);

function AmtColor(t: Tx) { return t.type==="in" ? "var(--green)" : "var(--t1)"; }

function Score({ s }: { s:number }) {
  const ok = s>=95;
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"3px", padding:"2px 7px", borderRadius:"5px", background:ok?"var(--green-bg)":"var(--red-bg)" }}>
      <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:ok?"var(--green)":"var(--red)" }}/>
      <span style={{ fontSize:"9px", fontWeight:700, color:ok?"var(--green)":"var(--red)" }}>{s}</span>
    </div>
  );
}

export default function HistoryScreen() {
  const [sel, setSel] = useState<Tx|null>(null);
  const [search, setSearch] = useState("");

  const filtered = search ? ALL.filter(t=>t.name.toLowerCase().includes(search.toLowerCase())||t.cat.toLowerCase().includes(search.toLowerCase())) : null;
  const data = filtered ? groupBy(filtered,"date") : GROUPED;

  const totalOut = ALL.filter(t=>t.type==="out"&&t.cur==="BYN").reduce((s,t)=>s+Math.abs(t.amt),0);

  return (
    <div style={{ padding:"20px 16px 28px", position:"relative" }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:"20px" }}>
        <div style={{ fontSize:"13px", color:"var(--t2)", fontWeight:500, marginBottom:"6px" }}>Neural AML Engine v4.2</div>
        <div style={{ fontSize:"28px", fontWeight:700, color:"var(--t1)", letterSpacing:"-0.8px", marginBottom:"16px" }}>История</div>

        {/* Monthly summary */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"16px" }}>
          <div style={{ padding:"16px", borderRadius:"16px", background:"var(--surface)", border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)" }}>
            <div style={{ fontSize:"11px", color:"var(--t2)", fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:"6px" }}>Расходы за май</div>
            <div style={{ fontSize:"22px", fontWeight:700, color:"var(--t1)", letterSpacing:"-0.5px", fontVariantNumeric:"tabular-nums" }}>{totalOut.toLocaleString("ru-RU",{maximumFractionDigits:0})} <span style={{ fontSize:"14px", fontWeight:400, color:"var(--t2)" }}>BYN</span></div>
          </div>
          <div style={{ padding:"16px", borderRadius:"16px", background:"#DCFCE7", border:"1px solid rgba(0,185,107,0.2)" }}>
            <div style={{ fontSize:"11px", color:"var(--green)", fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:"6px" }}>AML статус</div>
            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <div>
                <div style={{ fontSize:"14px", fontWeight:700, color:"var(--green)" }}>9/9 чистых</div>
                <div style={{ fontSize:"10px", color:"var(--green)", opacity:0.7 }}>Ср. оценка 98.1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", borderRadius:"14px", background:"var(--surface)", border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Поиск операций..." style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:"15px", color:"var(--t1)" }}/>
          {search && <button onClick={()=>setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--t3)", fontSize:"16px" }}>×</button>}
        </div>
      </div>

      {/* Transactions */}
      <div className="fade-up s2">
        {Object.entries(data).map(([date,txs])=>(
          <div key={date} style={{ marginBottom:"20px" }}>
            <div style={{ fontSize:"13px", fontWeight:700, color:"var(--t2)", marginBottom:"10px" }}>{date}</div>
            <div style={{ borderRadius:"20px", background:"var(--surface)", border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)", overflow:"hidden" }}>
              {txs.map((tx,i)=>(
                <button key={tx.id} onClick={()=>setSel(tx)}
                  style={{
                    width:"100%", display:"flex", alignItems:"center", gap:"12px", padding:"13px 16px",
                    borderBottom:i<txs.length-1?"1px solid var(--sep)":"none",
                    background:"transparent", border:"none", cursor:"pointer", textAlign:"left",
                    transition:"background 0.1s",
                  }}
                  onMouseEnter={e=>(e.currentTarget.style.background="var(--surface-2)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                >
                  <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:tx.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"20px" }}>
                    {tx.icon}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"15px", fontWeight:600, color:"var(--t1)", marginBottom:"3px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{tx.name}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                      <span style={{ fontSize:"12px", color:"var(--t2)" }}>{tx.cat}</span>
                      <span style={{ color:"var(--sep)", fontSize:"10px" }}>·</span>
                      <Score s={tx.score}/>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:"15px", fontWeight:700, color:AmtColor(tx), fontVariantNumeric:"tabular-nums" }}>
                      {tx.type==="in"?"+":""}{Math.abs(tx.amt).toLocaleString("ru-RU",{minimumFractionDigits:tx.cur==="ETH"?2:0,maximumFractionDigits:tx.cur==="ETH"?2:0})} {tx.cur}
                    </div>
                    <div style={{ fontSize:"11px", color:"var(--t3)", marginTop:"2px" }}>{tx.time}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail sheet */}
      {sel && (
        <div className="slide-sheet"
          onClick={()=>setSel(null)}
          style={{ position:"absolute", inset:0, zIndex:50, display:"flex", flexDirection:"column", justifyContent:"flex-end", background:"rgba(15,15,16,0.45)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" }}
        >
          <div onClick={e=>e.stopPropagation()}
            style={{ borderRadius:"28px 28px 52px 52px", background:"var(--surface)", padding:"24px 24px 36px", boxShadow:"0 -4px 32px rgba(15,15,16,0.1)" }}
          >
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}>
              <div style={{ width:"40px", height:"5px", borderRadius:"3px", background:"var(--sep)" }}/>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ width:"50px", height:"50px", borderRadius:"16px", background:sel.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>
                  {sel.icon}
                </div>
                <div>
                  <div style={{ fontSize:"17px", fontWeight:700, color:"var(--t1)", marginBottom:"4px" }}>{sel.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                    <Score s={sel.score}/>
                    <span style={{ fontSize:"12px", color:"var(--t2)" }}>AML проверен</span>
                  </div>
                </div>
              </div>
              <button onClick={()=>setSel(null)} style={{ width:"32px", height:"32px", borderRadius:"10px", background:"var(--surface-2)", border:"1px solid var(--sep)", cursor:"pointer", fontSize:"18px", color:"var(--t2)", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
            </div>

            {/* Amount */}
            <div style={{ padding:"18px 20px", borderRadius:"18px", background: sel.type==="in"?"#DCFCE7":"var(--surface-2)", border:`1px solid ${sel.type==="in"?"rgba(0,185,107,0.2)":"var(--sep)"}`, textAlign:"center", marginBottom:"20px" }}>
              <div style={{ fontSize:"36px", fontWeight:300, color:sel.type==="in"?"var(--green)":"var(--t1)", letterSpacing:"-1.5px", fontVariantNumeric:"tabular-nums" }}>
                {sel.type==="in"?"+":""}{Math.abs(sel.amt).toLocaleString("ru-RU",{minimumFractionDigits:2})} {sel.cur}
              </div>
              <div style={{ fontSize:"13px", color:"var(--t2)", marginTop:"4px" }}>{sel.date} · {sel.time}</div>
            </div>

            {/* Details */}
            {[
              { l:"ID транзакции", v:sel.txid,   mono:true  },
              { l:"Сеть",          v:sel.network, mono:false },
              { l:"Комиссия",      v:sel.fee,     mono:false },
              { l:"Контрагент",    v:sel.party,   mono:false },
            ].map(r=>(
              <div key={r.l} style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid var(--sep)" }}>
                <span style={{ fontSize:"14px", color:"var(--t2)" }}>{r.l}</span>
                <span style={{ fontSize:"14px", fontWeight:500, color:"var(--t1)", fontFamily:r.mono?"monospace":"inherit", maxWidth:"180px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.v}</span>
              </div>
            ))}

            {/* Verdict */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", borderRadius:"14px", background:"#DCFCE7", border:"1px solid rgba(0,185,107,0.2)", marginTop:"16px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <div>
                <div style={{ fontSize:"13px", fontWeight:700, color:"var(--green)" }}>Нейросеть: ЛЕГАЛЬНО И БЕЗОПАСНО</div>
                <div style={{ fontSize:"10px", color:"var(--green)", opacity:0.7 }}>Нет нарушений · Оценка {sel.score}/100 · Декрет №19</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
