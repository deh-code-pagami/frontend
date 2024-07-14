import { DialogTitle, DialogContent, TextField, Autocomplete, Checkbox, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import Dialog from "../dialog/dialog";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from "react";

export default function UserSelectionDialog({
  open,
  handleClose,
  handleSubmit,
  allUsers }:
  {
    open: boolean,
    handleClose: () => void,
    handleSubmit: (selectedUsers: User[], handleClose: () => void) => void,
    allUsers: User[]
  }) {

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <Dialog 
      open={open} 
      handleClose={() => { handleClose(); }}
    >
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
              isOptionEqualToValue={(a, b) => a?.id === b?.id}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="Users" placeholder="Add user" />
              )}
              onChange={(_e, users) => setSelectedUsers(users)}
              value={selectedUsers}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={async () => { await handleSubmit(selectedUsers, handleClose); setSelectedUsers([]); } } type='submit'>Confirm</Button>
      </DialogActions>
    </Dialog>)
}