import { Box } from "@mui/system";
import UserTable from "../user/UserTable";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button } from "@mui/material";
import React, { useCallback, useContext } from "react";
import UserSelectionDialog from "../user/UserSelectionDialog";
import { GroupContext } from "../../providers/GroupProvider";
import { addUsers } from "../../lib/group";
import { get } from "../../lib/user";

export default function UsersTabPanel() {
  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [addUserDialog, setAddUserDialog] = React.useState(false);
  const { state, dispatch } = useContext(GroupContext);

  const { group } = state;

  const handleClickOpen = useCallback(async () => {
    let users;

    try {
      users = await get();
    } catch (ex) {
      console.error(ex);
    }

    if (!users) {
      return;
    }

    // filter users that are already inside the group
    const validUsers = users.filter(
      (user1) => !group?.users?.some((user2) => user1.id === user2.id),
    );

    setAllUsers(validUsers);

    setAddUserDialog(true);
  }, [group?.users]);

  const handleSubmit = useCallback(
    async (selectedUsers: User[], handleClose: () => void) => {
      if (!group) {
        return;
      }

      const users = await addUsers({ users: selectedUsers, groupId: group.id });

      dispatch({ type: "addUser", user: users });

      handleClose();
    },
    [dispatch, group],
  );

  if (!group) {
    return <></>;
  }

  return (
    <>
      <Box sx={{ marginBottom: 4 }}>
        <Button variant="outlined" sx={{ px: 1 }} onClick={handleClickOpen}>
          <PersonAddIcon></PersonAddIcon>
        </Button>
      </Box>
      <UserTable></UserTable>
      <UserSelectionDialog
        handleClose={() => {
          setAddUserDialog(false);
        }}
        open={addUserDialog}
        allUsers={allUsers}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
