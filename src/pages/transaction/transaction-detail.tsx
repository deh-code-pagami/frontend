import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";



export default function TransactionDetailPage() {
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