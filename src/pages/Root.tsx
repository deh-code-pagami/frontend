import { Outlet, useNavigate } from "react-router-dom";
import MainDrawer from "../components/drawer/Drawer";
import MainDrawerMobile from "../components/drawer/DrawerMobile";
import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { AuthenticationContext } from "../providers/AuthenticationProvider";
import Spinner from "../components/spinner/Spinner";

export default function Root() {
  const { state } = useContext(AuthenticationContext);
  const { user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user) {
    return <Spinner></Spinner>;
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
