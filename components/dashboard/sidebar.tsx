import { Settings, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/dashboard-data'
import { Brand } from './brand'

export function Sidebar({ view, setView, mobileOpen, setMobileOpen, role }: { view: string; setView: (view: string) => void; mobileOpen: boolean; setMobileOpen: (value: boolean) => void; role: 'Admin' | 'Manager' | 'Staff' }) {
  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))
  return (
    <aside className={cn('fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#2e3524] px-4 py-6 text-[#c9bfa8] transition-transform lg:static lg:translate-x-0', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
      <div className="mb-10 flex items-center justify-between"><Brand /><button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-[#a89c85] lg:hidden" aria-label="Close navigation"><X className="size-5" /></button></div>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a7f6c]">Workspace</p>
      <nav className="flex flex-col gap-1">
        {filteredNavItems.filter((item) => !item.admin).map(({ label, icon: Icon }) => (
          <button key={label} onClick={() => { setView(label === 'Overview' ? 'Overview' : label); setMobileOpen(false) }} className={cn('flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors', view === (label === 'Overview' ? 'Overview' : label) ? 'bg-[#6b7f3f]/15 text-[#a8b87a]' : 'text-[#a89c85] hover:bg-[#fffdf7]/5 hover:text-white')}>
            <Icon className="size-[18px]" />
            {label}
            {label === 'New order' && <span className="ml-auto rounded-md bg-[#84964f]/20 px-1.5 py-0.5 text-[10px] text-[#a8b87a]">⌘N</span>}
          </button>
        ))}
      </nav>
      {filteredNavItems.some((item) => item.admin) && (
        <>
          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a7f6c]">Management</p>
          <nav className="flex flex-col gap-1">
            {filteredNavItems.filter((item) => item.admin).map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => setView(label)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-[#a89c85] hover:bg-[#fffdf7]/5 hover:text-white">
                <Icon className="size-[18px]" />
                {label}
              </button>
            ))}
          </nav>
        </>
      )}
      <div className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-4"><button className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-[#a89c85] hover:bg-[#fffdf7]/5 hover:text-white"><Settings className="size-[18px]" />Settings</button></div>
    </aside>
  )
}
