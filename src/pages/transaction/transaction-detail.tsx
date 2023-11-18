import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";

export async function transactionDetailLoader({params} : any) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/${params.transactionId}/`);
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