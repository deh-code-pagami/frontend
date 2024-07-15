import { Box, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";



export default function TransactionDetailPage() {
  const { transaction } = useLoaderData() as { transaction: Transaction };
  const total = transaction.transactionMetas.map(meta => meta.amount).reduce((a,b) => a+b);

  return (
    <Container>
      <Box>
        <Typography mb={2} component='h1' variant="h3">{transaction.title || ''}</Typography>
        <Typography variant="h4">${total}</Typography>
        <Divider sx={{my: 2}}/>
      </Box>
      <Typography 
        marginBottom={6}
        color="text.secondary"
        fontSize="1.25rem"
      >
        {transaction.description || ''}
      </Typography>
      <Box>
        {transaction.transactionMetas.map((meta, i) => 
          <Box 
            key={i}
            marginBottom={2}>
            ${meta.amount} - {meta.userDebtor.username} ({meta.userDebtor.email})
          </Box>)
        }
      </Box>
    </Container>
  )
}