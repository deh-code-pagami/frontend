import qs from "qs";
import { prepareTransaction } from "../../utils/strapi";

export async function transactionDetailLoader({params} : any) {
  const queryParams = qs.stringify({
    populate: {
      transaction_metas: {
        populate: ['user_creditor', 'user_debtor']
      }
    }
  });

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/${params.transactionId}/?${queryParams}`);
  const json = await response.json();
  const transaction = prepareTransaction(json.data);

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

  const queryParams = qs.stringify({
    populate: {
      transaction_metas: {
        populate: ['user_creditor', 'user_debtor'],
      }
    },
    filters: {
      description: {
        $containsi: searchParams.get('description') || ''
      },
      transaction_metas: {
        amount: {
          $between: [(searchParams.get('amount_min') || 0), (searchParams.get('amount_max') || 5000)]
        }
      },
      ...dateFilters
    }
  });

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/?${queryParams}`);
  const json = await response.json();
  const transactions = prepareTransaction(json.data);

  return { transactions };
}
