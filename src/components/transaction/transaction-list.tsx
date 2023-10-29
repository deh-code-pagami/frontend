import { List, ListItem } from "@mui/material";
import TransactionCard from "./transaction-card";

export default function TransactionList(props: { transactions: Array<Transaction>, subject: string }) {
  const { transactions, subject } = props;

  return (
    <List>
      {transactions.map(transaction => <ListItem key={transaction.id}>
        <TransactionCard transaction={transaction} subject={subject}></TransactionCard>
      </ListItem>)}
    </List>
  )
}