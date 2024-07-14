import { Box } from "@mui/system";
import UserTable from "../user/UserTable";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { GroupContext, GroupContextInterface } from "../../contexts/group";
import UserSelectionDialog from "../user/UserSelectionDialog";

export default function UsersTabPanel() {
  const { group, setGroup } = useContext(GroupContext) as GroupContextInterface;
  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [addUserDialog, setAddUserDialog] = React.useState(false);

  const handleClickOpen = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/`);

    if (!response.ok) {
      console.error(response);
      return;
    }

    const json = await response.json() as User[];

    // remove users that are already inside the group
    const validUsers = json
      .filter(user1 =>
        !group?.users.some(user2 =>
          user1.id === user2.id))

    setAllUsers(validUsers);

    setAddUserDialog(true);
  }, [group?.users]);

  const addUsers = useCallback(async (selectedUsers: User[], handleClose: () => void) => {
    if (!group) {
      return;
    }

    const addUserPromise = async (selectedUser: User) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/group-users/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            user: selectedUser.id,
            group: group.id
          }
        }),
      });

      if (!response.ok) {
        console.error(response);
        return undefined;
      }

      return selectedUser;
    };

    const addUserPromises = selectedUsers.map(selectedUser => addUserPromise(selectedUser));

    const correctlyAddedUsers = (await Promise.all(addUserPromises))
      .filter(user => !!user) as User[];
    
    setGroup({
      ...group,
      users: [
        ...group.users,
        ...correctlyAddedUsers
      ]
    });

    handleClose();
  }, [group, setGroup]);

  if (!group) {
    return <></>
  }

  return <>
    <Box sx={{ marginBottom: 4 }}>
      <Button variant="outlined" sx={{ px: 1 }} onClick={handleClickOpen}>
        <PersonAddIcon></PersonAddIcon>
      </Button>
    </Box>
    <UserTable ></UserTable>
    <UserSelectionDialog
      handleClose={() => { setAddUserDialog(false); }}
      open={addUserDialog}
      allUsers={allUsers}
      handleSubmit={addUsers}
    />
  </>
}