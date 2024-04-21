import { DialogTitle, DialogContent, TextField, Autocomplete, Checkbox, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { Form } from "react-router-dom";
import Dialog from "../dialog/dialog";
import React, { useCallback, useContext } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { GlobalContext, GlobalContextInterface, GroupContext, GroupContextInterface } from "../../main";


export default function TransactionDialog({ open, handleClose }: { open: boolean, handleClose: () => void }) {
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('0');
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  const { global } = useContext(GlobalContext) as GlobalContextInterface;
  const { group } = useContext(GroupContext) as GroupContextInterface;
  
  const reset = useCallback(() => {
    setDescription('');
    setAmount('');
    setSelectedUsers([]);
    handleClose();
  }, [handleClose]);

  return (
    <>
    <Dialog open={open} handleClose={handleClose} >
      <Form>
        <DialogTitle id="transaction-dialog">Add new transaction</DialogTitle>
        <DialogContent>

          <Stack spacing={4}>
            <Box>
              <TextField
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }} />
            </Box>
            <Box>
              <TextField
                label="Amount"
                name="amount"
                type='number'
                value={amount}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  if (isNaN(v)) return;
                  setAmount(v.toString())
                }}
              />
            </Box>
            <Box>
              <Autocomplete
                multiple
                onChange={(_e, newValue) => { setSelectedUsers(newValue) }}
                value={selectedUsers}
                options={group?.users || []}
                id="checkboxes-tags-demo"
                isOptionEqualToValue={(u1, u2) => u1.id === u2.id}
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
                    {option.username}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label="Users" placeholder="Add user" />
                )}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={reset}>Cancel</Button>
          <Button onClick={handleClose} type='submit'>Add</Button>
        </DialogActions>

        <input type='hidden' name='userCreditor' value={parseFloat(amount) < 0 ? JSON.stringify(selectedUsers.map(user => user.id)) : global.user?.id } />
        <input type='hidden' name='userDebtor' value={parseFloat(amount) > 0 ? JSON.stringify(selectedUsers.map(user => user.id)) : global.user?.id } />
      </Form>
    </Dialog>
    </>
  )
}