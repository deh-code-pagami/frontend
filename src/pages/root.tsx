import { Outlet, redirect, useLoaderData } from "react-router-dom";
import MainDrawer, { MainDrawerMobile } from "../components/drawer/drawer";

export async function rootLoader() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me/index.json`);
  
  if (!response.ok) {
    return redirect('/login/');
  }
  
  const data = await response.json();
  const me = data.data;

  return { me };
}

export default function Root() {
  const { me } = useLoaderData() as { me: User };

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