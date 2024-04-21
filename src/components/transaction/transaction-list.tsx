import { List, ListItem, Box, SwipeableDrawer, Typography, Button } from "@mui/material";
import TransactionCard from "./transaction-card";
import TransactionFilters from "./transaction-filters";
import TuneIcon from '@mui/icons-material/Tune';
import { useCallback, useState } from "react";

export default function TransactionList(props: { transactions: Array<Transaction> }) {
  const { transactions } = props;
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

      <Box sx={{mb: '16px'}}>
        <Button variant="outlined" onClick={toggleDrawer(true)} sx={{ px: 1 }}>
            <TuneIcon />
          </Button>
      </Box>
      <List>
        {transactions.map(transaction => <ListItem sx={{px: '0'}} key={transaction.id}>
            <TransactionCard transaction={transaction}></TransactionCard>
          </ListItem>)
        }
      </List>
    </>
  )
}