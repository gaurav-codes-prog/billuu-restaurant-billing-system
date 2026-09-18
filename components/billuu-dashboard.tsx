'use client'

import { useMemo, useState } from 'react'
import {
  BarChart3,
  Bell,
  Clock3,
  Coffee,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Minus,
  MoreHorizontal,
  Package,
  Plus,
  Printer,
  ReceiptText,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Utensils,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Role = 'Admin' | 'Manager' | 'Staff'
type MenuItem = { id: number; name: string; category: string; price: number; tag: string; color: string; available: boolean }
export type CartItem = MenuItem & { quantity: number }
type BillingRecord = { invoiceNum: string; date: string; amount: number; status: string; statusColor: string }

const formatINR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
const formatCurrency = (amount: number) => formatINR.format(amount)

const menuItems: MenuItem[] = [
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

const activeOrders = [
  { table: 'Table 08', id: '#1048', status: 'Preparing', amount: 4840, time: '12:42 PM', color: 'bg-amber-100 text-amber-700' },
  { table: 'Table 03', id: '#1047', status: 'Ready to serve', amount: 7600, time: '12:37 PM', color: 'bg-emerald-100 text-emerald-700' },
  { table: 'Takeaway', id: '#1046', status: 'New order', amount: 3250, time: '12:31 PM', color: 'bg-sky-100 text-sky-700' },
]

const mockBillingHistory: BillingRecord[] = [
  { invoiceNum: 'INV-2024-001', date: 'Sep 18, 2:45 PM', amount: 4840, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
  { invoiceNum: 'INV-2024-002', date: 'Sep 18, 2:30 PM', amount: 7600, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
  { invoiceNum: 'INV-2024-003', date: 'Sep 18, 2:15 PM', amount: 3250, status: 'Pending', statusColor: 'bg-amber-100 text-amber-700' },
  { invoiceNum: 'INV-2024-004', date: 'Sep 18, 1:55 PM', amount: 9220, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
  { invoiceNum: 'INV-2024-005', date: 'Sep 17, 11:30 PM', amount: 5575, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Staff'] },
  { label: 'New order', icon: ShoppingBag, roles: ['Admin', 'Manager', 'Staff'] },
  { label: 'Billing', icon: ReceiptText, roles: ['Admin', 'Manager', 'Staff'] },
  { label: 'Menu', icon: Utensils, roles: ['Admin'], admin: true },
  { label: 'Reports', icon: BarChart3, roles: ['Admin', 'Manager'] },
  { label: 'Users', icon: Users, roles: ['Admin'], admin: true },
]

function Brand() {
  return <div className="flex items-center gap-3 px-2"><div className="grid size-10 place-items-center rounded-xl bg-teal-500 text-white shadow-lg shadow-teal-950/20"><Utensils className="size-5" /></div><div><p className="text-lg font-bold tracking-tight text-white">bill<span className="text-teal-400">u</span>u</p><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Restaurant POS</p></div></div>
}

function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>('Staff')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!email.trim() || !password) return setError('Enter your email and password to continue.')
    // Mock credentials until a real authentication backend is connected.
    const credentials: Record<Role, { email: string; password: string }> = {
      Admin: { email: 'admin@billuu.com', password: 'admin123' },
      Manager: { email: 'manager@billuu.com', password: 'manager123' },
      Staff: { email: 'staff@billuu.com', password: 'staff123' },
    }
    if (credentials[selectedRole].email !== email.trim().toLowerCase() || credentials[selectedRole].password !== password) {
      return setError('Those credentials do not match the selected role.')
    }
    setError(''); setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    onLogin(selectedRole)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50">
        <div className="mb-8 flex justify-center"><div className="grid size-16 place-items-center rounded-2xl bg-teal-500 text-white shadow-lg shadow-teal-950/20"><Utensils className="size-8" /></div></div>
        <h1 className="text-center text-2xl font-bold text-slate-900">Billuu</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Restaurant Billing System</p>
        <div className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="username" placeholder="you@billuu.com" className="h-11 rounded-xl border border-slate-200 px-3 font-normal outline-none ring-teal-500 focus:ring-2" /></label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">Password<div className="relative"><input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter password" className="h-11 w-full rounded-xl border border-slate-200 px-3 pr-16 font-normal outline-none ring-teal-500 focus:ring-2" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-teal-600">{showPassword ? 'Hide' : 'Show'}</button></div></label>
          <div className="flex flex-col gap-3"><p className="text-sm font-semibold text-slate-700">Select your role</p><div className="flex flex-col gap-2">{(['Admin', 'Manager', 'Staff'] as const).map((role) => <button key={role} type="button" onClick={() => setSelectedRole(role)} className={cn('rounded-xl px-4 py-3 text-sm font-semibold transition-all', selectedRole === role ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30' : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50')}>{role}</button>)}</div></div>
          {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p>}
        </div>
        <button disabled={loading} onClick={submit} className="mt-8 w-full rounded-xl bg-[#183b4d] py-3 text-sm font-bold text-white transition hover:bg-[#1e4a5a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Signing in…' : `Sign in as ${selectedRole}`}</button>
      </div>
    </div>
  )
}

function Sidebar({ view, setView, mobileOpen, setMobileOpen, role }: { view: string; setView: (view: string) => void; mobileOpen: boolean; setMobileOpen: (value: boolean) => void; role: 'Admin' | 'Manager' | 'Staff' }) {
  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))
  return (
    <aside className={cn('fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#142b3a] px-4 py-6 text-slate-300 transition-transform lg:static lg:translate-x-0', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
      <div className="mb-10 flex items-center justify-between"><Brand /><button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-400 lg:hidden" aria-label="Close navigation"><X className="size-5" /></button></div>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
      <nav className="flex flex-col gap-1">
        {filteredNavItems.filter((item) => !item.admin).map(({ label, icon: Icon }) => (
          <button key={label} onClick={() => { setView(label === 'Overview' ? 'Overview' : label); setMobileOpen(false) }} className={cn('flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors', view === (label === 'Overview' ? 'Overview' : label) ? 'bg-teal-500/15 text-teal-300' : 'text-slate-400 hover:bg-white/5 hover:text-white')}>
            <Icon className="size-[18px]" />
            {label}
            {label === 'New order' && <span className="ml-auto rounded-md bg-teal-400/20 px-1.5 py-0.5 text-[10px] text-teal-300">⌘N</span>}
          </button>
        ))}
      </nav>
      {filteredNavItems.some((item) => item.admin) && (
        <>
          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Management</p>
          <nav className="flex flex-col gap-1">
            {filteredNavItems.filter((item) => item.admin).map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => setView(label)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white">
                <Icon className="size-[18px]" />
                {label}
              </button>
            ))}
          </nav>
        </>
      )}
      <div className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-4"><button className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white"><Settings className="size-[18px]" />Settings</button></div>
    </aside>
  )
}

function Header({ view, onMenu, role, onLogout }: { view: string; onMenu: () => void; role: Role; onLogout: () => void }) {
  const profile = roleProfiles[role]
  const roleColors: Record<string, string> = { Admin: 'bg-red-100 text-red-700', Manager: 'bg-blue-100 text-blue-700', Staff: 'bg-amber-100 text-amber-700' }
  return (
    <header className="flex items-center justify-between border-b border-slate-200/80 bg-white px-5 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={onMenu} aria-label="Open navigation"><Menu className="size-5" /></button>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">{view === 'Overview' ? `Good afternoon, ${profile.name.split(' ')[0]}` : view}</h1>
          <p className="mt-0.5 text-xs text-slate-500">Tuesday, September 18, 2026 <span className="mx-1">·</span> <span className="text-teal-600">Store is open</span></p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50" aria-label="Notifications"><Bell className="size-[18px]" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" /></button>
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />
        <div className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">{profile.initials}</div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-slate-800">{profile.name}</p>
            <span className={cn('inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold', roleColors[role] || 'bg-slate-100 text-slate-700')}>{role}</span>
          </div>
          <button onClick={onLogout} className="ml-2 rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="Sign out"><LogOut className="size-4" /></button>
        </div>
      </div>
    </header>
  )
}

function StatCard({ label, value, change, icon: Icon, tone }: { label: string; value: string; change: string; icon: typeof WalletCards; tone: string }) {
  return <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p></div><div className={cn('grid size-10 place-items-center rounded-xl', tone)}><Icon className="size-[18px]" /></div></div><p className="mt-4 text-xs font-medium text-emerald-600">{change} <span className="font-normal text-slate-400">vs yesterday</span></p></div>
}

function Dashboard({ setView }: { setView: (view: string) => void }) {
  return <div className="flex flex-col gap-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Today&apos;s revenue" value="₹2,84,050" change="↑ 12.8%" icon={WalletCards} tone="bg-teal-50 text-teal-600" /><StatCard label="Orders today" value="84" change="↑ 8.2%" icon={ReceiptText} tone="bg-sky-50 text-sky-600" /><StatCard label="Average order" value="₹3,382" change="↑ 4.6%" icon={CreditCard} tone="bg-violet-50 text-violet-600" /><StatCard label="Open tables" value="12 / 28" change="6 available" icon={Coffee} tone="bg-amber-50 text-amber-600" /></div><div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]"><section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-semibold text-slate-900">Active orders</h2><p className="mt-1 text-xs text-slate-500">Orders that need attention</p></div><button onClick={() => setView('Billing')} className="text-xs font-semibold text-teal-600 hover:text-teal-700">View all <span aria-hidden="true">→</span></button></div><div className="flex flex-col">{activeOrders.map((order) => <div key={order.id} className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-0"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500"><ShoppingBag className="size-4" /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-sm font-semibold text-slate-800">{order.table}</p><span className="text-[11px] text-slate-400">{order.id}</span></div><p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Clock3 className="size-3" />{order.time}</p></div><span className={cn('hidden rounded-full px-2.5 py-1 text-[10px] font-semibold sm:inline-flex', order.color)}>{order.status}</span><p className="text-sm font-bold text-slate-800">{formatCurrency(order.amount)}</p><button className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"><MoreHorizontal className="size-4" /></button></div>)}</div></section><section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-900">Revenue by category</h2><p className="mt-1 text-xs text-slate-500">This month&apos;s performance</p></div><div className="space-y-3 p-5"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-teal-500" /><p className="text-xs font-medium text-slate-700">Mains & Plates</p></div><p className="text-xs font-semibold text-slate-800">45%</p></div><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-sky-500" /><p className="text-xs font-medium text-slate-700">Beverages</p></div><p className="text-xs font-semibold text-slate-800">28%</p></div><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-violet-500" /><p className="text-xs font-medium text-slate-700">Starters</p></div><p className="text-xs font-semibold text-slate-800">18%</p></div><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-amber-500" /><p className="text-xs font-medium text-slate-700">Desserts</p></div><p className="text-xs font-semibold text-slate-800">9%</p></div></div></section></div></div>
}

