export async function transactionDetailLoader({params} : any) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/${params.transactionId}/`);
  const data = await response.json();
  const transaction = data.data;

  return { transaction };
}

export async function transactionsLoader({ request } : any) {
  const url = new URL(request.url);
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/${url.search}`);
  const data = await response.json();
  const transactions = data.data;

  return { transactions };
}
