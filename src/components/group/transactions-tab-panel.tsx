import { Button } from "@mui/material";
import React from "react";
import TransactionDialog from "../transaction/transaction-dialog";
import TransactionList from "../transaction/transaction-list";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Box } from "@mui/system";

export default function TransactionsTabPanel({ group }: { group: Group }) {
  const { transactions = [] } = group;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box pt={2}>
        <Button variant="outlined" onClick={handleClickOpen} sx={{ px: 1 }}>
          <PlaylistAddIcon />
        </Button>
        <TransactionDialog
          open={open}
          handleClose={handleClose}
        ></TransactionDialog>
      </Box>
      <Box>
        <TransactionList transactions={transactions}></TransactionList>
      </Box>
    </>
  )
}