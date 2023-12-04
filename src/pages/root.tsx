import { Outlet, useNavigate } from "react-router-dom";
import MainDrawer, { MainDrawerMobile } from "../components/drawer/drawer";
import { useContext } from "react";
import { GlobalContext, GlobalContextInterface } from "../main";

export default function Root() {
  const { global } = useContext(GlobalContext) as GlobalContextInterface;
  const { user } = global;
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
  }

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