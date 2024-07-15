import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
} from "react-router-dom";
import './index.css';

import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthenticationProvider from './components/auth/AuthenticationProvider';
import { GlobalContext, GlobalOptions } from './contexts/global';
import { GroupContext } from './contexts/group';
import { router } from './data/routes';

function Main() {
  const [ global, setGlobal ] = useState<GlobalOptions>({ palette: 'light' });
  const [ group, setGroup ] = useState<Group | undefined | null>();
  const [ allGroups, setAllGroups ] = useState<Group[] | undefined>();

  const theme = useMemo(() => createTheme({
    palette: {
      mode: global.palette,
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
  }), [global]);

  return(
    <React.StrictMode>
        <GlobalContext.Provider value={{global, setGlobal}}>
        <GroupContext.Provider value={{group, setGroup, allGroups, setAllGroups}}>
          <AuthenticationProvider>
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
          </AuthenticationProvider>
        </GroupContext.Provider>
        </GlobalContext.Provider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Main></Main>
)
