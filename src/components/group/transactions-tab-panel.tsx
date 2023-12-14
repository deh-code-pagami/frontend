import { Grid, Button, Typography } from "@mui/material";
import React from "react";
import TransactionDialog from "../transaction/transaction-dialog";
import TransactionFilters from "../transaction/transaction-filters";
import TransactionList from "../transaction/transaction-list";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Box } from "@mui/system";

export default function TransactionsTabPanel({ transactions }: { transactions: Transaction[] }) {
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
      <Grid mt={2} container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: '1rem' }}>Filters</Typography>
          <TransactionFilters></TransactionFilters>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* TODO get subject from logged in username */}
          <TransactionList transactions={transactions} subject="Piero"></TransactionList>
        </Grid>
      </Grid>
    </>
  )
}