import { Box } from "@mui/system";
import { useLoaderData } from "react-router-dom";

export async function groupDetailLoader({request, params} : any) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/index.json`);
  const data = await response.json();
  const group = data.data;

  return { group };
}

export default function GroupDetailPage() {
  const { group } = useLoaderData() as {group: Group};

  return (
    <Box>
      {group.id}: {group.name}
    </Box>
  )
}