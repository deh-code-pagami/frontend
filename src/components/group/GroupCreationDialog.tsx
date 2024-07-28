import { DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { Form, useNavigate } from "react-router-dom";
import Dialog from "../dialog/Dialog";
import React, { useCallback, useContext } from "react";
import { GroupContext } from "../../providers/GroupProvider";
import routes from "../../data/routes";


export default function GroupCreationDialog({ children, open, handleClose }: { children: React.ReactNode, open: boolean, handleClose: () => void}) {
  const [loading, setLoading] = React.useState(false);
  const { dispatch } = useContext(GroupContext);
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

    const group = (await res.json()).data as Group;

    setLoading(false);

    dispatch({type: 'setGroup', group});
    navigate(`${routes.groups}`);

    reset();
  }, [dispatch, loading, name, navigate, reset])

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