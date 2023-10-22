export default async function transactionsLoader() {
  const response = await fetch('/api/transactions/index.json');
  const data = await response.json();
  const transactions = data.data;

  return { transactions };
}

export async function transactionDetailLoader({request, params} : any) {
  const response = await fetch(`/api/transactions/${params.transactionId}/index.json`);
  const data = await response.json();
  const transaction = data.data;

  return { transaction };
}