function Billing({ cart, setCart, history, setHistory, menuList }: { cart: CartItem[]; setCart: (cart: CartItem[]) => void; history: BillingRecord[]; setHistory: (history: BillingRecord[]) => void; menuList: MenuItem[] }) {
  const [showPrintPreview, setShowPrintPreview] = useState(false)
  const [discount, setDiscount] = useState(0)
  const billableCart = cart.filter((item) => menuList.some((menuItem) => menuItem.id === item.id))
  const subtotal = useMemo(() => billableCart.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0), [billableCart])
  const tax = subtotal * 0.08
  const total = subtotal + tax - discount
  const invoiceNum = `INV-2024-${String(history.length + 1).padStart(3, '0')}`
  
  return (
    <div className="flex flex-col gap-6">
      {/* Invoice Card */}
      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Current Invoice</h2>
            <p className="mt-1 text-xs text-slate-500">{invoiceNum}</p>
          </div>
          <button onClick={() => setShowPrintPreview(true)} className="inline-flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-600 hover:bg-teal-100">
            <Printer className="size-4" />
            Generate Invoice
          </button>
        </div>
        <div className="space-y-3 border-b border-slate-200 pb-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-slate-800">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No items in current invoice</p>
          )}
        </div>
        <div className="space-y-2 py-4">
          <div className="flex items-center justify-between text-sm"><p className="text-slate-600">Subtotal</p><p className="font-medium text-slate-800">{formatCurrency(subtotal)}</p></div>
          <div className="flex items-center justify-between text-sm"><p className="text-slate-600">Tax (8%)</p><p className="font-medium text-slate-800">{formatCurrency(tax)}</p></div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Discount</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))} className="h-8 w-20 rounded-lg border border-slate-200 px-2 text-sm outline-none ring-teal-500 focus:ring-2" placeholder="0.00" />
            <span className="text-sm font-medium text-slate-500">₹</span>
          </div>
          <div className="border-t border-slate-200 pt-3"><div className="flex items-center justify-between"><p className="font-semibold text-slate-900">Grand Total</p><p className="text-2xl font-bold text-teal-600">{formatCurrency(total)}</p></div></div>
        </div>
      </section>

      {/* Print Preview Modal */}
      {showPrintPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl p-8">
            {/* Invoice Print Layout */}
            <div className="text-center mb-6">
              <p className="text-2xl font-bold text-slate-900">Billuu</p>
              <p className="text-xs text-slate-500 mt-1">Restaurant Billing System</p>
            </div>
            <div className="border-t border-slate-200 pt-4 space-y-3 text-center text-xs">
              <p className="font-semibold text-slate-900">{invoiceNum}</p>
              <p className="text-slate-500">September 18, 2026</p>
            </div>
            <div className="border-t border-slate-200 my-4 pt-4 space-y-2 text-xs">
              {billableCart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-slate-700">{item.name} x{item.quantity}</span>
                  <span className="font-medium text-slate-800">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-slate-600"><span>Tax (8%)</span><span>{formatCurrency(tax)}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
              <div className="flex justify-between font-bold text-slate-900 text-sm border-t border-slate-200 pt-2"><span>Total</span><span>{formatCurrency(total)}</span></div>
            </div>
            <div className="mt-6 flex gap-2">
              <button onClick={() => window.print()} className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200">Print</button>
              <button onClick={() => { if (cart.length) setHistory([...history, { invoiceNum, date: 'Sep 18, 2026', amount: total, status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' }]); setCart([]); setShowPrintPreview(false) }} className="flex-1 rounded-lg bg-teal-500 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-600">Mark paid</button>
            </div>
          </div>
        </div>
      )}

      {/* Billing History */}
      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30 overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-900">Billing History</h2>
          <p className="mt-1 text-xs text-slate-500">Past invoices and transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Invoice</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Date</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Amount</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record.invoiceNum} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4"><p className="font-medium text-slate-800">{record.invoiceNum}</p></td>
                  <td className="px-6 py-4"><p className="text-slate-600">{record.date}</p></td>
                  <td className="px-6 py-4"><p className="font-semibold text-slate-800">{formatCurrency(record.amount)}</p></td>
                  <td className="px-6 py-4"><span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-semibold', record.statusColor)}>{record.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function POS({ setView, cart, setCart, menuList }: { setView: (view: string) => void; cart: CartItem[]; setCart: (cart: CartItem[]) => void; menuList: MenuItem[] }) {
  const [category, setCategory] = useState('All items')
  const [query, setQuery] = useState('')
  const categories = ['All items', 'Starters', 'Main Course', 'Beverages', 'Desserts']
  const filtered = menuList.filter((item) => item.available && (category === 'All items' || item.category === category) && item.name.toLowerCase().includes(query.toLowerCase()))
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0), [cart])
  
  function addItem(item: MenuItem) {
    setCart(
      cart.some((entry) => entry.id === item.id)
        ? cart.map((entry) => entry.id === item.id ? { ...entry, quantity: (entry.quantity || 0) + 1 } : entry)
        : [...cart, { ...item, quantity: 1 }]
    )
  }
  
  function changeQuantity(id: number, amount: number) {
    setCart(
      cart.flatMap((item) =>
        item.id === id
          ? (item.quantity || 0) + amount > 0
            ? [{ ...item, quantity: (item.quantity || 0) + amount }]
            : []
          : [item]
      )
    )
  }
  
  function sendToBilling() {
    setView('Billing')
  }
  
  return (
    <div className="grid min-h-[calc(100vh-142px)] gap-6 xl:grid-cols-[1fr_380px]">
      <section className="min-w-0">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Build an order</h2>
            <p className="mt-1 text-xs text-slate-500">Select items to add them to the current order</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search menu..." className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none ring-teal-500 focus:ring-2" />
            </div>
            <button className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Filter menu"><SlidersHorizontal className="size-4" /></button>
          </div>
        </div>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={cn('whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold', category === item ? 'bg-[#183b4d] text-white' : 'border border-slate-200 bg-white text-slate-500 hover:text-slate-900')}>
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((item) => (
            <button key={item.id} onClick={() => addItem(item)} className="group flex min-h-40 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm shadow-slate-200/20 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className={cn('grid size-11 place-items-center rounded-xl text-sm font-bold', item.color)}>
                  <Utensils className="size-5" />
                </div>
                <span className="rounded-full bg-slate-50 px-2 py-1 text-[9px] font-semibold text-slate-400">{item.tag}</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{item.category}</p>
              </div>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(item.price)}</p>
            </button>
          ))}
        </div>
      </section>
      <aside className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30 flex flex-col">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="font-semibold text-slate-900">Order summary</h3>
          <p className="mt-1 text-xs text-slate-500">{cart.length} items</p>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-2 rounded-lg bg-slate-50 p-3">
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-white border border-slate-200">
                  <button onClick={() => changeQuantity(item.id, -1)} className="p-1 hover:bg-slate-100" aria-label="Decrease quantity">
                    <Minus className="size-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-semibold text-slate-700">{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, 1)} className="p-1 hover:bg-slate-100" aria-label="Increase quantity">
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-slate-500 py-8">No items added yet</p>
          )}
        </div>
        <div className="border-t border-slate-100 space-y-3 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Total</p>
            <p className="text-2xl font-bold text-teal-600">{formatCurrency(total)}</p>
          </div>
          <button onClick={sendToBilling} disabled={cart.length === 0} className="w-full rounded-xl bg-[#183b4d] py-3 text-sm font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-[#1e4a5a] active:scale-95">
            Send to billing
          </button>
        </div>
      </aside>
    </div>
  )
}

