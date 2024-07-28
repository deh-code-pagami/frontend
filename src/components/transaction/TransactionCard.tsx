import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import routes from '../../data/routes';
import { useContext } from 'react';
import { AuthenticationContext } from '../../providers/AuthenticationProvider';

export default function TransactionCard({ transaction }: { transaction: Transaction }) {
  const { state } = useContext(AuthenticationContext);
  const me = state.user?.id;

  if (!transaction.transactionMetas?.length || !me) {
    return <></>;
  }

  const isCreditor = !!transaction.transactionMetas.find(meta => meta.userCreditor.id === me);
  const metas = transaction.transactionMetas.filter(meta => meta.userDebtor.id === me);

  return (
    <Card sx={{ width: '100%' }}>
      <Link to={`${routes.transactions}${transaction.id}`}>
        <CardContent sx={{ color: 'text.primary' }}>
          {transaction.date && <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {new Date(transaction.date).toLocaleString()}
          </Typography>
          }
          <Box>
            <Typography variant="h5" component="div" display={'flex'} alignItems={'baseline'}>
              <Box
                whiteSpace={'nowrap'}
                pr={2}
                mr={2}
                borderRight='1px solid'
                borderColor='border.main'
                sx={{ color: isCreditor ? 'success.main' : 'error.main', fontWeight: "bold" }}
                component="span" >
                { !isCreditor && '-' } ${metas.map(meta => meta.amount).reduce((a, b) => a + b).toFixed(2)}
              </Box>
              <Box
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                textOverflow={'ellipsis'}
                flex={'1 1 0'} >
                {transaction.title}</Box>
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  )
}