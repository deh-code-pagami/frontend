import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import TransactionList from "../../components/transaction/TransactionList";
import { Typography } from "@mui/material";

export default function TransactionsPage() {
  const { transactions } = useLoaderData() as {
    transactions: Array<Transaction>;
  };

  return (
    <Container>
      <Typography component="h1" variant="h3" sx={{ mb: "24px" }}>
        Transactions
      </Typography>
      <TransactionList transactions={transactions}></TransactionList>
    </Container>
  );
}
