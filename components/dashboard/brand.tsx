import { Utensils } from 'lucide-react'

export function Brand() {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="grid size-10 place-items-center rounded-xl bg-[#6b7f3f] text-white shadow-lg shadow-[#242b18]/20">
        <Utensils className="size-5" />
      </div>
      <div>
        <p className="text-lg font-bold tracking-tight text-white">bill<span className="text-[#84964f]">u</span>u</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a89c85]">Restaurant POS</p>
      </div>
    </div>
  )
}
