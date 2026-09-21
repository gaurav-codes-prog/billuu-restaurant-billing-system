'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/dashboard-types';
import type { MenuItem } from '@/lib/dashboard-types';

export function MenuManagement({
  items,
  setItems,
}: {
  items: MenuItem[];
  setItems: (items: MenuItem[]) => void;
}) {
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    name: '',
    category: 'Main Course',
    price: '',
  });
  const saveItem = () => {
    const name = draft.name.trim();
    const price = Number(draft.price);
    if (!name || !price) return;
    const item: MenuItem = {
      id: editing?.id ?? Date.now(),
      name,
      category: draft.category,
      price,
      tag: editing?.tag ?? 'New',
      color: editing?.color ?? 'bg-[#e8e6d0] text-[#3d4a1f]',
      available: editing?.available ?? true,
    };
    setItems(
      editing
        ? items.map((entry) =>
            entry.id === editing.id ? { ...entry, ...item } : entry,
          )
        : [...items, item],
    );
    setEditing(null);
    setShowForm(false);
    setDraft({ name: '', category: 'Main Course', price: '' });
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#3a3020]">Menu management</h2>
          <p className="mt-1 text-sm text-[#8a7f6c]">
            Keep your menu, prices, and availability up to date.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-xl bg-[#4f5e2e] px-4 py-3 text-sm font-bold text-white"
        >
          Add menu item
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-[#e3dcc8]/80 bg-[#fffdf7] p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span
                  className={cn(
                    'rounded-full px-2 py-1 text-[10px] font-bold',
                    item.color,
                  )}
                >
                  {item.tag}
                </span>
                <h3 className="mt-3 font-semibold text-[#3a3020]">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-[#8a7f6c]">{item.category}</p>
              </div>
              <p className="font-bold text-[#55672f]">
                {formatCurrency(item.price)}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[#ede6d4] pt-4">
              <button
                onClick={() =>
                  setItems(
                    items.map((entry) =>
                      entry.id === item.id
                        ? { ...entry, available: !entry.available }
                        : entry,
                    ),
                  )
                }
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold',
                  item.available
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-[#ede6d4] text-[#8a7f6c]',
                )}
              >
                {item.available ? 'In stock' : 'Out of stock'}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(item);
                    setDraft({
                      name: item.name,
                      category: item.category,
                      price: String(item.price),
                    });
                    setShowForm(true);
                  }}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#455227] hover:bg-[#f2f0e0]"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setItems(items.filter((entry) => entry.id !== item.id))
                  }
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#241f14]/30 p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#fffdf7] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#3a3020]">
                {editing ? 'Edit menu item' : 'Add menu item'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                aria-label="Close"
                className="rounded-lg p-2 text-[#8a7f6c] hover:bg-[#ede6d4]"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Item name"
                className="h-11 rounded-xl border border-[#e3dcc8] px-3 text-sm outline-none focus:ring-2 focus:ring-[#6b7f3f]"
              />
              <select
                value={draft.category}
                onChange={(e) =>
                  setDraft({ ...draft, category: e.target.value })
                }
                className="h-11 rounded-xl border border-[#e3dcc8] px-3 text-sm"
              >
                <option>Main Course</option>
                <option>Starters</option>
                <option>Beverages</option>
                <option>Desserts</option>
              </select>
              <input
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                type="number"
                min="1"
                placeholder="Price in INR"
                className="h-11 rounded-xl border border-[#e3dcc8] px-3 text-sm outline-none focus:ring-2 focus:ring-[#6b7f3f]"
              />
              <button
                onClick={saveItem}
                className="mt-2 rounded-xl bg-[#6b7f3f] py-3 text-sm font-bold text-white"
              >
                Save item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
