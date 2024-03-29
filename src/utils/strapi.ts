export function prepareGroup(group: any | any[]): Group | Group[] {
  if (Array.isArray(group)) {
    return group.map(el => prepareGroup(el) as Group);
  }

  const { name, users, transactions } = group;

  return {
    id: group.id,
    name,
    transactions: !transactions ? [] : prepareTransaction(transactions) as Transaction[],
    users:  !users ? [] : prepareUser(users) as User[]
  };
}

export function prepareTransaction(transaction: any | any[]): Transaction | Transaction[] {
  if (Array.isArray(transaction)) {
    return transaction.map(el => prepareTransaction(el) as Transaction);
  }

  const { title, description, createdAt: date, transaction_metas } = transaction.attributes;

  return {
    id: transaction.id,
    date: new Date(date).toLocaleString(),
    title,
    description,
    transactionMetas: !transaction_metas ? [] : prepareTransactionMeta(transaction_metas.data) as TransactionMeta[]
  };

}

export function prepareTransactionMeta(transactionMeta: any | any[]): TransactionMeta | TransactionMeta[] {
  if (Array.isArray(transactionMeta)) {
    return transactionMeta.map(el => prepareTransactionMeta(el) as TransactionMeta);
  }

  const { user_debtor: userDebtor, user_creditor: userCreditor, amount } = transactionMeta.attributes;

  return {
    userCreditor: prepareUser(userCreditor.data) as User,
    userDebtor: prepareUser(userDebtor.data) as User,
    amount
  }
}

export function prepareUser(user: any | any[]): User | User[] {
  if (Array.isArray(user)) {
    return user.map(el => prepareUser(el) as User)
  }

  // user could be a relation object wrapping the actual user
  if (user.attributes.user) {
    return prepareUser(user.attributes.user.data);
  }

  const { name = '', surname = '', username, email, role } = user.attributes;

  return {
    id: user.id,
    name,
    surname,
    username,
    email,
    role: prepareRole(role)
  } as User;
}

export function prepareRole(role: any): Role {
  return role?.data?.attributes?.name?.toLowerCase() || 'user';
}