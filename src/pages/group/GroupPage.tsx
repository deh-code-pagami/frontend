import { visuallyHidden } from "@mui/utils";
import { Outlet, useLoaderData, useNavigate, useNavigation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import GroupToolbar from "../../components/group/GroupToolbar";
import Spinner from "../../components/spinner/Spinner";
import { useContext, useEffect } from "react";
import { GroupContext, GroupContextInterface } from "../../contexts/group";
import routes from "../../data/routes";

export default function GroupsPage() {
  const { groups: loaderGroups } = useLoaderData() as { groups: Group[] };
  const navigation = useNavigation();
  const { group, setAllGroups } = useContext(GroupContext) as GroupContextInterface;
  
  const navigate = useNavigate();
  const groupId = parseInt(useParams().groupId || '') || undefined;

  useEffect(() => {
    if (loaderGroups) {
      setAllGroups(loaderGroups);
    }
  }, [loaderGroups, setAllGroups]);

  useEffect(() => {
    if (groupId !== group?.id ) {
      // change path to match current group
      navigate(routes.groups + (group?.id || ''));
    }
  }, [group, groupId, navigate]);

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Groups Page
      </Typography>
      <GroupToolbar/>
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