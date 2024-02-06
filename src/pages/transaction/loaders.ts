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

export async function transactionsLoader() {
  const queryParams = qs.stringify({
    populate: {
      transaction_metas: {
        populate: ['user_creditor', 'user_debtor']
      }
    }
  });

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/?${queryParams}`);
  const json = await response.json();
  const transactions = prepareTransaction(json.data);

  return { transactions };
}
