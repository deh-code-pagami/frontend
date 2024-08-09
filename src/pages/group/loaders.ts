import { find, findOne } from "../../lib/group";

export async function groupsLoader() {
  let groups;

  try {
    groups = await find();
  } catch (ex) {
    console.error(ex);
  }

  return { groups: groups ?? {} };
}

export async function groupDetailLoader({ params }: any) {
  let group;

  try {
    group = await findOne({ id: params.groupId });
  } catch (ex) {
    console.error(ex);
  }

  return { group: group ?? {} };
}
