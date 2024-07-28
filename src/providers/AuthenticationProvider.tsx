import { createContext, useEffect, useReducer, useState } from "react";

interface AuthenticationState {
  user?: User,
  isAuthenticated?: boolean
}

type LoginAction = { type: 'login', user: User }
type LogoutAction = { type: 'logout' }

type AuthenticationAction = LogoutAction | LoginAction

interface AuthenticationContext {
  state: AuthenticationState,
  dispatch: React.Dispatch<AuthenticationAction>
}

const defaultContext: AuthenticationContext = {
  state: {
    user: undefined,
    isAuthenticated: false
  },
  dispatch: () => { }
}

export const AuthenticationContext = createContext(defaultContext);

function reducer (state: AuthenticationState, action: AuthenticationAction): AuthenticationState {
  const { type } = action;

  switch(type) {
    case 'login':
      return {
        user: action.user,
        isAuthenticated: true
      }
    case 'logout':
      return {
        user: undefined,
        isAuthenticated: false
      }
  }

  return state;
}

export default function AuthenticationProvider({children} : {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, defaultContext.state);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (!state.user && loading) {
      (async () => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me/`, {
          credentials: 'include'
        });

        setLoading(false);

        if (!response.ok) {
          dispatch({ type: 'logout' });
          return;
        }

        const data = await response.json() as User;

        dispatch({ type: 'login', user: data })
      })()
    }
  }, [loading, state.user])
  
  return <AuthenticationContext.Provider value={{state, dispatch}}>{loading ? <></> : children}</AuthenticationContext.Provider>
}