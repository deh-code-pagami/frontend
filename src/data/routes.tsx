import { createBrowserRouter } from "react-router-dom";
import { loginAction } from "../pages/actions";
import ErrorPage from "../pages/error-page";
import GroupsPage from "../pages/group/GroupPage";
import GroupDetailPage from "../pages/group/GroupDetailPage";
import { groupsLoader, groupDetailLoader } from "../pages/group/loaders";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import Root from "../pages/Root";
import {
  transactionsLoader,
  transactionDetailLoader,
} from "../pages/transaction/loaders";
import TransactionsPage from "../pages/transaction/TransactionPage";
import TransactionDetailPage from "../pages/transaction/TransactionDetailPage";

export default {
  root: "/",
  transactions: "/transactions/",
  groups: "/groups/",
  profile: "/profile/",
};

export const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "transactions",
        element: <TransactionsPage />,
        loader: transactionsLoader,
      },
      {
        path: "transactions/:transactionId",
        element: <TransactionDetailPage />,
        loader: transactionDetailLoader,
      },
      {
        path: "groups",
        element: <GroupsPage />,
        loader: groupsLoader,
        children: [
          {
            path: ":groupId",
            element: <GroupDetailPage />,
            loader: groupDetailLoader,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
