import { transactions } from "../../../transactions"

export const GET = (req, res, next) => {
  res.json({
    data: transactions
    });
}