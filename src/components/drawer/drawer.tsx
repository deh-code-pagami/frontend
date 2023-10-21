import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';
import MainNavigation from '../navigation/navigation';

export default function Drawer() {

  const [state, setState] = React.useState({ open: false })

  const toggleDrawer = (open: boolean) =>
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
    };


  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
        <SwipeableDrawer
          anchor={'left'}
          open={state.open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          >
            <MainNavigation></MainNavigation>
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}