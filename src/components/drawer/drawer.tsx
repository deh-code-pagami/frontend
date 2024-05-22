import { Drawer } from '@mui/material';
import DrawerContent from './drawer-content';

export default function MainDrawer() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', xl: 'block' },
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: 250, 
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