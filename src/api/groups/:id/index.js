import db from "../../../db/db";

export const GET = async (req, res, next) => {
  const groups = await db.load("group");
  const group = groups.find((el) => el.id == req.params.id);

  if (!group) {
    res.status(404).json({
      error: "Not found",
    });
    return;
  }

  res.json({
    data: group,
  });
};

export const DELETE = async (req, res, next) => {
  /**@type {Array<any>} */
  const groups = await db.load("group");
  const groupId = groups.findIndex((el) => el.id == req.params.id);

  if (groupId < 0) {
    res.status(401).json({
      error: "Invalid id",
    });

    return;
  }

  const [group] = groups.splice(groupId, 1);
  db.save("group", groups);

  res.json({
    data: group,
  });
};
