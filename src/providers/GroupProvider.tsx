import { createContext, useReducer } from "react";

interface GroupState {
  group?: Group | null;
}

type SetGroupAction = { type: "setGroup"; group: Group };
type UnsetGroupAction = { type: "unsetGroup" };
type AddTransactionAction = {
  type: "addTransaction";
  transaction: Transaction | Transaction[];
};
type AddUserAction = { type: "addUser"; user: User | User[] };
type SetUsersAction = { type: "setUsers"; users: User[] };
type RemoveUserAction = { type: "removeUser"; userId: number | number[] };

type GroupAction =
  | SetGroupAction
  | UnsetGroupAction
  | AddTransactionAction
  | AddUserAction
  | RemoveUserAction
  | SetUsersAction

interface GroupContext {
  state: GroupState;
  dispatch: React.Dispatch<GroupAction>;
}

const defaultContext: GroupContext = {
  state: {
    group: undefined,
  },
  dispatch: () => {},
};

export const GroupContext = createContext(defaultContext);

function reducer(state: GroupState, action: GroupAction): GroupState {
  const { type } = action;

  switch (type) {
    case "setGroup":
      return {
        group: action.group,
      };
    case "unsetGroup":
      return {
        group: null,
      };
    case "addTransaction": {
      const { group } = state;

      if (!group) {
        throw new Error(
          "Adding transaction on undefined group is not supported"
        );
      }

      const { transaction } = action;

      return {
        group: {
          ...group,
          transactions: [
            ...(group.transactions ?? []),
            ...(Array.isArray(transaction) ? transaction : [transaction]),
          ],
        },
      };
    }
    case "addUser": {
      const { group } = state;

      if (!group) {
        throw new Error("Adding user on undefined group is not supported");
      }

      const { user } = action;

      return {
        group: {
          ...group,
          users: [
            ...(group.users || []),
            ...(Array.isArray(user) ? user : [user]),
          ],
        },
      };
    }
    case "removeUser": {
      const { group } = state;

      if (!group) {
        throw new Error("Removing user on undefined group is not supported");
      }

      const { userId } = action;

      return {
        group: {
          ...group,
          users: (group.users ?? []).filter((user) =>
            Array.isArray(userId)
              ? !userId.includes(user.id)
              : userId !== user.id
          ),
        },
      };
    }
    case 'setUsers': {
      const { group } = state;

      if (!group) {
        throw new Error("Removing user on undefined group is not supported");
      }

      return {
        group: {
          ...group,
          users: action.users
        }
      }
    }
  }

  return state;
}

export default function GroupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, defaultContext.state);

  return (
    <GroupContext.Provider value={{ state, dispatch }}>
      {children}
    </GroupContext.Provider>
  );
}
