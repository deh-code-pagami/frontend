import './index.css';
import React, { useContext, useMemo, useState } from 'react';
import {
  RouterProvider,
} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './providers/ThemeProvider';
import { GroupContext } from './contexts/group';
import { router } from './data/routes';

function App() {
  const { state: themeState } = useContext(ThemeContext);
  const [ group, setGroup ] = useState<Group | undefined | null>();
  const [ allGroups, setAllGroups ] = useState<Group[] | undefined>();

  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeState.mode,
      text: {
        secondary: '#444'
      },
      //@ts-expect-error This is supposed to extend MUI color palette
      border: {
        main: '#aaa',
        light: '#ddd',
        dark: '#333',
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '12px 38px'
          }
        },
      },
    },
  }), [themeState.mode]);

  return(
    <React.StrictMode>
        <GroupContext.Provider value={{group, setGroup, allGroups, setAllGroups}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CssBaseline/>
              <style>{`
                body {
                  background-color: ${theme.palette.background.default}
                }
              `}</style>
                <ThemeProvider theme={theme}>
                  <RouterProvider router={router}></RouterProvider>
                </ThemeProvider>
            </LocalizationProvider>
        </GroupContext.Provider>
    </React.StrictMode>
  )
}

export default App
