import React from "react";
import { GlobalContext, GlobalContextInterface } from "../../main";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';


export default function PaletteToggler() {
  const {global, setGlobal} = React.useContext(GlobalContext) as GlobalContextInterface;

  const togglePalette = () => {
    setGlobal({
      ...global,
      palette: global.palette === 'light' ? 'dark' : 'light'
    });
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      <IconButton onClick={togglePalette} color="inherit">
        {global.palette === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}