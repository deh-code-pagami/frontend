export async function get(): Promise<User[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/users/`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  const users = json as User[];

  return users;
}
