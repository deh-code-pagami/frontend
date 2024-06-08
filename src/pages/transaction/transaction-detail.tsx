import { Box, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";



export default function TransactionDetailPage() {
  const { transaction } = useLoaderData() as { transaction: Transaction };

  return (
    <Container>
      <Box>
        <Typography mb={2} component='h1' variant="h3">{transaction.title || ''}</Typography>
        <Typography variant="h4">${transaction.transactionMetas.map(meta => meta.amount).reduce((a,b) => a+b)}</Typography>
        <Divider sx={{my: 2}}/>
      </Box>
      <Typography>
        {transaction.description || ''}
      </Typography>
      <Box>
        {transaction.transactionMetas.map((meta, i) => <Box key={i}>
        
        </Box>)}
      </Box>
    </Container>
  )
}