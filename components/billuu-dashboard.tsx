'use client'

import { useState } from 'react'
import { Package } from 'lucide-react'
import { menuItems, mockBillingHistory } from '@/lib/dashboard-data'
import type { BillingRecord, CartItem, MenuItem } from '@/lib/dashboard-types'
import { Login } from './dashboard/login'
import { Sidebar } from './dashboard/sidebar'
import { Header } from './dashboard/header'
import { Dashboard } from './dashboard/overview'
import { POS } from './dashboard/pos'
import { Billing } from './dashboard/billing'
import { MenuManagement } from './dashboard/menu-management'
import { Reports } from './dashboard/reports'
import { UsersManagement } from './dashboard/users-management'

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
    <div className="min-h-screen bg-[#f5efe0] text-[#3a3020]">
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
              <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-[#c9bfa8] bg-[#fffdf7] text-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-[#f2f0e0] text-[#55672f]">
                  <Package className="size-6" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-[#3a3020]">{view} workspace</h2>
                <p className="mt-1 max-w-sm text-sm text-[#8a7f6c]">This section is ready for API data and workflows. Start a new order to explore the core POS flow.</p>
                <button onClick={() => setView('New order')} className="mt-5 rounded-xl bg-[#4f5e2e] px-4 py-3 text-sm font-bold text-white">
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
