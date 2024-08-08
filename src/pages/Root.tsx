import { Outlet, useNavigate } from "react-router-dom";
import MainDrawer from "../components/drawer/Drawer";
import MainDrawerMobile from "../components/drawer/DrawerMobile";
import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { AuthenticationContext } from "../providers/AuthenticationProvider";

export default function Root() {
  const { state } = useContext(AuthenticationContext);
  const { isAuthenticated } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div></div>;
  }

  return (
    <>
      <header id="main-header">
        <MainDrawerMobile />
      </header>
      <main id="main-content">
        <MainDrawer />
        <Box px={4} py={8} width={"100%"}>
          <Outlet />
        </Box>
      </main>
      <footer id="main-footer"></footer>
    </>
  );
}
