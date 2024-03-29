import { Box } from "@mui/system";
import UserTable from "../user/user-table";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { GroupContext, GroupContextInterface } from "../../main";
import UserSelectionDialog from "../user/user-selection-dialog";

export default function UsersTabPanel() {
  const { group, setGroup } = useContext(GroupContext) as GroupContextInterface;
  const [ allUsers, setAllUsers ] = React.useState<User[]>([]);
  const [ addUserDialog, setAddUserDialog ] = React.useState(false);

  if (!group) {
    return <></>
  }

  const handleClickOpen = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/`);
    
    if (!response.ok) {
      console.error(response);
      return;
    }
    
    const json = await response.json() as User[];

    // remove users that are already inside the group
    const validUsers = json
      .filter(user1 => 
        !group.users.some(user2 => 
          user1.id === user2.id))
    
    setAllUsers(validUsers);

    setAddUserDialog(true);
  };

  const addUsers = async (selectedUsers: User[], handleClose: () => void) => {
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

    const addUserPromises = selectedUsers.map( selectedUser => addUserPromise(selectedUser) );

    const correctlyAddedUsers = (await Promise.all(addUserPromises))
      .filter(addedUser => !!addedUser) as User[];

    setGroup({
      ...group,
      users: [
        ...group.users,
        ...correctlyAddedUsers
      ]
    });

    handleClose();
  }

  

  return <>
    <Box sx={{marginBottom: 4}}>
      <Button variant="outlined"  sx={{ px: 1 }} onClick={handleClickOpen}>
        <PersonAddIcon></PersonAddIcon>
      </Button>
    </Box>
    <UserTable ></UserTable>
    <UserSelectionDialog 
      handleClose={ () => { setAddUserDialog(false); } } 
      open={addUserDialog} 
      allUsers={allUsers} 
      handleSubmit={ addUsers }
    />
  </>
}