const roleProfiles: Record<Role, { name: string; initials: string; email: string }> = {
  Admin: { name: 'Aarav Mehta', initials: 'AM', email: 'admin@billuu.com' },
  Manager: { name: 'Maya Kapoor', initials: 'MK', email: 'manager@billuu.com' },
  Staff: { name: 'Sahil Verma', initials: 'SV', email: 'staff@billuu.com' },
}

function MenuManagement({ items, setItems }: { items: MenuItem[]; setItems: (items: MenuItem[]) => void }) {
  const [editing, setEditing] = useState<MenuItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState({ name: '', category: 'Main Course', price: '' })
  const saveItem = () => {
    const name = draft.name.trim(); const price = Number(draft.price)
    if (!name || !price) return
    const item: MenuItem = { id: editing?.id ?? Date.now(), name, category: draft.category, price, tag: editing?.tag ?? 'New', color: editing?.color ?? 'bg-teal-100 text-teal-800', available: editing?.available ?? true }
    setItems(editing ? items.map((entry) => entry.id === editing.id ? { ...entry, ...item } : entry) : [...items, item])
    setEditing(null); setShowForm(false); setDraft({ name: '', category: 'Main Course', price: '' })
  }
  return <div className="flex flex-col gap-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Menu management</h2><p className="mt-1 text-sm text-slate-500">Keep your menu, prices, and availability up to date.</p></div><button onClick={() => setShowForm(true)} className="rounded-xl bg-[#183b4d] px-4 py-3 text-sm font-bold text-white">Add menu item</button></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><span className={cn('rounded-full px-2 py-1 text-[10px] font-bold', item.color)}>{item.tag}</span><h3 className="mt-3 font-semibold text-slate-900">{item.name}</h3><p className="mt-1 text-xs text-slate-500">{item.category}</p></div><p className="font-bold text-teal-600">{formatCurrency(item.price)}</p></div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><button onClick={() => setItems(items.map((entry) => entry.id === item.id ? { ...entry, available: !entry.available } : entry))} className={cn('rounded-full px-3 py-1.5 text-xs font-semibold', item.available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500')}>{item.available ? 'In stock' : 'Out of stock'}</button><div className="flex gap-2"><button onClick={() => { setEditing(item); setDraft({ name: item.name, category: item.category, price: String(item.price) }); setShowForm(true) }} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50">Edit</button><button onClick={() => setItems(items.filter((entry) => entry.id !== item.id))} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">Delete</button></div></div></article>)}</div>
    {showForm && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h3 className="font-bold text-slate-900">{editing ? 'Edit menu item' : 'Add menu item'}</h3><button onClick={() => setShowForm(false)} aria-label="Close" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="size-4" /></button></div><div className="mt-5 flex flex-col gap-3"><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Item name" className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-teal-500" /><select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="h-11 rounded-xl border border-slate-200 px-3 text-sm"><option>Main Course</option><option>Starters</option><option>Beverages</option><option>Desserts</option></select><input value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} type="number" min="1" placeholder="Price in INR" className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-teal-500" /><button onClick={saveItem} className="mt-2 rounded-xl bg-teal-500 py-3 text-sm font-bold text-white">Save item</button></div></div></div>}
  </div>
}

const reportDatasets = {
  Today: [{ day: '12 AM', value: 12000 }, { day: '6 AM', value: 28000 }, { day: '12 PM', value: 64000 }, { day: '6 PM', value: 92000 }],
  'Last 7 days': [{ day: 'Thu', value: 42000 }, { day: 'Fri', value: 56000 }, { day: 'Sat', value: 74000 }, { day: 'Sun', value: 62000 }, { day: 'Mon', value: 48000 }, { day: 'Tue', value: 68000 }, { day: 'Wed', value: 84000 }],
  'Last 30 days': [{ day: 'W1', value: 218000 }, { day: 'W2', value: 264000 }, { day: 'W3', value: 298000 }, { day: 'W4', value: 346000 }, { day: 'W5', value: 184000 }],
}
function Reports() {
  const [range, setRange] = useState<keyof typeof reportDatasets>('Last 7 days')
  const reportDays = reportDatasets[range]
  const revenue = reportDays.reduce((sum, day) => sum + day.value, 0)
  const max = Math.max(...reportDays.map((day) => day.value))
  return <div className="flex flex-col gap-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Sales reports</h2><p className="mt-1 text-sm text-slate-500">Track revenue trends and best-performing dishes.</p></div><select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700"><option>Today</option><option>Last 7 days</option><option>Last 30 days</option></select></div><div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]"><section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h3 className="font-semibold text-slate-900">Revenue overview</h3><p className="mt-1 text-xs text-slate-500">{range} · Gross sales</p></div><p className="text-xl font-bold text-teal-600">{formatCurrency(revenue)}</p></div><div className="mt-8 flex h-56 items-end justify-between gap-3">{reportDays.map((day) => <div key={day.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="w-full max-w-12 rounded-t-lg bg-teal-400 transition hover:bg-teal-500" style={{ height: `${(day.value / max) * 82}%` }} title={formatCurrency(day.value)} /><span className="text-xs font-medium text-slate-500">{day.day}</span></div>)}</div></section><section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><h3 className="font-semibold text-slate-900">Top selling items</h3><p className="mt-1 text-xs text-slate-500">By units sold this period</p><div className="mt-5 flex flex-col gap-4">{[['Truffle Mushroom Pasta', 42], ['Classic Cheeseburger', 36], ['Iced Matcha Latte', 29], ['Garlic Butter Prawns', 24]].map(([name, count], index) => <div key={String(name)}><div className="flex justify-between text-sm"><span className="font-medium text-slate-700">{index + 1}. {name}</span><span className="font-bold text-slate-900">{count}</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-teal-400" style={{ width: `${Number(count) / 42 * 100}%` }} /></div></div>)}</div></section></div></div>
}

