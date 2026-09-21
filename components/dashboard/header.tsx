import { Bell, LogOut, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { roleProfiles } from '@/lib/dashboard-data'
import type { Role } from '@/lib/dashboard-types'

export function Header({ view, onMenu, role, onLogout }: { view: string; onMenu: () => void; role: Role; onLogout: () => void }) {
  const profile = roleProfiles[role]
  const roleColors: Record<string, string> = { Admin: 'bg-red-100 text-red-700', Manager: 'bg-blue-100 text-blue-700', Staff: 'bg-amber-100 text-amber-700' }
  return (
    <header className="flex items-center justify-between border-b border-[#e3dcc8]/80 bg-[#fffdf7] px-5 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-[#6b6152] hover:bg-[#ede6d4] lg:hidden" onClick={onMenu} aria-label="Open navigation"><Menu className="size-5" /></button>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#3a3020]">{view === 'Overview' ? `Good afternoon, ${profile.name.split(' ')[0]}` : view}</h1>
          <p className="mt-0.5 text-xs text-[#8a7f6c]">Tuesday, September 18, 2026 <span className="mx-1">·</span> <span className="text-[#55672f]">Store is open</span></p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-xl border border-[#e3dcc8] p-2.5 text-[#8a7f6c] hover:bg-[#f7f2e6]" aria-label="Notifications"><Bell className="size-[18px]" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" /></button>
        <div className="hidden h-8 w-px bg-[#e3dcc8] sm:block" />
        <div className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-full bg-[#e3dcc8] text-xs font-bold text-[#5c5240]">{profile.initials}</div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-[#4a4030]">{profile.name}</p>
            <span className={cn('inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold', roleColors[role] || 'bg-[#ede6d4] text-[#5c5240]')}>{role}</span>
          </div>
          <button onClick={onLogout} className="ml-2 rounded-lg p-1 text-[#8a7f6c] hover:bg-[#ede6d4] hover:text-[#5c5240]" aria-label="Sign out"><LogOut className="size-4" /></button>
        </div>
      </div>
    </header>
  )
}
