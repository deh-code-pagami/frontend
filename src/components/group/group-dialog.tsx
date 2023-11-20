import { DialogTitle, DialogContent, TextField, Autocomplete, Checkbox, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { Form } from "react-router-dom";
import Dialog from "../dialog/dialog";
import React, { FormEventHandler } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


// TODO get users from current group users
const groupUsers = [
  { username: 'Paolo', id: 1 },
  { username: 'Piero', id: 2 }
]

const me = 3;


export default function GroupDialog() {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = React.useState('');
  const [users, setUsers] = React.useState([] as number[]);
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    (async () => {
      setLoading(true);
      
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          users: users
        })
      })

      const data = await res.json();

      setLoading(false)
    })()
  }

  const reset = () => {
    setName('');
    setUsers([]);
    handleClose();
  }

  return (
    <>
    <Button variant="outlined" onClick={handleClickOpen} sx={{ px: 1 }}>
      <PlaylistAddIcon />
    </Button>
    <Dialog open={open} handleClose={handleClose} >
      <Form onSubmit={handleSubmit} >
        <DialogTitle id="transaction-dialog">Add new transaction</DialogTitle>
        <DialogContent>
          <Stack spacing={4}>
            <Box>
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => { setName(e.target.value) }} />
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
          <Button type='submit'>Add</Button>
        </DialogActions>
      </Form>
    </Dialog>
    </>
  )
}