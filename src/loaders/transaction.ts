export default async function transactionsLoader() {
  const response = await fetch('/api/transactions.json');
  const data = await response.json();
  const transactions = data.data;

  return { transactions };
}