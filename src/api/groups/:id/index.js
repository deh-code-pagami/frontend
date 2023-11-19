import { groups, transactions } from ".."
import db from "../../../db/db";

export const GET = async (req, res, next) => {
  const groups = await db.load('group');
  const group = groups.find(el => (el.id == req.params.id));

  if (!group) {
    res.status(404).json({
      error: 'Not found'
    });
    return;
  }

  res.json({
    data: group
  });
}