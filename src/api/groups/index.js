import db from "../../db/db";

export const GET = async (req, res, next) => {
  const groups = await db.load("group");
  res.json({
    data: groups,
  });
};

export const POST = async (req, res, next) => {
  const groups = await db.load("group");
  let maxId = 0;

  for (const group of groups) {
    maxId = Math.max(group.id, maxId);
  }

  const newGroup = {
    ...req.body,
    id: maxId + 1,
  };

  groups.push(newGroup);

  db.save("group", groups);

  res.status(201).json({
    data: newGroup,
  });
};
