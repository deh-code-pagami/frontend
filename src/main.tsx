import React, { createContext, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GroupsPage from './pages/group/group';
import ProfilePage from './pages/profile';
import ErrorPage from './pages/error-page';
import Root from './pages/root';
import TransactionsPage from './pages/transaction/transaction';
import TransactionDetailPage from './pages/transaction/transaction-detail';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import GroupDetailPage from './pages/group/group-detail';
import LoginPage from './pages/login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginAction } from './pages/actions';
import { groupsLoader, groupDetailLoader } from './pages/group/loaders';
import { transactionsLoader, transactionDetailLoader } from './pages/transaction/loaders';
import AuthenticationProvider from './components/auth/authentication-provider';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: loginAction
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'transactions',
        element: <TransactionsPage />,
        loader: transactionsLoader,
      },
      {
        path: 'transactions/:transactionId',
        element: <TransactionDetailPage />,
        loader: transactionDetailLoader
      },
      {
        path: 'groups',
        element: <GroupsPage />,
        loader: groupsLoader,
        children: [
          {
            path: ':groupId',
            element: <GroupDetailPage />,
            loader: groupDetailLoader,
          },
        ]
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      }
    ],
  }
]);

type GlobalOptions = {
  user?: User,
  isAuthenticated?: boolean,
  palette: 'light' | 'dark'
}

export interface GlobalContextInterface {
  global: GlobalOptions,
  setGlobal: React.Dispatch<React.SetStateAction<any>>
}

export interface GroupContextInterface {
  allGroups?: Group[],
  setAllGroups: React.Dispatch<React.SetStateAction<Group[] | undefined>>,
  group?: Group | null,
  setGroup: React.Dispatch<React.SetStateAction<Group | undefined | null>>
}

export const GlobalContext = createContext<GlobalContextInterface | null>(null);
export const GroupContext = createContext<GroupContextInterface | null>(null);

function Main() {
  const [ global, setGlobal ] = useState<GlobalOptions>({ palette: 'light' });
  const [ group, setGroup ] = useState<Group | undefined | null>();
  const [ allGroups, setAllGroups ] = useState<Group[] | undefined>();

  const theme = useMemo(() => createTheme({
    palette: {
      mode: global.palette
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
              <CssBaseline>
                <ThemeProvider theme={theme}>
                  <RouterProvider router={router}></RouterProvider>
                </ThemeProvider>
              </CssBaseline>
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
