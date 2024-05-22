import { Button, SwipeableDrawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from "@mui/system";
import React from "react";
import DrawerContent from "./drawer-content";

export default function MainDrawerMobile(props: { window?: () => Window }) {
  const { window } = props;

  const [state, setState] = React.useState({ open: false })

  const container = window !== undefined ? () => window().document.body : undefined;

  const toggleDrawer = (open: boolean) => (
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, open });
    }
  )

  return (
    <>
      <Box sx={{
        boxShadow: '0 2px 8px 0px #00000030',
        backgroundColor: 'rgb(251,251,251)',
        background: 'radial-gradient(circle, rgba(251,251,251,1) 0%, rgba(240,240,240,1) 100%)',
        display: { xs: 'block', xl: 'none' }
      }}>
        <Container sx={{
          paddingY: '16px'
        }}>
          <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
          <SwipeableDrawer
            anchor={'left'}
            open={state.open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            container={container}
            variant="temporary"
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', xl: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
          >
            <DrawerContent />
          </SwipeableDrawer>
        </Container>
      </Box>
    </>
  );
}