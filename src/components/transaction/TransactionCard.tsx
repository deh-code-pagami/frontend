import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import routes from '../../data/routes';
import { useContext } from 'react';
import { GlobalContext, GlobalContextInterface } from '../../contexts/global';

export default function TransactionCard({transaction}: { transaction: Transaction }) {
  const { global } = useContext(GlobalContext) as GlobalContextInterface;
  const me = global.user?.email;
  
  if (!transaction.transactionMetas?.length || !me) {
    return <></>;
  }

  const isCreditor = !!transaction.transactionMetas.find(meta => meta.userCreditor.email == me);
  const metas = isCreditor ? 
    transaction.transactionMetas : 
    transaction.transactionMetas.filter(meta => meta.userDebtor.email == me)
  
  return (
    <Card sx={{ width: '100%' }}>
      <Link to={`${routes.transactions}${transaction.id}`}>
        <CardContent sx={{ color: 'text.primary' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {transaction.date}
          </Typography>
          <Box>
              <Typography variant="h5" component="div" display={'flex'} alignItems={'baseline'}>
                <Box whiteSpace={'nowrap'} mr={2} sx={{color:'success.main', fontWeight: "bold"}} component="span" >${metas.map(meta => meta.amount).reduce((a,b) => a+b).toFixed(2)}</Box>
                <Box component="span" overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} fontWeight={'700'}>{metas.map(meta => meta[isCreditor ? 'userDebtor' : 'userCreditor'].username).join(', ')}</Box>
                <Box overflow={'hidden'} ml={4} whiteSpace={'nowrap'} textOverflow={'ellipsis'} flex={'1 1 0'}>{transaction.title}</Box>
              </Typography>
            </Box>
        </CardContent>
      </Link>
    </Card>
  )
}