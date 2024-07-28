import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useCallback, useContext } from "react";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import GroupDialog from "./GroupCreationDialog";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { GroupContext } from "../../providers/GroupProvider";
import { useNavigate } from "react-router-dom";
import routes from "../../data/routes";

export default function GroupToolbar({ availableGroups } : { availableGroups: Group[] }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const { state, dispatch } = useContext(GroupContext);
  const navigate = useNavigate();
  
  const { group } = state; 

  const selectedGroup = !group ? null : availableGroups.find(el => el.id === group?.id);

  const deleteGroup = useCallback(async () => {
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

    dispatch({type: 'unsetGroup'});
    setDeleteDialog(false);
  }, [group, dispatch]);

  const changeGroup = useCallback((_e: any, newValue: any) => {
    const selectedGroup = !newValue ? null : availableGroups.find(el => el.id === newValue.value);

    if (!selectedGroup) {
      dispatch({type: 'unsetGroup'});
      navigate(routes.groups);
    }
    else {
      dispatch({type: 'setGroup', group: selectedGroup})
    }

  }, [availableGroups, dispatch, navigate]);

  return (
    <Box position={'relative'} display='flex'>
      <div id="test"></div>
      <Autocomplete
        disablePortal
        options={availableGroups.map(group => ({ label: group.name, value: group.id })) || []}
        sx={{ width: 300 }}
        renderInput={(params) => { return <TextField {...params} label="Group" />; }}
        renderOption={(props, option) => <li {...props} key={option.value}>{option.label}</li>}
        value={selectedGroup ? { label: selectedGroup?.name || '', value: selectedGroup?.id } : null }
        onChange={changeGroup}
        isOptionEqualToValue={(a, b) => a.value === b.value}
      />
      <Button sx={{ ml: 2, px: 1 }} variant="outlined" onClick={() => setIsCreateDialogOpen(true)} >
        <AddIcon />
      </Button>
      <GroupDialog open={isCreateDialogOpen} handleClose={() => setIsCreateDialogOpen(false)}> </GroupDialog>
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
      <ConfirmationDialog open={deleteDialog} title="Are you sure you want to delete this group?" onConfirm={deleteGroup} handleClose={() => { setDeleteDialog(false); }} ></ConfirmationDialog>
    </Box>
  )
}