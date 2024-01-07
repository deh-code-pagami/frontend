import { DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { Form } from "react-router-dom";
import Dialog from "../dialog/dialog";
import React, { FormEventHandler, useContext } from "react";
import { GlobalContext, GlobalContextInterface } from "../../main";


export default function GroupDialog({ children, open, handleClose }: { children: React.ReactNode, open: boolean, handleClose: () => void}) {
  const [loading, setLoading] = React.useState(false);
  const { global, setGlobal } = useContext(GlobalContext) as GlobalContextInterface;

  const [name, setName] = React.useState('');
  
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
          data: {
            name: name,
          }
        })
      })

      if (!res.ok) {
        return;
      }

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