export async function find(): Promise<Transaction[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/transactions/`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  const transactions = json.data as Transaction[];

  return transactions;
}

export async function findOne({ id }: { id: number }): Promise<Transaction> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/transactions/${id}/`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  const transaction = json.data as Transaction;

  return transaction;
}

export async function create({
  title,
  description,
  groupId,
  transactionMetas,
}: {
  title: string;
  description: string;
  groupId: number;
  transactionMetas: TransactionMeta[];
}): Promise<Transaction> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/transactions/`,
    {
      method: "post",
      body: JSON.stringify({
        data: {
          title,
          description,
          group: groupId,
          transactionMetas,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  const transaction = json.data as Transaction;

  return transaction;
}
