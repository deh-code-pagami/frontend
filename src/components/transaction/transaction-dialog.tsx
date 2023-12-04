import { DialogTitle, DialogContent, TextField, Autocomplete, Checkbox, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { Form } from "react-router-dom";
import Dialog from "../dialog/dialog";
import React from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// TODO get users from current group users
const groupUsers = [
  { username: 'Paolo', id: 1 },
  { username: 'Piero', id: 2 }
]

const me = 3;


export default function TransactionDialog({ open, handleClose }: { open: boolean, handleClose: () => void }) {
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('0');
  const [users, setUsers] = React.useState([] as number[]);
  
  const reset = () => {
    setDescription('');
    setAmount('');
    setUsers([]);
    handleClose();
  }

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
                onChange={(_e, newValue) => { setUsers(newValue.map(el => el.id)) }}
                id="checkboxes-tags-demo"
                options={groupUsers}
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

        <input type='hidden' name='userCreditor' value={parseFloat(amount) < 0 ? JSON.stringify(users) : me} />
        <input type='hidden' name='userDebtor' value={parseFloat(amount) > 0 ? JSON.stringify(users) : me} />
      </Form>
    </Dialog>
    </>
  )
}