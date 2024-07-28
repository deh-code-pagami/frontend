import { visuallyHidden } from "@mui/utils";
import { Outlet, useLoaderData, useNavigate, useNavigation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import GroupToolbar from "../../components/group/GroupToolbar";
import Spinner from "../../components/spinner/Spinner";
import { useContext, useEffect } from "react";
import routes from "../../data/routes";
import { GroupContext } from "../../providers/GroupProvider";

export default function GroupsPage() {
  const { groups } = useLoaderData() as { groups: Group[] };
  const navigation = useNavigation();
  const { state } = useContext(GroupContext);
  const { group } = state;
  
  const navigate = useNavigate();
  const groupId = parseInt(useParams().groupId || '') || undefined;

  useEffect(() => {
    if (groupId !== group?.id && groups.find(g => group?.id === g.id)) {
      // change path to match current group
      navigate(routes.groups + (group?.id || ''));
    }
  }, [group, groupId, groups, navigate]);

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Groups Page
      </Typography>
      <GroupToolbar availableGroups={groups} />
      { navigation.state === 'loading' ? 
        <Box sx={{
          position: 'relative',
          height: '200px'
        }}>
          <Spinner></Spinner>
        </Box> :
        <Outlet />  
      }
    </Container>
  )
}