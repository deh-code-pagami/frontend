import { Box } from "@mui/system";
import UserTable from "../user/user-table";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button } from "@mui/material";
import UserDialog from "../user/user-dialog";
import React, { useContext } from "react";
import qs from 'qs';
import { prepareRole } from "../../utils/strapi";
import { GroupContext, GroupContextInterface } from "../../main";

export default function UsersTabPanel() {
  const { group } = useContext(GroupContext) as GroupContextInterface;
  const [ allUsers, setAllUsers ] = React.useState<User[]>([]);
  const [open, setOpen] = React.useState(false);

  if (!group) {
    return <></>
  }

  const { users = [] } = group;

  const handleClickOpen = async () => {
    const queryParams = qs.stringify({
      populate: ['role']
    })

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/?${queryParams}`);
    
    if (!response.ok) {
      console.error(response);
      return;
    }
    
    const json = await response.json() as User[];

    setAllUsers(json.map(user => ({
      ...user,
      role: prepareRole(user.role)
    })));

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <Box sx={{marginBottom: 4}}>
      <Button variant="outlined"  sx={{ px: 1 }} onClick={handleClickOpen}>
        <PersonAddIcon></PersonAddIcon>
      </Button>
      <UserDialog handleClose={handleClose} open={open} allUsers={allUsers}></UserDialog>
    </Box>
    <UserTable users={users}></UserTable>
  </>
}