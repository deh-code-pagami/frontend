import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import TransactionList from "../../components/transaction/transaction-list";
import { Typography } from "@mui/material";


export default function TransactionsPage() {
  const { transactions } = useLoaderData() as { transactions: Array<Transaction> };

  return (
    <Container sx={{py: '48px'}}>
      <Typography component="h1" variant="h3" sx={{mb: '24px'}}>
        Transactions
      </Typography>
      <TransactionList transactions={transactions} ></TransactionList>
    </Container>
  )
}