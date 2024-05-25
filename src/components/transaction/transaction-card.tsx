import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import routes from '../../data/routes';
import { useContext } from 'react';
import { GlobalContext, GlobalContextInterface } from '../../main';

export default function TransactionCard({transaction}: { transaction: Transaction }) {
  const { global } = useContext(GlobalContext) as GlobalContextInterface;
  const subject = global.user?.email;
  
  if (!transaction.transactionMetas?.length || !subject) {
    return <></>;
  }

  const meta = transaction.transactionMetas[0];
  const isCreditor = subject === meta.userCreditor.email;
  const otherSubjects = isCreditor ? 
    meta.userDebtors
      .filter(user => user.email != subject)
      .map(user => user.username)
      .join(', ') 
    : meta.userCreditor.username;

  const amount = meta.amount / meta.userDebtors.length;
console.log(transaction)
  return (
    <Card sx={{ width: '100%' }}>
      <Link to={`${routes.transactions}${transaction.id}`}>
        <CardContent sx={{ color: 'text.primary' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {transaction.date}
          </Typography>
          <Box>
              <Typography variant="h5" component="div" display={'flex'} alignItems={'baseline'}>
                <Box whiteSpace={'nowrap'} sx={{color:(isCreditor ? 'success.main' : 'error.main'), fontWeight: "bold"}} component="span" >{isCreditor ? '+' : '-'}${amount.toFixed(2)}</Box>
                <Box sx={{marginX: '8px'}}>{isCreditor ? '←' : '→'}</Box>
                <Box component="span" overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} fontWeight={'700'}>{otherSubjects}</Box>
                <Box overflow={'hidden'} ml={4} whiteSpace={'nowrap'} textOverflow={'ellipsis'} flex={'1 1 0'}>{transaction.title}</Box>
              </Typography>
            </Box>
        </CardContent>
      </Link>
    </Card>
  )
}