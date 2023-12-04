import { DialogTitle, DialogContent, TextField, Autocomplete, Checkbox, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { Form } from "react-router-dom";
import Dialog from "../dialog/dialog";
import React, { FormEventHandler, useContext } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { GlobalContext, GlobalContextInterface } from "../../main";


// TODO get users from current group users
const groupUsers = [
  { username: 'Paolo', id: 1 },
  { username: 'Piero', id: 2 }
]


export default function GroupDialog({ children, open, handleClose }: { children: React.ReactNode, open: boolean, handleClose: () => void}) {
  const [loading, setLoading] = React.useState(false);
  const { global, setGlobal } = useContext(GlobalContext) as GlobalContextInterface;

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
      setGlobal({
        ...global,
        currentGroup: data.data.id
      })

      handleClose();
    })()
  }

  const reset = () => {
    setName('');
    setUsers([]);
    handleClose();
  }

  return (
    <>
    {children}
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