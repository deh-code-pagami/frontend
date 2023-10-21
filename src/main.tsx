import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import transactionsLoader from './loaders/transaction';
import ErrorPage from './pages/error-page';
import Root from './pages/root';
import TransactionsPage from './pages/transaction';

import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GroupsPage from './pages/group';
import ProfilePage from './pages/profile';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: 'transactions',
        element: <TransactionsPage/>,
        loader: transactionsLoader
      },
      {
        path: 'groups',
        element: <GroupsPage/>,
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
    <CssBaseline>
      <RouterProvider router={router}></RouterProvider>
    </CssBaseline>
  </React.StrictMode>
)
