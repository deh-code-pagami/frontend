import db from "../../db/db";

export const GET = async (req, res, next) => {
  const groups = await db.load('group');
  res.json({
    data: groups
  });
}

export const POST = async (req, res, next) => {
  const groups = await db.load('group');

  groups.push({
    ...(req.body),
    id: groups.length + 1
  });

  res.status(201).json({
    data: groups
  });
}