import { Grid, List, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import TransactionCard from "../../components/transaction/transaction-card";
import TransactionFilters from "../../components/transaction/transaction-filters";

export async function transactionsLoader({ request } : any) {
  const url = new URL(request.url);
  console.log(url.search);
  const response = await fetch(`/api/transactions/index.json${url.search}`);
  const data = await response.json();
  const transactions = data.data;

  return { transactions };
}

export default function TransactionsPage() {
  const { transactions } = useLoaderData() as { transactions: Array<Transaction> };
  const me = 'Paolo';

  return (
    <Container>
      <h1>
        Transactions Page
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2" sx={{marginBottom: '1rem'}}>Filters</Typography>
          <TransactionFilters></TransactionFilters>
        </Grid>
        <Grid item xs={12} md={8}>
          <List>
            {transactions.map(transaction => <ListItem key={transaction.id}>
              <TransactionCard transaction={transaction} subject={me == transaction.userCreditor ? 'userDebtor' : 'userCreditor'}></TransactionCard>
            </ListItem>)}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}