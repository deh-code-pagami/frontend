import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { GlobalContext, GlobalContextInterface } from "../../main";
import ConfirmationDialog from "../dialog/confirmation-dialog";
import GroupDialog from "./group-dialog";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

export interface GroupOption {
  label: string, 
  value: number
}

export default function GroupToolbar({ groups }: {groups: Array<Group> }) {
  const [createDialog, setCreateDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const { global, setGlobal } = useContext(GlobalContext) as GlobalContextInterface;
  const { currentGroup } = global;

  const g = groups.find(el => el.id === currentGroup);

  const selectedGroup = g ? {
    label: g.name || '',
    value: g.id || -1
  } : null;

  const closeCreateDialog = () => {
    setCreateDialog(false);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  }

  const deleteGroup = () => {
    (async () => {
      const groupId = selectedGroup?.value;
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${groupId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        console.error(response);
        return;
      }

      setGlobal({
        ...global,
        currentGroup: -1
      });

      closeDeleteDialog();
    })()
  }
  console.log(groups)
  return (
  <Box mt={4} display='flex'>
    <Autocomplete
      disablePortal
      options={groups.map(group => ({ label: group.name || ' ', value: group.id }))}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Group" />}
      value={selectedGroup}
      onChange={(_e, newValue) => { 
        setGlobal({...global, currentGroup: (newValue?.value || -1)}) 
      }}
      isOptionEqualToValue={(opt, val) => opt.value == val.value}
    />
    <Button sx={{ml: 2, px: 1}} variant="outlined" onClick={() => {setCreateDialog(true);}} >
      <AddIcon />
    </Button>
    <GroupDialog open={createDialog} handleClose={closeCreateDialog}> </GroupDialog>
    <Button sx={{ml: 2, px: 1}} variant="outlined" color="error" onClick={() => {setDeleteDialog(true);}} >
      <DeleteIcon />
    </Button>
    <ConfirmationDialog open={deleteDialog} title="Are you sure you want to delete this group?" onConfirm={deleteGroup} handleClose={closeDeleteDialog} ></ConfirmationDialog>
  </Box>
  )
}