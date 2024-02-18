import qs from "qs";
import { prepareGroup } from "../../utils/strapi";

export async function groupsLoader() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/`);

  if (!response.ok) {
    return {};
  }

  const json = await response.json();
  const groups = prepareGroup(json.data);

  return { groups };
}

export async function groupDetailLoader({ params }: any) {
  const queryParams = qs.stringify({
    populate: {
      transactions: {
        populate: {
          transaction_metas: {
            populate: ['user_debtor', 'user_creditor']
          }
        }
      },
      users: {
        populate: {
          user: {
            populate: ['role']
          }
        }
      }
    }
  });

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/?${queryParams}`);

  if (!response.ok) {
    return {};
  }

  const json = await response.json();

  const group = prepareGroup(json.data);

  return { group };
}