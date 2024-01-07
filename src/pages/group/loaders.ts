export async function groupsLoader({ request }: any) {
  // const url = new URL(request.url);
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/`);
  const data = await response.json();
  const groups = data.data.map((group: any) => ({
    id: group.id,
    ...group.attributes
  }));

  return { groups };
}

export async function groupDetailLoader({ params }: any) {
  let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/`);
  let data = await response.json();

  const groups = data.data.map((group: any) => ({
    id: group.id,
    ...group.attributes
  }));

  response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/`);
  data = await response.json();

  const group = {
    id: data.id,
    ...data.attributes
  };

  /*
  response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/transactions/`);
  data = await response.json();

  const transactions = data.data;
  */

  return { group, transactions: [], groups };
}