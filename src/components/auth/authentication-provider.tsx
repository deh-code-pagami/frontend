import React, { useContext, useEffect, useState } from "react"
import { GlobalContext, GlobalContextInterface } from "../../main";

export default function AuthenticationProvider({children}: {children: React.ReactNode}) {
  const { global, setGlobal } = useContext(GlobalContext) as GlobalContextInterface;
  const { user } = global;
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (!user && loading) {
      (async () => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me/`, {
          credentials: 'include'
        });

        setLoading(false);

        if (!response.ok) {
          setGlobal({
            ...global,
            isAuthenticated: false
          })
          return;
        }

        const data = await response.json();

        setGlobal({
          ...global,
          user: data,
          isAuthenticated: true
        })
      })()
    }
  }, [global, loading, setGlobal, user])

  if (loading) {
    return <div></div>
  }

  return (
    <>
      {children}
    </>
  )
}