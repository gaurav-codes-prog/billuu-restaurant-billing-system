export type Role = 'Admin' | 'Manager' | 'Staff'

export type MenuItem = {
  id: number
  name: string
  category: string
  price: number
  tag: string
  color: string
  available: boolean
}

export type CartItem = MenuItem & { quantity: number }

export type BillingRecord = {
  invoiceNum: string
  date: string
  amount: number
  status: string
  statusColor: string
}

const formatINR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
export const formatCurrency = (amount: number) => formatINR.format(amount)
