import { Outlet, redirect } from "react-router-dom";
import MainDrawer, { MainDrawerMobile } from "../components/drawer/drawer";
import { store } from "../app/store";
import { setUser } from "../components/user/user-slice";

export async function rootLoader() {
  let state = store.getState();
  let me = state.userState.user;

  if (me) {
    return { me };
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me/`);
  
  if (!response.ok) {
    return redirect('/login/');
  }
  
  const data = await response.json();
  me = data.data;

  store.dispatch(setUser(me));
  return { me };
}

export default function Root() {

  return (
    <>
      <header id="main-header">
        <MainDrawerMobile/>
      </header>
      <main id="main-content">
        <MainDrawer/>
        <Outlet />
      </main>
      <footer id="main-footer"></footer>
    </>
  )
}