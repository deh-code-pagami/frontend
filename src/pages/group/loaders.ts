export async function groupsLoader({ request }: any) {
  const url = new URL(request.url);
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${url.search}`);
  const data = await response.json();
  const groups = data.data;

  return { groups };
}

export async function groupDetailLoader({ params }: any) {
  let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/`);
  let data = await response.json();

  const group = data.data;

  response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/transactions/`);
  data = await response.json();

  const transactions = data.data;

  return { group, transactions };
}