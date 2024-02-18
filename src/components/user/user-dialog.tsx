import { DialogTitle, DialogContent, TextField, Autocomplete, Checkbox, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import Dialog from "../dialog/dialog";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useContext, useState } from "react";
import { GroupContext, GroupContextInterface } from "../../main";

export default function UserDialog({ open, handleClose, allUsers }: { open: boolean, handleClose: () => void, allUsers: User[] }) {
  const { group, setGroup } = useContext(GroupContext) as GroupContextInterface;
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  if (!group) {
    return <></>
  }

  const handleSubmit = async () => {
    const addUsers = selectedUsers
      .filter(selectedUser => 
        !group.users.some(user => user.id === selectedUser.id)
      )
      .map(async (selectedUser) => {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user_group/`, {
            method: 'POST',
            body: JSON.stringify({
              user: selectedUser.id,
              group: group.id
            }),
          });
        
          if (!response.ok) {
            console.error(response);
            return undefined;
          }
    
          return selectedUser;
        }
      )

    let correctlyAddedUsers = await Promise.all(addUsers) as User[];
    correctlyAddedUsers = correctlyAddedUsers.filter(user => !!user);

    setGroup({
      ...group,
      users: [
        ...group.users,
        ...correctlyAddedUsers
      ]
    });

    handleClose();
  }

  return (<Dialog open={open} handleClose={handleClose}>
    <DialogTitle id="transaction-dialog">Add new transaction</DialogTitle>
    <DialogContent>
      <Stack spacing={4}>
        <Box>
          <Autocomplete
            multiple
            componentName="users"
            id="checkboxes-tags-demo"
            options={allUsers}
            disableCloseOnSelect
            getOptionLabel={(option) => option.username}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.email}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Users" placeholder="Add user" />
            )}
            onChange={(_e, users) => setSelectedUsers(users)}
          />
        </Box>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSubmit} type='submit'>Add</Button>
    </DialogActions>
  </Dialog>)
}