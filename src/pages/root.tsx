import { Outlet } from "react-router-dom";
import MainDrawer, { MainDrawerMobile } from "../components/drawer/drawer";
import { Box, Container } from "@mui/material";


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