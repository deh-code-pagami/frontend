import qs from 'qs'

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
  const query = qs.stringify({
    populate: {
      transactions: { populate: ['transaction'] },
      users: { populate: ['user'] }
    }
  });

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/?${query}`);

  if (!response.ok) {
    return {};
  }

  const json = await response.json();

  const group = {
    id: json.id,
    ...json.attributes
  };

  return { group, transactions: [] };
}