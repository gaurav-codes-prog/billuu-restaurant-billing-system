'use client';

import { useMemo, useState } from 'react';
import { Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/dashboard-types';
import type { BillingRecord, CartItem, MenuItem } from '@/lib/dashboard-types';

export function Billing({
  cart,
  setCart,
  history,
  setHistory,
  menuList,
}: {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  history: BillingRecord[];
  setHistory: (history: BillingRecord[]) => void;
  menuList: MenuItem[];
}) {
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [discount, setDiscount] = useState(0);
  const billableCart = cart.filter((item) =>
    menuList.some((menuItem) => menuItem.id === item.id),
  );
  const subtotal = useMemo(
    () =>
      billableCart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 0),
        0,
      ),
    [billableCart],
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax - discount;
  const invoiceNum = `INV-2024-${String(history.length + 1).padStart(3, '0')}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Invoice Card */}
      <section className="rounded-2xl border border-[#e3dcc8]/80 bg-[#fffdf7] shadow-sm shadow-[#e3dcc8]/30 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-[#3a3020]">Current Invoice</h2>
            <p className="mt-1 text-xs text-[#8a7f6c]">{invoiceNum}</p>
          </div>
          <button
            onClick={() => setShowPrintPreview(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#f2f0e0] px-3 py-2 text-xs font-semibold text-[#55672f] hover:bg-[#e8e6d0]"
          >
            <Printer className="size-4" />
            Generate Invoice
          </button>
        </div>
        <div className="space-y-3 border-b border-[#e3dcc8] pb-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium text-[#4a4030]">{item.name}</p>
                  <p className="text-xs text-[#8a7f6c]">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-[#4a4030]">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#8a7f6c]">
              No items in current invoice
            </p>
          )}
        </div>
        <div className="space-y-2 py-4">
          <div className="flex items-center justify-between text-sm">
            <p className="text-[#6b6152]">Subtotal</p>
            <p className="font-medium text-[#4a4030]">
              {formatCurrency(subtotal)}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p className="text-[#6b6152]">Tax (8%)</p>
            <p className="font-medium text-[#4a4030]">{formatCurrency(tax)}</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#6b6152]">Discount</label>
            <input
              type="number"
              value={discount}
              onChange={(e) =>
                setDiscount(Math.max(0, parseFloat(e.target.value) || 0))
              }
              className="h-8 w-20 rounded-lg border border-[#e3dcc8] px-2 text-sm outline-none ring-[#6b7f3f] focus:ring-2"
              placeholder="0.00"
            />
            <span className="text-sm font-medium text-[#8a7f6c]">₹</span>
          </div>
          <div className="border-t border-[#e3dcc8] pt-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#3a3020]">Grand Total</p>
              <p className="text-2xl font-bold text-[#55672f]">
                {formatCurrency(total)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Print Preview Modal */}
      {showPrintPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#e3dcc8] bg-[#fffdf7] shadow-xl p-8">
            {/* Invoice Print Layout */}
            <div className="text-center mb-6">
              <p className="text-2xl font-bold text-[#3a3020]">Billuu</p>
              <p className="text-xs text-[#8a7f6c] mt-1">
                Restaurant Billing System
              </p>
            </div>
            <div className="border-t border-[#e3dcc8] pt-4 space-y-3 text-center text-xs">
              <p className="font-semibold text-[#3a3020]">{invoiceNum}</p>
              <p className="text-[#8a7f6c]">September 18, 2026</p>
            </div>
            <div className="border-t border-[#e3dcc8] my-4 pt-4 space-y-2 text-xs">
              {billableCart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-[#5c5240]">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-[#4a4030]">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e3dcc8] pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#6b6152]">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6b6152]">
                <span>Tax (8%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#3a3020] text-sm border-t border-[#e3dcc8] pt-2">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 rounded-lg bg-[#ede6d4] px-3 py-2 text-xs font-semibold text-[#5c5240] hover:bg-[#e3dcc8]"
              >
                Print
              </button>
              <button
                onClick={() => {
                  if (cart.length)
                    setHistory([
                      ...history,
                      {
                        invoiceNum,
                        date: 'Sep 18, 2026',
                        amount: total,
                        status: 'Paid',
                        statusColor: 'bg-emerald-100 text-emerald-700',
                      },
                    ]);
                  setCart([]);
                  setShowPrintPreview(false);
                }}
                className="flex-1 rounded-lg bg-[#6b7f3f] px-3 py-2 text-xs font-semibold text-white hover:bg-[#55672f]"
              >
                Mark paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Billing History */}
      <section className="rounded-2xl border border-[#e3dcc8]/80 bg-[#fffdf7] shadow-sm shadow-[#e3dcc8]/30 overflow-hidden">
        <div className="border-b border-[#ede6d4] px-6 py-4">
          <h2 className="font-semibold text-[#3a3020]">Billing History</h2>
          <p className="mt-1 text-xs text-[#8a7f6c]">
            Past invoices and transactions
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#e3dcc8] bg-[#f7f2e6]">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-[#5c5240]">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left font-semibold text-[#5c5240]">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-semibold text-[#5c5240]">
                  Amount
                </th>
                <th className="px-6 py-3 text-left font-semibold text-[#5c5240]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr
                  key={record.invoiceNum}
                  className="border-b border-[#ede6d4] hover:bg-[#f7f2e6]"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#4a4030]">
                      {record.invoiceNum}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#6b6152]">{record.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#4a4030]">
                      {formatCurrency(record.amount)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                        record.statusColor,
                      )}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
