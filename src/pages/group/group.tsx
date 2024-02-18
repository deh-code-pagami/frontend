import { visuallyHidden } from "@mui/utils";
import { Outlet, useLoaderData } from "react-router-dom";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import GroupToolbar from "../../components/group/group-toolbar";

export default function GroupsPage() {
  const { groups } = useLoaderData() as { groups: Group[] };

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Groups Page
      </Typography>
      <GroupToolbar
        groups={groups}
      />
      <Outlet context={[groups]} />
    </Container>
  )
}