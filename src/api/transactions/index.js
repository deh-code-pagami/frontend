import db from "../../db/db";

export const GET = async (req, res, next) => {
  const transactions = await db.load('transaction');

  res.json({
    data: transactions
  });
}