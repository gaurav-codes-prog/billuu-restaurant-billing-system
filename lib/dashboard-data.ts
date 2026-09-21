import {
  BarChart3,
  LayoutDashboard,
  ReceiptText,
  ShoppingBag,
  Users,
  Utensils,
} from 'lucide-react'
import type { BillingRecord, MenuItem, Role } from './dashboard-types'

export const menuItems: MenuItem[] = [
  { id: 1, name: 'Truffle Mushroom Pasta', category: 'Main Course', price: 480, tag: 'Popular', color: 'bg-amber-100 text-amber-800', available: true },
  { id: 2, name: 'Classic Cheeseburger', category: 'Main Course', price: 420, tag: 'Popular', color: 'bg-rose-100 text-rose-800', available: true },
  { id: 3, name: 'Grilled Chicken Salad', category: 'Main Course', price: 390, tag: 'Healthy', color: 'bg-emerald-100 text-emerald-800', available: true },
  { id: 4, name: 'Margherita Pizza', category: 'Main Course', price: 450, tag: 'Popular', color: 'bg-orange-100 text-orange-800', available: true },
  { id: 5, name: 'Crispy Calamari', category: 'Starters', price: 320, tag: 'New', color: 'bg-sky-100 text-sky-800', available: true },
  { id: 6, name: 'Garlic Butter Prawns', category: 'Starters', price: 520, tag: 'Chef pick', color: 'bg-violet-100 text-violet-800', available: true },
  { id: 7, name: 'Iced Matcha Latte', category: 'Beverages', price: 180, tag: 'Cold', color: 'bg-lime-100 text-lime-800', available: true },
  { id: 8, name: 'Sparkling Lemonade', category: 'Beverages', price: 140, tag: 'Cold', color: 'bg-yellow-100 text-yellow-800', available: true },
  { id: 9, name: 'Basque Cheesecake', category: 'Desserts', price: 260, tag: 'Popular', color: 'bg-pink-100 text-pink-800', available: true },
]

export const activeOrders = [
  { table: 'Table 08', id: '#1048', status: 'Preparing', amount: 4840, time: '12:42 PM', color: 'bg-amber-100 text-amber-700' },
  { table: 'Table 03', id: '#1047', status: 'Ready to serve', amount: 7600, time: '12:37 PM', color: 'bg-emerald-100 text-emerald-700' },
  { table: 'Takeaway', id: '#1046', status: 'New order', amount: 3250, time: '12:31 PM', color: 'bg-sky-100 text-sky-700' },
]

export const mockBillingHistory: BillingRecord[] = [
  { invoiceNum: 'INV-2024-001', date: 'Sep 18, 2:45 PM', amount: 4840, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
  { invoiceNum: 'INV-2024-002', date: 'Sep 18, 2:30 PM', amount: 7600, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
  { invoiceNum: 'INV-2024-003', date: 'Sep 18, 2:15 PM', amount: 3250, status: 'Pending', statusColor: 'bg-amber-100 text-amber-700' },
  { invoiceNum: 'INV-2024-004', date: 'Sep 18, 1:55 PM', amount: 9220, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
  { invoiceNum: 'INV-2024-005', date: 'Sep 17, 11:30 PM', amount: 5575, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
]

export const navItems = [
  { label: 'Overview', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Staff'] },
  { label: 'New order', icon: ShoppingBag, roles: ['Admin', 'Manager', 'Staff'] },
  { label: 'Billing', icon: ReceiptText, roles: ['Admin', 'Manager', 'Staff'] },
  { label: 'Menu', icon: Utensils, roles: ['Admin'], admin: true },
  { label: 'Reports', icon: BarChart3, roles: ['Admin', 'Manager'] },
  { label: 'Users', icon: Users, roles: ['Admin'], admin: true },
]

export const roleProfiles: Record<Role, { name: string; initials: string; email: string }> = {
  Admin: { name: 'Aarav Mehta', initials: 'AM', email: 'admin@billuu.com' },
  Manager: { name: 'Maya Kapoor', initials: 'MK', email: 'manager@billuu.com' },
  Staff: { name: 'Sahil Verma', initials: 'SV', email: 'staff@billuu.com' },
}

export const reportDatasets = {
  Today: [{ day: '12 AM', value: 12000 }, { day: '6 AM', value: 28000 }, { day: '12 PM', value: 64000 }, { day: '6 PM', value: 92000 }],
  'Last 7 days': [{ day: 'Thu', value: 42000 }, { day: 'Fri', value: 56000 }, { day: 'Sat', value: 74000 }, { day: 'Sun', value: 62000 }, { day: 'Mon', value: 48000 }, { day: 'Tue', value: 68000 }, { day: 'Wed', value: 84000 }],
  'Last 30 days': [{ day: 'W1', value: 218000 }, { day: 'W2', value: 264000 }, { day: 'W3', value: 298000 }, { day: 'W4', value: 346000 }, { day: 'W5', value: 184000 }],
}
