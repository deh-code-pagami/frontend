import { Autocomplete, Container, TextField, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useLoaderData } from "react-router-dom";
import { Box } from "@mui/system";

export async function groupsLoader({ request }: any) {
  const url = new URL(request.url);
  const response = await fetch(`/api/groups/index.json${url.search}`);
  const data = await response.json();
  const groups = data.data;

  return { groups };
}

export default function GroupsPage() {
  const { groups } = useLoaderData() as { groups: Array<Group> };

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Groups Page
      </Typography>
      <Box mt={4}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={groups.map(group => ({ label: group.name, value: group.id }))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Group" />}
        />
      </Box>
    </Container>
  )
}