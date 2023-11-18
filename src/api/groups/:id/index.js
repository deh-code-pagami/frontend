import { groups, transactions } from ".."

export const GET = (req, res, next) => {
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