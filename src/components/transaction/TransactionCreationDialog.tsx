import { DialogTitle, DialogContent, TextField, Autocomplete, Checkbox, DialogActions, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import Dialog from "../dialog/Dialog";
import React, { useCallback, useContext } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { GroupContext } from "../../providers/GroupProvider";


export default function TransactionCreationDialog({ open, handleClose }: { open: boolean, handleClose: () => void }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('0');
  const [userDebtors, setUserDebtors] = React.useState<User[]>([]);
  const [userCreditor, setUserCreditor] = React.useState<User | null>(null);
  const { state, dispatch } = useContext(GroupContext);
  const { group } = state;
  
  const reset = useCallback(() => {
    setTitle('');
    setDescription('');
    setAmount('');
    setUserDebtors([]);
    handleClose();
  }, [handleClose]);

  const createTransaction = async () => {
    if (!group) {
      return;
    }
    
    const total = parseInt(amount);

    if (!total) {
      return;
    }

    let splittedAmount = (total / userDebtors.length);
    splittedAmount = Math.floor(splittedAmount * 100) / 100;
    
    const transactionMetas = userDebtors.map(userDebtor => ({
      amount: splittedAmount,
      userCreditor,
      userDebtor
    }));
    
    // if amount can't be slpitted evenly, choose a random user to pay the remaining
    const rest = total - (splittedAmount * userDebtors.length);

    if (rest > 0) {
      const choice = Math.floor(Math.random() * transactionMetas.length);
      transactionMetas[choice].amount += rest;
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/`, {
      method: 'post',
      body: JSON.stringify({
        data: {
          title,
          description,
          group: group.id,
          transactionMetas
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      reset();
    }

    const transaction = (await response.json()).data as Transaction;

    dispatch({ type: 'addTransaction', transaction });
  }

  return (
    <>
    <Dialog open={open} handleClose={handleClose} >
      <div>
        <DialogTitle id="transaction-dialog">Add new transaction</DialogTitle>
        <DialogContent>

          <Stack spacing={4}>
            <Box>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => { setTitle(e.target.value) }} />
            </Box>
            <Box>
              <TextField
                fullWidth
                id="description"
                name="description"
                value={description}
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                onChange={(e) => { setDescription(e.target.value) }} />
            </Box>
            <Box>
              <TextField
                fullWidth
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
                onChange={(_e, newValue) => { setUserDebtors(newValue) }}
                value={userDebtors}
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
                  <TextField {...params} label="Who should split the cost?" placeholder="Add users" />
                )}
              />
            </Box>
            <Box>
              <Autocomplete
                onChange={(_e, newValue) => { setUserCreditor(newValue) }}
                value={userCreditor}
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
                  <TextField {...params} label="Who paid?" placeholder="Select user" />
                )}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={reset}>Cancel</Button>
          <Button onClick={createTransaction}>Add</Button>
        </DialogActions>

      </div>
    </Dialog>
    </>
  )
}