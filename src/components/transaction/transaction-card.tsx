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
  const subject = (global.user?.email || '');
  const meta = transaction.transactionMetas[0];
  const isCreditor = subject === meta.userCreditor.email;
  const otherSubject = isCreditor ? 'userDebtor' : 'userCreditor';

  return (
    <Card sx={{ width: '100%' }}>
      <Link to={`${routes.transactions}${transaction.id}`}>
        <CardContent sx={{ color: 'text.primary' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {transaction.date}
          </Typography>
          <Typography variant="h5" component="div" sx={{display: 'flex', alignItems: 'baseline'}}>
            <Box sx={{color:(isCreditor ? 'success.main' : 'error.main'), fontWeight: "bold"}} component="span" >{isCreditor ? '+' : '-'}${meta.amount}</Box>
            <Box sx={{marginX: '8px'}}>{isCreditor ? '←' : '→'}</Box>
            <Box component="span" sx={{fontWeight: '700'}}>{meta[otherSubject].username}</Box>
            <Box component="span" sx={{marginX: '24px', fontSize: '1rem', color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{transaction.description || ''}</Box>
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}