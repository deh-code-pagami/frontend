import { Outlet, useNavigate } from "react-router-dom";
import MainDrawer, { MainDrawerMobile } from "../components/drawer/drawer";
import { useContext, useEffect } from "react";
import { GlobalContext, GlobalContextInterface } from "../main";

export default function Root() {
  const { global } = useContext(GlobalContext) as GlobalContextInterface;
  const { isAuthenticated } = global;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <div></div>
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