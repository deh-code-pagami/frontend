import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import routes from '../../data/routes';

export default function TransactionCard(props: { transaction: Transaction, subject: 'userDebtor' | 'userCreditor' }) {
    const { transaction, subject } = props
    const isDebtor = subject == 'userDebtor'

    return (
        <Card sx={{ minWidth: 275 }}>
            <Link to={`${routes.transactions}${transaction.id}`}>
            <CardContent sx={{color: 'text.primary'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {transaction.date}
                </Typography>
                <Typography variant="h5" component="div">
                    <Typography component="span" fontWeight="bold" color={isDebtor ? 'success' : 'error'} fontSize="1.5rem">{isDebtor ? '' : '-'}{transaction.amount}</Typography><Box component="span" sx={{ marginLeft: '16px' }}>{transaction[subject]}</Box>
                </Typography>
            </CardContent>
            </Link>
        </Card>
    )
}