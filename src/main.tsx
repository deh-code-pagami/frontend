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
import GroupsPage, { groupsLoader } from './pages/group/group';
import ProfilePage from './pages/profile';
import ErrorPage from './pages/error-page';
import Root from './pages/root';
import TransactionsPage, { transactionsLoader } from './pages/transaction/transaction';
import TransactionDetailPage, { transactionDetailLoader } from './pages/transaction/transaction-detail';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: 'transactions',
        element: <TransactionsPage/>,
        loader: transactionsLoader,
      },
      {
        path: 'transactions/:transactionId',
        element: <TransactionDetailPage/>,
        loader: transactionDetailLoader
      },
      {
        path: 'groups',
        element: <GroupsPage/>,
        loader: groupsLoader
      },
      {
        path: 'profile',
        element: <ProfilePage/>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CssBaseline>
      <RouterProvider router={router}></RouterProvider>
    </CssBaseline>
    </LocalizationProvider>
  </React.StrictMode>
)
