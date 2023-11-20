import { Autocomplete, Container, TextField, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import routes from "../../data/routes";
import GroupDialog from "../../components/group/group-dialog";

export async function groupsLoader({ request }: any) {
  const url = new URL(request.url);
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${url.search}`);
  const data = await response.json();
  const groups = data.data;

  return { groups };
}

export default function GroupsPage() {
  const { groups } = useLoaderData() as { groups: Array<Group> };
  const navigate = useNavigate();

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Groups Page
      </Typography>
      <GroupDialog></GroupDialog>
      <Box mt={4}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={groups.map(group => ({ label: group.name, value: group.id }))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Group" />}
          onChange={(_e, newValue) => {const v = newValue?.value; navigate(routes.groups + (typeof v == 'undefined' ? '' : (v + '/')))}}
        />
      </Box>
      <Box pt={4}>
        <Outlet/>
      </Box>
    </Container>
  )
}