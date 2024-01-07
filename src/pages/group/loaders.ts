export async function groupsLoader() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/`);

  if (!response.ok) {
    return {};
  }

  const data = await response.json();
  const groups = data.data.map((group: any) => ({
    id: group.id,
    ...group.attributes
  }));

  return { groups };
}

export async function groupDetailLoader({ params }: any) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/`);

  if (!response.ok) {
    return {};
  }

  const data = await response.json();

  const group = {
    id: data.id,
    ...data.attributes
  };

  /*
  response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/transactions/`);
  data = await response.json();

  const transactions = data.data;
  */

  return { group, transactions: [] };
}