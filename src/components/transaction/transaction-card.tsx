import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import routes from '../../data/routes';

export default function TransactionCard(props: { transaction: Transaction, subject: string }) {
  const { transaction, subject } = props
  const isDebtor = subject == transaction.userDebtor;
  const otherSubject = isDebtor ? 'userCreditor' : 'userDebtor';

  return (
    <Card sx={{ width: '100%' }}>
      <Link to={`${routes.transactions}${transaction.id}`}>
        <CardContent sx={{ color: 'text.primary' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {transaction.date}
          </Typography>
          <Typography variant="h5" component="div" sx={{display: 'flex', alignItems: 'baseline'}}>
            <Box component="span">{transaction[otherSubject]}</Box>
            <Box component="span" sx={{marginX: '16px', fontSize: '1.25rem', color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{transaction.description || ''}</Box>
            <Box sx={{marginRight: '16px', marginLeft: 'auto', color:(isDebtor ? 'success.main' : 'error.main'), fontWeight: "bold"}} component="span" >{isDebtor ? '' : '-'}${transaction.transactionMetas[0].amount}</Box>
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}