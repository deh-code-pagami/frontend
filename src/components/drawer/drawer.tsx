import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';
import MainNavigation from '../navigation/navigation';
import { Container, Drawer } from '@mui/material';

const drawerWidth = 250;


function DrawerContent() {
  return (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
    >
      <MainNavigation></MainNavigation>
    </Box>
  )
}

export default function MainDrawer() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', xl: 'block' },
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: drawerWidth, 
          position: 'static', 
          overflow: 'hidden',
          boxShadow: '0px 2px 2px 2px #e6e6e6'
        },
      }}
      open
    >
      <DrawerContent />
    </Drawer>
  )
}

export function MainDrawerMobile(props: { window?: () => Window }) {
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
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <DrawerContent />
          </SwipeableDrawer>
        </Container>
      </Box>
    </>
  );
}