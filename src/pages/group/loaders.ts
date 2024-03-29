export async function groupsLoader() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/`);

  if (!response.ok) {
    return {};
  }

  const json = await response.json();
  const groups = json.data;

  return { groups };
}

export async function groupDetailLoader({ params }: any) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/`);

  if (!response.ok) {
    return {};
  }

  const json = await response.json();

  const group = json.data;

  return { group };
}