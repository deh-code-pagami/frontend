import { Button, SwipeableDrawer, Typography } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import TransactionDialog from "../transaction/transaction-dialog";
import TransactionList from "../transaction/transaction-list";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TuneIcon from '@mui/icons-material/Tune';
import { Box } from "@mui/system";
import { GroupContext, GroupContextInterface } from "../../main";
import TransactionFilters from "../transaction/transaction-filters";

export default function TransactionsTabPanel() {
  const { group } = useContext(GroupContext) as GroupContextInterface;
  const [open, setOpen] = React.useState(false);

  const [ filtersOpen, setFiltersOpen ] = useState(false);

  const toggleDrawer = useCallback((open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

      setFiltersOpen(open);
    }, [])

  return (
    <>
      <Box sx={{
        display: 'flex',
        paddingTop: 2
      }}>
        <Box mr={1}>
          <Button variant="outlined" onClick={() => setOpen(true)} sx={{ px: 1 }}>
            <PlaylistAddIcon />
          </Button>
          <TransactionDialog
            open={open}
            handleClose={() => setOpen(false)}
          ></TransactionDialog>
        </Box>
        <Box>
          <Button variant="outlined" onClick={toggleDrawer(true)} sx={{ px: 1 }}>
              <TuneIcon />
            </Button>
        </Box>
      </Box>
      <SwipeableDrawer
        anchor='left'
        open={filtersOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box sx={{padding: "48px"}}>
          <Typography variant="h5" component="h2" sx={{marginBottom: '1rem'}}>Filters</Typography>
          <TransactionFilters onApply={toggleDrawer(false)}></TransactionFilters>
        </Box>
      </SwipeableDrawer>

      
      <Box>
        <TransactionList transactions={group?.transactions || []}></TransactionList>
      </Box>
    </>
  )
}