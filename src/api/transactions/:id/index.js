import { transactions } from ".."

export const GET = (req, res, next) => {
  const transaction = transactions.find(el => (el.id == req.params.id));

  if (!transaction) {
    res.status(404).json({
      error: 'Not found'
    });
    return;
  }

  res.json({
    data: transaction
  });
}