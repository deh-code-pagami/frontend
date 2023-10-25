import { Grid, List, ListItem } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import TransactionCard from "../../components/transaction/transaction-card";

export async function transactionsLoader() {
  const response = await fetch('/api/transactions/index.json');
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
        <Grid xs={12} md={4}>
          Filters
        </Grid>
        <Grid xs={12} md={8}>
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