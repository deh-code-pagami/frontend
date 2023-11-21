import React from 'react';
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
import Root, { rootLoader } from './pages/root';
import TransactionsPage from './pages/transaction/transaction';
import TransactionDetailPage from './pages/transaction/transaction-detail';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import GroupDetailPage from './pages/group/group-detail';
import LoginPage from './pages/login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { loginAction } from './pages/actions';
import { groupsLoader, groupDetailLoader } from './pages/group/loaders';
import { transactionsLoader, transactionDetailLoader } from './pages/transaction/loaders';


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
    loader: rootLoader,
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
            loader: groupDetailLoader
          }
        ]
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      }
    ],
  }
]);

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 38px'
        }
      },
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router}></RouterProvider>
          </ThemeProvider>
        </CssBaseline>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
)
