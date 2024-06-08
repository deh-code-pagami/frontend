import { Outlet, useNavigate } from "react-router-dom";
import MainDrawer from "../components/drawer/drawer";
import MainDrawerMobile from "../components/drawer/drawer-mobile";
import { useContext, useEffect } from "react";
import { GlobalContext, GlobalContextInterface } from "../contexts/global";
import { Box, Container } from "@mui/material";

export default function Root() {
  const { global } = useContext(GlobalContext) as GlobalContextInterface;
  const { isAuthenticated } = global;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

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
        <Box px={4} py={8} width={'100%'}>
          <Outlet />
        </Box>
      </main>
      <footer id="main-footer"></footer>
    </>
  )
}