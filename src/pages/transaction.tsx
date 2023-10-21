import { Container } from "@mui/material";
import { useLoaderData } from "react-router-dom";

export default function TransactionsPage() {
  const { transactions } = useLoaderData() as { transactions: Array<Transaction> };

  return (
    <Container>
    <h1>
      Transactions Page
    </h1>
      <div>
        <ul>
          { transactions.map(transaction => <li key={transaction.id}>
            <strong>{transaction.date}</strong>: { `${transaction.fromUser} -> ${transaction.toUser} €${transaction.amount}` }
          </li>) }
        </ul>
      </div>
    </Container>
  )
}