export async function transactionDetailLoader({params} : any) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/${params.transactionId}/?`);
  const json = await response.json();
  const transaction = json.data;

  return { transaction };
}

export async function transactionsLoader({request} : any) {
  const searchParams = new URL(request.url).searchParams;

  const dateFilters = {} as any;

  if (searchParams.get('date_from') && searchParams.get('date_to')) {
    dateFilters.createdAt = {
      $between: [searchParams.get('date_from'), searchParams.get('date_to')]
    } ;
  }
  else if (searchParams.get('date_from') || searchParams.get('date_to')) {
    const operator = searchParams.get('date_from') ? 'gte' : 'lte';

    dateFilters.createdAt = {
      [operator]: searchParams.get('date_from') || searchParams.get('date_to')
    }
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/`);
  const json = await response.json();
  const transactions = json.data;

  return { transactions };
}
