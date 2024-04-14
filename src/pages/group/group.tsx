import { visuallyHidden } from "@mui/utils";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import GroupToolbar from "../../components/group/group-toolbar";
import Spinner from "../../components/spinner/spinner";

export default function GroupsPage() {
  const { groups } = useLoaderData() as { groups: Group[] };
  const navigation = useNavigation();

  return (
    <Container>
      <Typography sx={visuallyHidden} variant="h1">
        Groups Page
      </Typography>
      <GroupToolbar
        groups={groups}
      />
      { navigation.state === 'loading' ? 
        <Box sx={{
          position: 'relative',
          height: '200px'
        }}>
          <Spinner></Spinner>
        </Box> :
        <Outlet context={[groups]} />  
      }
    </Container>
  )
}