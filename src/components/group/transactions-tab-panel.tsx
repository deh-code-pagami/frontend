import { Button } from "@mui/material";
import React, { useContext } from "react";
import TransactionDialog from "../transaction/transaction-dialog";
import TransactionList from "../transaction/transaction-list";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Box } from "@mui/system";
import { GroupContext, GroupContextInterface } from "../../main";

export default function TransactionsTabPanel() {
  const { group } = useContext(GroupContext) as GroupContextInterface;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box pt={2}>
        <Button variant="outlined" onClick={() => setOpen(true)} sx={{ px: 1 }}>
          <PlaylistAddIcon />
        </Button>
        <TransactionDialog
          open={open}
          handleClose={() => setOpen(false)}
        ></TransactionDialog>
      </Box>
      <Box>
        <TransactionList transactions={group?.transactions || []}></TransactionList>
      </Box>
    </>
  )
}