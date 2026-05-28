import { useState } from "react";
import {
  ShieldCheck, ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  TrendingUp, X, ChevronRight, Cpu, CheckCircle2, Hash,
  Zap, Clock, Globe
} from "lucide-react";

interface Transaction {
  id: string;
  type: "receive" | "send" | "swap" | "deposit";
  description: string;
  amount: string;
  amountUSD: string;
  currency: string;
  positive: boolean;
  time: string;
  date: string;
  aiScore: number;
  txid: string;
  gasFee: string;
  network: string;
  legalNode: string;
  status: "confirmed" | "pending";
  counterparty: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "receive",
    description: "Received Bitcoin",
    amount: "+0.0842 BTC",
    amountUSD: "+$3,978.24",
    currency: "BTC",
    positive: true,
    time: "14:32",
    date: "Today",
    aiScore: 98,
    txid: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890",
    gasFee: "0.000021 BTC",
    network: "Bitcoin Mainnet",
    legalNode: "BY-NODE-047",
    status: "confirmed",
    counterparty: "bc1q...k8z2",
  },
  {
    id: "2",
    type: "swap",
    description: "B2B Bridge: RUB → CNY",
    amount: "150,000 RUB",
    amountUSD: "−$1,650",
    currency: "RUB",
    positive: false,
    time: "11:15",
    date: "Today",
    aiScore: 100,
    txid: "tx_bridge_0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    gasFee: "375 RUB",
    network: "PBT Bridge Layer",
    legalNode: "RU-PBT-012",
    status: "confirmed",
    counterparty: "CNY Merchant 8821",
  },
  {
    id: "3",
    type: "deposit",
    description: "Crypto Deposit Opened",
    amount: "+8.0% APY",
    amountUSD: "2,500 USDT",
    currency: "USDT",
    positive: true,
    time: "09:48",
    date: "Today",
    aiScore: 99,
    txid: "dep_0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f",
    gasFee: "0 USDT",
    network: "TON Blockchain",
    legalNode: "BY-DEFI-003",
    status: "confirmed",
    counterparty: "Savings Protocol v2",
  },
  {
    id: "4",
    type: "send",
    description: "Sent USDT",
    amount: "−850 USDT",
    amountUSD: "−$850",
    currency: "USDT",
    positive: false,
    time: "18:24",
    date: "Yesterday",
    aiScore: 97,
    txid: "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d",
    gasFee: "1.2 USDT",
    network: "TON Blockchain",
    legalNode: "BY-NODE-019",
    status: "confirmed",
    counterparty: "TVM...4fK9",
  },
  {
    id: "5",
    type: "receive",
    description: "Staking Reward",
    amount: "+12.45 TON",
    amountUSD: "+$76.93",
    currency: "TON",
    positive: true,
    time: "06:00",
    date: "Yesterday",
    aiScore: 100,
    txid: "ton_reward_7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c",
    gasFee: "0.01 TON",
    network: "TON Blockchain",
    legalNode: "AUTO-STAKE-01",
    status: "confirmed",
    counterparty: "Staking Pool #7",
  },
  {
    id: "6",
    type: "swap",
    description: "Swapped ETH → USDT",
    amount: "0.5 ETH",
    amountUSD: "+$1,309.23",
    currency: "ETH",
    positive: true,
    time: "13:11",
    date: "May 26",
    aiScore: 96,
    txid: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    gasFee: "0.0018 ETH",
    network: "Ethereum Mainnet",
    legalNode: "RU-NODE-088",
    status: "confirmed",
    counterparty: "DEX Router v3",
  },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 98 ? "#00ff80" : score >= 90 ? "#fbbf24" : "#ff4d4d";
  return (
    <div
      className="flex items-center gap-1 px-1.5 py-0.5 rounded-full"
      style={{ background: `${color}18`, border: `1px solid ${color}40` }}
    >
      <Cpu size={8} style={{ color }} />
      <span style={{ fontSize: "8px", color, fontWeight: 700 }}>{score}</span>
    </div>
  );
}