function UsersManagement() {
  const [users, setUsers] = useState([{ name: 'Maya Kapoor', email: 'manager@billuu.com', role: 'Manager', active: true }, { name: 'Sahil Verma', email: 'staff@billuu.com', role: 'Staff', active: true }, { name: 'Nisha Shah', email: 'nisha@billuu.com', role: 'Staff', active: false }])
  const [showForm, setShowForm] = useState(false); const [draft, setDraft] = useState({ name: '', email: '', role: 'Staff' })
  return <div className="flex flex-col gap-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">User management</h2><p className="mt-1 text-sm text-slate-500">Manage access to the Billuu workspace.</p></div><button onClick={() => setShowForm(true)} className="rounded-xl bg-[#183b4d] px-4 py-3 text-sm font-bold text-white">Add user</button></div><div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm"><table className="w-full min-w-[650px] text-left"><thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">Name</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Role</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Action</th></tr></thead><tbody>{users.map((user) => <tr key={user.email} className="border-b border-slate-100 last:border-0"><td className="px-5 py-4 text-sm font-semibold text-slate-800">{user.name}</td><td className="px-5 py-4 text-sm text-slate-500">{user.email}</td><td className="px-5 py-4"><span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">{user.role}</span></td><td className="px-5 py-4"><span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', user.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500')}>{user.active ? 'Active' : 'Inactive'}</span></td><td className="px-5 py-4"><button onClick={() => setUsers(users.map((entry) => entry.email === user.email ? { ...entry, active: !entry.active } : entry))} className="text-xs font-semibold text-teal-700">{user.active ? 'Deactivate' : 'Activate'}</button></td></tr>)}</tbody></table></div>{showForm && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h3 className="font-bold text-slate-900">Add new user</h3><button onClick={() => setShowForm(false)} aria-label="Close" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="size-4" /></button></div><div className="mt-5 flex flex-col gap-3"><input placeholder="Full name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="h-11 rounded-xl border border-slate-200 px-3 text-sm" /><input placeholder="Email address" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className="h-11 rounded-xl border border-slate-200 px-3 text-sm" /><select value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} className="h-11 rounded-xl border border-slate-200 px-3 text-sm"><option>Staff</option><option>Manager</option></select><button onClick={() => { if (!draft.name || !draft.email) return; setUsers([...users, { ...draft, active: true }]); setDraft({ name: '', email: '', role: 'Staff' }); setShowForm(false) }} className="mt-2 rounded-xl bg-teal-500 py-3 text-sm font-bold text-white">Create user</button></div></div></div>}</div>
}

