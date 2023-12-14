import { visuallyHidden } from "@mui/utils";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import routes from "../../data/routes";
import { useContext, useEffect } from "react";
import { GlobalContext, GlobalContextInterface } from "../../main";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import GroupToolbar from "../../components/group/group-toolbar";

export default function GroupsPage() {
  const { global } = useContext(GlobalContext) as GlobalContextInterface;
  const { currentGroup } = global;

  const { groupId } = useParams();

  const { groups } = useLoaderData() as { groups: Group[] };

  const navigate = useNavigate();

  useEffect(() => {
    if (currentGroup && !groupId && currentGroup != -1) {
      navigate(routes.groups + currentGroup);
    }
  }, [currentGroup, groupId, navigate])

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