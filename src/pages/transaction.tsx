import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import TransactionCard from "../components/transaction/transaction";

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

export function TransactionDetailPage() {
  const { transaction } = useLoaderData() as { transaction: Transaction };

  return (
    <Container>
      <h1>{transaction.title || ''}</h1>
      <Typography>
        {transaction.description || ''}
      </Typography>
    </Container>
  )
}