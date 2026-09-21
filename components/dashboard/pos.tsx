'use client';

import { useMemo, useState } from 'react';
import { Minus, Plus, Search, SlidersHorizontal, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/dashboard-types';
import type { CartItem, MenuItem } from '@/lib/dashboard-types';

export function POS({
  setView,
  cart,
  setCart,
  menuList,
}: {
  setView: (view: string) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  menuList: MenuItem[];
}) {
  const [category, setCategory] = useState('All items');
  const [query, setQuery] = useState('');
  const categories = [
    'All items',
    'Starters',
    'Main Course',
    'Beverages',
    'Desserts',
  ];
  const filtered = menuList.filter(
    (item) =>
      item.available &&
      (category === 'All items' || item.category === category) &&
      item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const total = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0),
    [cart],
  );

  function addItem(item: MenuItem) {
    setCart(
      cart.some((entry) => entry.id === item.id)
        ? cart.map((entry) =>
            entry.id === item.id
              ? { ...entry, quantity: (entry.quantity || 0) + 1 }
              : entry,
          )
        : [...cart, { ...item, quantity: 1 }],
    );
  }

  function changeQuantity(id: number, amount: number) {
    setCart(
      cart.flatMap((item) =>
        item.id === id
          ? (item.quantity || 0) + amount > 0
            ? [{ ...item, quantity: (item.quantity || 0) + amount }]
            : []
          : [item],
      ),
    );
  }

  function sendToBilling() {
    setView('Billing');
  }

  return (
    <div className="grid min-h-[calc(100vh-142px)] gap-6 xl:grid-cols-[1fr_380px]">
      <section className="min-w-0">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#3a3020]">Build an order</h2>
            <p className="mt-1 text-xs text-[#8a7f6c]">
              Select items to add them to the current order
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#a89c85]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search menu..."
                className="h-10 w-full rounded-xl border border-[#e3dcc8] bg-[#fffdf7] pl-9 pr-3 text-sm outline-none ring-[#6b7f3f] focus:ring-2"
              />
            </div>
            <button
              className="grid size-10 place-items-center rounded-xl border border-[#e3dcc8] bg-[#fffdf7] text-[#8a7f6c]"
              aria-label="Filter menu"
            >
              <SlidersHorizontal className="size-4" />
            </button>
          </div>
        </div>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={cn(
                'whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold',
                category === item
                  ? 'bg-[#4f5e2e] text-white'
                  : 'border border-[#e3dcc8] bg-[#fffdf7] text-[#8a7f6c] hover:text-[#3a3020]',
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => addItem(item)}
              className="group flex min-h-40 flex-col justify-between rounded-2xl border border-[#e3dcc8]/80 bg-[#fffdf7] p-4 text-left shadow-sm shadow-[#e3dcc8]/20 transition hover:-translate-y-0.5 hover:border-[#a8b87a] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    'grid size-11 place-items-center rounded-xl text-sm font-bold',
                    item.color,
                  )}
                >
                  <Utensils className="size-5" />
                </div>
                <span className="rounded-full bg-[#f7f2e6] px-2 py-1 text-[9px] font-semibold text-[#a89c85]">
                  {item.tag}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#3a3020]">{item.name}</p>
                <p className="mt-0.5 text-xs text-[#8a7f6c]">{item.category}</p>
              </div>
              <p className="text-lg font-bold text-[#3a3020]">
                {formatCurrency(item.price)}
              </p>
            </button>
          ))}
        </div>
      </section>
      <aside className="rounded-2xl border border-[#e3dcc8]/80 bg-[#fffdf7] shadow-sm shadow-[#e3dcc8]/30 flex flex-col">
        <div className="border-b border-[#ede6d4] px-5 py-4">
          <h3 className="font-semibold text-[#3a3020]">Order summary</h3>
          <p className="mt-1 text-xs text-[#8a7f6c]">{cart.length} items</p>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-lg bg-[#f7f2e6] p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-semibold text-[#4a4030]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#8a7f6c]">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-[#fffdf7] border border-[#e3dcc8]">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    className="p-1 hover:bg-[#ede6d4]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-semibold text-[#5c5240]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    className="p-1 hover:bg-[#ede6d4]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-[#8a7f6c] py-8">
              No items added yet
            </p>
          )}
        </div>
        <div className="border-t border-[#ede6d4] space-y-3 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#6b6152]">Total</p>
            <p className="text-2xl font-bold text-[#55672f]">
              {formatCurrency(total)}
            </p>
          </div>
          <button
            onClick={sendToBilling}
            disabled={cart.length === 0}
            className="w-full rounded-xl bg-[#4f5e2e] py-3 text-sm font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-[#5f7239] active:scale-95"
          >
            Send to billing
          </button>
        </div>
      </aside>
    </div>
  );
}
