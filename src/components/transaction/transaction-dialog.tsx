import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import { Form } from 'react-router-dom';

// TODO get users from current group users
const groupUsers = [
  {username: 'Paolo', id: 1},
  {username: 'Piero', id: 2}
]

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TransactionDialog() {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [users, setUsers] = React.useState([] as { username: string; id: number; }[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reset = () => {
    setDescription('');
    setAmount('');
    setUsers([]);
    handleClose();
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ px: 1 }}>
        <PlaylistAddIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="transaction-dialog"
      >
        <DialogTitle id="transaction-dialog">Add new transaction</DialogTitle>
        <DialogContent>
          <Form>
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
                  value={users}
                  onChange={(_e, newValue) => { setUsers(newValue) }}
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
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={reset}>Cancel</Button>
          <Button type='submit'>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}