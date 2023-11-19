import db from "../../../db/db";

export const GET = (req, res, next) => {
  const transactions = db.load('transaction');
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