export {}

declare global {
  interface Transaction {
    id: number,
    date: string,
    title?: string,
    description?: string,
    group?: number
    transactionMetas: TransactionMeta[]
  }

  interface TransactionMeta {
    userDebtor: User,
    userCreditor: User,
    amount: number,
  }

  interface Group {
    id: number,
    name: string,
    users: User[],
    transactions: Transaction[]
  }

  interface User {
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    password?: string,
    enabled?: boolean,
    role: Role,
  }

  type Role = 'user' | 'admin'

  interface Menu {
    label: string,
    items: Array<MenuItem>
  }

  interface MenuItem {
    label?: string,
    href?: string,
    icon?: string
  }
}