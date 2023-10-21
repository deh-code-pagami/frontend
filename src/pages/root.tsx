import { Outlet } from "react-router-dom";
import Drawer from "../components/drawer/drawer";
import { Box, Container } from "@mui/material";


export default function Root() {
  return (
    <>
      <header id="main-header">
        <Box sx={{
          boxShadow: '0 2px 8px 0px #00000030',
          backgroundColor: 'rgb(251,251,251)',
          background: 'radial-gradient(circle, rgba(251,251,251,1) 0%, rgba(240,240,240,1) 100%)'
        }}>
          <Container sx={{
            paddingY: '16px'
          }}>
            <Drawer></Drawer>
          </Container>
        </Box>
      </header>
      <main id="main-content">
        <Outlet />
      </main>
      <footer id="main-footer"></footer>
    </>
  )
}