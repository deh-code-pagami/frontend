import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import TransactionFilters from "../../components/transaction/transaction-filters";
import { visuallyHidden } from '@mui/utils';
import TransactionList from "../../components/transaction/transaction-list";

export async function transactionsLoader({ request } : any) {
  const url = new URL(request.url);
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/${url.search}`);
  const data = await response.json();
  const transactions = data.data;

  return { transactions };
}

export default function TransactionsPage() {
  const { transactions } = useLoaderData() as { transactions: Array<Transaction> };

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Transactions Page
      </Typography>
      <Grid mt={4} container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2" sx={{marginBottom: '1rem'}}>Filters</Typography>
          <TransactionFilters></TransactionFilters>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* TODO get subject from logged in username */}
          <TransactionList transactions={transactions} subject="Piero"></TransactionList>
        </Grid>
      </Grid>
    </Container>
  )
}