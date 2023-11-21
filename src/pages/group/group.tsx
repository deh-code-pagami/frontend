import { Autocomplete, Button, Container, TextField, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import routes from "../../data/routes";
import GroupDialog from "../../components/group/group-dialog";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

export default function GroupsPage() {
  const { groups } = useLoaderData() as { groups: Array<Group> };
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Groups Page
      </Typography>
      <Box mt={4} display='flex'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={groups.map(group => ({ label: group.name, value: group.id }))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Group" />}
          onChange={(_e, newValue) => { const v = newValue?.value; navigate(routes.groups + (typeof v == 'undefined' ? '' : (v + '/'))) }}
        />
        <Button sx={{ml: 2, px: 1}} variant="outlined" onClick={handleClickOpen} >
          <AddIcon />
        </Button>
        <GroupDialog open={open} handleClose={handleClose}> </GroupDialog>
      </Box>
      <Box pt={4}>
        <Outlet />
      </Box>
    </Container>
  )
}