import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TransactionDialog from "../transaction/transaction-dialog";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function SummaryTabPanel() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box pt={2}>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ px: 1 }}>
          <PlaylistAddIcon />
        </Button>
        <TransactionDialog
          open={open}
          handleClose={handleClose}
        ></TransactionDialog>
    </Box>
  )
}