import UserTable from "../user/user-table";

export default function UsersTabPanel({group} : {group: Group}) {
  const { users = [] } = group;

  return <>
    <UserTable users={users}></UserTable>
  </>
}