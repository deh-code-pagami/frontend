import { DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { Form, useNavigate } from "react-router-dom";
import Dialog from "../dialog/dialog";
import React, { useCallback, useContext } from "react";
import { GroupContext, GroupContextInterface } from "../../contexts/group";
import routes from "../../data/routes";


export default function GroupDialog({ children, open, handleClose }: { children: React.ReactNode, open: boolean, handleClose: () => void}) {
  const [loading, setLoading] = React.useState(false);
  const { setGroup, setAllGroups, allGroups } = useContext(GroupContext) as GroupContextInterface;
  const navigate = useNavigate();

  const [name, setName] = React.useState('');

  const reset = useCallback(() => {
    setName('');
    handleClose();
  }, [handleClose])
  
  const handleSubmit = useCallback(async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    
    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          name: name,
        }
      })
    })

    if (!res.ok) {
      return;
    }

    const json = (await res.json()).data as Group;

    setLoading(false);

    setAllGroups([
      ...(allGroups || []),
      json
    ])

    setGroup(json);
    navigate(routes.groups + (json.id || ''));

    reset();
  }, [allGroups, loading, name, navigate, reset, setAllGroups, setGroup])

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