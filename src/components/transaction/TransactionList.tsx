import { List, ListItem } from "@mui/material";
import TransactionCard from "./TransactionCard";

export default function TransactionList(props: { transactions: Transaction[] }) {
  const { transactions } = props;
  // TODO: transactions list sometimes is not refreshed 
  return (
    <>
      <List>
        {transactions?.map(transaction => <ListItem sx={{px: '0'}} key={transaction.id}>
            <TransactionCard transaction={transaction}></TransactionCard>
          </ListItem>)
        }
      </List>
    </>
  )
}