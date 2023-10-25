import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";

export async function transactionDetailLoader({request, params} : any) {
  const response = await fetch(`/api/transactions/${params.transactionId}/index.json`);
  const data = await response.json();
  const transaction = data.data;

  return { transaction };
}

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