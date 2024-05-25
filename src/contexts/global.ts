import { createContext } from "react";

export type GlobalOptions = {
  user?: User,
  isAuthenticated?: boolean,
  palette: 'light' | 'dark'
}

export interface GlobalContextInterface {
  global: GlobalOptions,
  setGlobal: React.Dispatch<React.SetStateAction<any>>
}

export const GlobalContext = createContext<GlobalContextInterface | null>(null);