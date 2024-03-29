import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { GroupContext, GroupContextInterface } from "../../main";
import ConfirmationDialog from "../dialog/confirmation-dialog";
import GroupDialog from "./group-dialog";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { useNavigate } from "react-router-dom";
import routes from "../../data/routes";

export interface GroupOption {
  label: string,
  value: number
}

export default function GroupToolbar({ groups }: { groups: Group[] }) {
  const [createDialog, setCreateDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const { group, setGroup } = useContext(GroupContext) as GroupContextInterface;
  const navigate = useNavigate();

  const selectedGroup = !group ? null : groups.find(el => el.id === group?.id);

  const closeCreateDialog = () => {
    setCreateDialog(false);
  }

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  }

  const deleteGroup = async () => {
    if (!group) {
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${group.id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      console.error(response);
      return;
    }

    setGroup(undefined);

    closeDeleteDialog();
  }

  const changeGroup = (_e: any, newValue: any) => {
    const selectedGroup = !newValue ? null : groups.find(el => el.id === newValue.value);

    setGroup(selectedGroup);
    navigate(routes.groups + (selectedGroup?.id || ''));
  }

  return (
    <Box mt={4} display='flex'>
      <Autocomplete
        disablePortal
        options={groups.map(group => ({ label: group.name, value: group.id }))}
        sx={{ width: 300 }}
        renderInput={(params) => { return <TextField {...params} label="Group" />; }}
        renderOption={(props, option) => <li {...props} key={option.value}>{option.label}</li>}
        value={{ label: selectedGroup?.name || '', value: selectedGroup?.id }}
        onChange={changeGroup}
        isOptionEqualToValue={(a, b) => a.value === b.value}
      />
      <Button sx={{ ml: 2, px: 1 }} variant="outlined" onClick={() => { setCreateDialog(true); }} >
        <AddIcon />
      </Button>
      <GroupDialog open={createDialog} handleClose={closeCreateDialog}> </GroupDialog>
      <Button
        sx={{ ml: 2, px: 1 }}
        variant="outlined"
        color="error"
        onClick={() => {
          if (!group) {
            return;
          }

          setDeleteDialog(true);
        }}
      >
        <DeleteIcon />
      </Button>
      <ConfirmationDialog open={deleteDialog} title="Are you sure you want to delete this group?" onConfirm={deleteGroup} handleClose={closeDeleteDialog} ></ConfirmationDialog>
    </Box>
  )
}