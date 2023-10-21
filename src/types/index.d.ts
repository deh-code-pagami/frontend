export {}

declare global {
  interface Transaction {
    id: number,
    fromUser: string,
    toUser: string,
    amount: number,
    date: string
  }

  interface User {
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    password?: string,
    enabled?: string,
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