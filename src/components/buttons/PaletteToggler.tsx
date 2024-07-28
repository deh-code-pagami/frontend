import React from "react";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { ThemeContext } from "../../providers/ThemeProvider";


export default function PaletteToggler() {
  const {state, dispatch} = React.useContext(ThemeContext);

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      <IconButton onClick={() => dispatch({type: 'toggleMode'}) } color="inherit">
        {state.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}