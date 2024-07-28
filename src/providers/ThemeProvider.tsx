import { createContext, useReducer } from "react"

type ThemeMode = 'dark' | 'light'

interface ThemeState {
  mode: ThemeMode
}

type ToggleModeAction = { type: 'toggleMode' }

type SetModeAction = { type: 'setMode', mode: ThemeMode }

type ThemeAction = ToggleModeAction | SetModeAction

export interface ThemeContext {
  state: ThemeState,
  dispatch: React.Dispatch<ThemeAction>
}

function reducer(state: ThemeState, action: ThemeAction) : ThemeState {
  switch (action.type) {
    case 'toggleMode': 
      return {
        mode: state.mode === 'light' ? 'dark' : 'light'
      }
    case 'setMode':
      return {
        mode: action.mode
      }
  }

  return state;
}

const defaultContext: ThemeContext = {
  state: {
    mode: 'light'
  },
  dispatch: () => {}
}

export const ThemeContext = createContext(defaultContext);

export default function ThemeProvider({children} : {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, defaultContext.state);

  return <ThemeContext.Provider value={{state, dispatch}}>{children}</ThemeContext.Provider>
}