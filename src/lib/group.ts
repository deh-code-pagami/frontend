export async function find(): Promise<Group[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/groups/`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  const groups = json.data as Group[];

  return groups;
}

export async function findOne({ id }: { id: number }): Promise<Group> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/groups/${id}`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  const group = json.data as Group;

  return group;
}

export async function create({ name }: { name: string }): Promise<Group> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        name: name,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json();
  const group = json.data as Group;

  return group;
}

export async function remove({ groupId }: { groupId: number }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/groups/${groupId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export async function addUsers({
  users,
  groupId,
}: {
  users: User[];
  groupId: number;
}): Promise<User[]> {
  const addUserPromise = async (user: User) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/group-users/`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            user: user.id,
            group: groupId,
          },
        }),
      },
    );

    if (!response.ok) {
      console.error(response);
      return undefined;
    }

    return user;
  };

  const addUserPromises = users.map(addUserPromise);
  const addedUsers = await Promise.all(addUserPromises);

  const correctlyAddedUsers = addedUsers.filter((user) => !!user) as User[];

  return correctlyAddedUsers;
}

export async function removeUser({
  userId,
  groupId,
}: {
  userId: number;
  groupId: number;
}): Promise<User[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/groups/${groupId}/users/${userId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  const remainingUsers = json.data as User[];

  return remainingUsers;
}