function TxIcon({ type }: { type: Transaction["type"] }) {
  const config = {
    receive: { Icon: ArrowDownLeft, color: "#00ff80", bg: "rgba(0,255,128,0.12)" },
    send: { Icon: ArrowUpRight, color: "#ff6b6b", bg: "rgba(255,107,107,0.12)" },
    swap: { Icon: ArrowLeftRight, color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
    deposit: { Icon: TrendingUp, color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  }[type];
  const { Icon, color, bg } = config;
  return (
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{ width: "40px", height: "40px", background: bg }}
    >
      <Icon size={16} style={{ color }} />
    </div>
  );
}

export default function HistoryScreen() {
  const [selected, setSelected] = useState<Transaction | null>(null);

  const grouped: Record<string, Transaction[]> = {};
  transactions.forEach((tx) => {
    if (!grouped[tx.date]) grouped[tx.date] = [];
    grouped[tx.date].push(tx);
  });

  return (
    <div className="px-4 pt-2 pb-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Cpu size={16} style={{ color: "#818cf8" }} />
          <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Neural AML Engine v4.2</span>
        </div>
        <h2 className="text-xl font-bold text-white">Transaction Feed</h2>

        {/* AI summary bar */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl mt-3"
          style={{
            background: "rgba(0,255,128,0.05)",
            border: "1px solid rgba(0,255,128,0.15)",
          }}
        >
          <div className="flex items-center justify-center rounded-full" style={{ width: "28px", height: "28px", background: "rgba(0,255,128,0.1)" }}>
            <ShieldCheck size={14} style={{ color: "#00ff80" }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">All Clear</span>
              <div
                className="rounded-full"
                style={{ width: "4px", height: "4px", background: "#00ff80", boxShadow: "0 0 6px rgba(0,255,128,0.8)" }}
              />
              <span style={{ fontSize: "9px" }} className="text-white/40">6/6 transactions verified</span>
            </div>
            <div style={{ fontSize: "9px" }} className="text-white/30">Avg. AI Score: 98.3 · 0 flags · Fully compliant</div>
          </div>
          <span className="text-xs font-bold" style={{ color: "#00ff80" }}>SAFE</span>
        </div>
      </div>

      {/* Transaction list */}
      <div className="flex flex-col gap-1">
        {Object.entries(grouped).map(([date, txs]) => (
          <div key={date}>
            <div className="text-xs text-white/30 font-medium mb-2 mt-2 px-1">{date}</div>
            {txs.map((tx) => (
              <button
                key={tx.id}
                onClick={() => setSelected(tx)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl mb-1.5 text-left transition-all duration-200 active:scale-[0.99]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <TxIcon type={tx.type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white truncate">{tx.description}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={9} style={{ color: "#00ff80" }} />
                      <span style={{ fontSize: "9px" }} className="text-white/30">AI Verified</span>
                    </div>
                    <ScoreBadge score={tx.aiScore} />
                    <span style={{ fontSize: "9px" }} className="text-white/20">{tx.time}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div
                    className="text-sm font-bold"
                    style={{ color: tx.positive ? "#00ff80" : "rgba(255,255,255,0.8)" }}
                  >
                    {tx.amount}
                  </div>
                  <div style={{ fontSize: "10px" }} className="text-white/30">{tx.amountUSD}</div>
                </div>
                <ChevronRight size={12} className="text-white/20 flex-shrink-0" />
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="rounded-t-3xl p-5"
            style={{
              background: "linear-gradient(180deg, #0d1e30 0%, #060f1e 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center mb-4">
              <div className="rounded-full" style={{ width: "36px", height: "3px", background: "rgba(255,255,255,0.15)" }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-base font-bold text-white">{selected.description}</div>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle2 size={11} style={{ color: "#00ff80" }} />
                  <span className="text-xs text-white/40">Neural Network Verified</span>
                  <ScoreBadge score={selected.aiScore} />
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex items-center justify-center rounded-full"
                style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.06)" }}
              >
                <X size={14} className="text-white/60" />
              </button>
            </div>

            {/* Amount */}
            <div
              className="rounded-2xl p-4 mb-4 text-center"
              style={{ background: "rgba(0,255,128,0.05)", border: "1px solid rgba(0,255,128,0.12)" }}
            >
              <div
                className="text-2xl font-bold mb-0.5"
                style={{ color: selected.positive ? "#00ff80" : "rgba(255,255,255,0.9)" }}
              >
                {selected.amount}
              </div>
              <div className="text-sm text-white/40">{selected.amountUSD}</div>
            </div>

            {/* Details grid */}
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Transaction ID", value: `${selected.txid.slice(0, 20)}...`, icon: Hash, mono: true },
                { label: "Network", value: selected.network, icon: Globe, mono: false },
                { label: "Gas / Fee", value: selected.gasFee, icon: Zap, mono: false },
                { label: "Legal Node", value: selected.legalNode, icon: ShieldCheck, mono: false },
                { label: "Time", value: `${selected.date} · ${selected.time}`, icon: Clock, mono: false },
                { label: "Counterparty", value: selected.counterparty, icon: ArrowLeftRight, mono: true },
              ].map(({ label, value, icon: Icon, mono }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={12} className="text-white/30" />
                    <span className="text-xs text-white/40">{label}</span>
                  </div>
                  <span
                    className="text-xs font-medium text-white text-right"
                    style={{ fontFamily: mono ? "monospace" : "inherit", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Neural verdict */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl mt-4"
              style={{ background: "rgba(0,255,128,0.06)", border: "1px solid rgba(0,255,128,0.2)" }}
            >
              <Cpu size={16} style={{ color: "#00ff80" }} />
              <div>
                <div className="text-xs font-bold" style={{ color: "#00ff80" }}>
                  Neural AML Verdict: LEGAL & SAFE
                </div>
                <div style={{ fontSize: "9px" }} className="text-white/40 mt-0.5">
                  Block verified · No sanctions match · Score {selected.aiScore}/100 · Decree No. 19 compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
