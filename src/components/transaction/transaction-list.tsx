import { List, ListItem } from "@mui/material";
import TransactionCard from "./transaction-card";

export default function TransactionList(props: { transactions: Array<Transaction> }) {
  const { transactions } = props;
  

  return (
    <List>
      {transactions.map(transaction => <ListItem key={transaction.id}>
        <TransactionCard transaction={transaction}></TransactionCard>
      </ListItem>)}
    </List>
  )
}