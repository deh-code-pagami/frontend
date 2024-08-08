import db from "../../db/db";

export const GET = async (req, res, next) => {
  /**@type {Array} */
  let transactions = await db.load("transaction");

  if (req.body.group) {
    transactions = transactions.filter((el) => el.id == req.body.group);
  }

  res.json({
    data: transactions,
  });
};

export const POST = async (req, res, next) => {
  const transactions = await db.load("transaction");

  transactions.push({
    ...req.body,
    id: transactions.length + 1,
    group: req.body.group,
  });

  db.save("transaction", transactions);

  res.status(201).json({
    data: transactions,
  });
};
