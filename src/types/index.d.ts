export {}

declare global {
  interface Transaction {
    id: number,
    userDebtor: string,
    userCreditor: string,
    amount: number,
    date: string,
    title?: string,
    description?: string
  }

  interface Group {
    id: number,
    name: string,
  }

  interface User {
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    enabled: boolean,
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