export default function BilluuDashboard() {
  const [role, setRole] = useState<'Admin' | 'Manager' | 'Staff' | null>(null)
  const [view, setView] = useState('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuList, setMenuList] = useState<MenuItem[]>(menuItems)
  const [cart, setCart] = useState<CartItem[]>([{ ...menuItems[0], quantity: 1 }, { ...menuItems[6], quantity: 2 }])
  const [history, setHistory] = useState<BillingRecord[]>(mockBillingHistory)

  if (!role) {
    return <Login onLogin={(selectedRole) => setRole(selectedRole)} />
  }

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar view={view} setView={setView} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} role={role} />
        <div className="min-w-0 flex-1">
          <Header view={view} onMenu={() => setMobileOpen(true)} role={role} onLogout={() => setRole(null)} />
          <main className="mx-auto max-w-[1600px] p-5 md:p-8">
            {view === 'New order' ? (
              <POS setView={setView} cart={cart} setCart={setCart} menuList={menuList} />
            ) : view === 'Overview' ? (
              <Dashboard setView={setView} />
            ) : view === 'Billing' ? (
              <Billing cart={cart} setCart={setCart} history={history} setHistory={setHistory} menuList={menuList} />
            ) : view === 'Menu' ? (
              <MenuManagement items={menuList} setItems={setMenuList} />
            ) : view === 'Reports' ? (
              <Reports />
            ) : view === 'Users' ? (
              <UsersManagement />
            ) : (
              <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-teal-50 text-teal-600">
                  <Package className="size-6" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900">{view} workspace</h2>
                <p className="mt-1 max-w-sm text-sm text-slate-500">This section is ready for API data and workflows. Start a new order to explore the core POS flow.</p>
                <button onClick={() => setView('New order')} className="mt-5 rounded-xl bg-[#183b4d] px-4 py-3 text-sm font-bold text-white">
                  Open POS
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
