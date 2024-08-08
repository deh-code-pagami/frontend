import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TransactionDialog from "../transaction/TransactionCreationDialog";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function SummaryTabPanel() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box pt={2}>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ px: 1 }}>
        <PlaylistAddIcon />
      </Button>
      <TransactionDialog
        open={open}
        handleClose={() => setOpen(false)}
      ></TransactionDialog>
    </Box>
  );
}
