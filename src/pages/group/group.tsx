import { visuallyHidden } from "@mui/utils";
import { Navigate, useLoaderData } from "react-router-dom";
import routes from "../../data/routes";
import { useContext } from "react";
import { GlobalContext, GlobalContextInterface } from "../../main";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import GroupToolbar from "../../components/group/group-toolbar";

export default function GroupsPage() {
  const { global } = useContext(GlobalContext) as GlobalContextInterface;
  const { currentGroup } = global;

  const { groups } = useLoaderData() as { groups: Group[] };

  if (currentGroup && currentGroup != -1) {
    return <Navigate to={routes.groups + `${currentGroup}/`} replace={true}></Navigate>
  }

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Groups Page
      </Typography>
      <GroupToolbar
        groups={groups}
      />
    </Container>
  )
}