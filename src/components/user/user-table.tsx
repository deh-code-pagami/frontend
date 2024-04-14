import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState } from "react";
import ConfirmationDialog from "../dialog/confirmation-dialog";
import { GroupContext, GroupContextInterface } from "../../main";

export default function UserTable() {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [deleteUserDialog, setDeleteUserDialog] = useState<boolean>(false);
  const { group, setGroup } = useContext(GroupContext) as GroupContextInterface;

  const deleteUser = async () => {
    if (!selectedUser) {
      return;
    }

    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/group-users/`);
    const json = await response.json();

    for (const groupUser of json.data) {
      response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/group-users/${groupUser.id}`, {
        method: 'DELETE'
      });
    }

    if (!group) {
      return;
    }

    setGroup({
      ...group,
      users: group.users.filter(user =>
        user.id != selectedUser.id
      )
    })

    setDeleteUserDialog(false);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell >Email</TableCell>
              <TableCell >Role</TableCell>
              <TableCell >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group?.users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.role}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button sx={{ minWidth: 0, width: 40, height: 40, padding: 0, borderRadius: '50%' }}>
                      <EditIcon></EditIcon>
                    </Button>
                    <Button 
                      sx={{ minWidth: 0, width: 40, height: 40, padding: 0, borderRadius: '50%' }} 
                      onClick={ () => {
                        setSelectedUser(user);
                        setDeleteUserDialog(true);
                      }}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        title="Are you sure you want to remove this user from the group?"
        open={ deleteUserDialog }
        handleClose={ () => setDeleteUserDialog(false) }
        onConfirm={deleteUser}
      />
    </>
  )
}