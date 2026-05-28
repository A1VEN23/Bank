import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type AccountMode = "personal" | "business";

interface Ctx {
  mode: AccountMode;
  setMode: (m: AccountMode) => void;
}

const AccountContext = createContext<Ctx>({ mode:"personal", setMode:()=>{} });

export function AccountProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AccountMode>("personal");
  return <AccountContext.Provider value={{ mode, setMode }}>{children}</AccountContext.Provider>;
}

export const useAccount = () => useContext(AccountContext);
