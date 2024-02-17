import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function UserTable({users}: {users: User[]}) {
  console.log(users)
  
  return (
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
          {users.map((user) => (
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
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Button sx={{minWidth: 0, width: 40, height: 40, padding: 0,  borderRadius: '50%'}}>
                    <EditIcon></EditIcon>
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}