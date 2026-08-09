"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatDate, formatZAR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Orders</h1>
      <p className="mt-1 text-sm text-ink-soft">{MOCK_ORDERS.length} orders in the last 30 days</p>

      <div className="card mt-6 divide-y divide-line">
        {MOCK_ORDERS.map((order) => {
          const isOpen = openId === order.id;
          return (
            <div key={order.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : order.id)}
                aria-expanded={isOpen}
                className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-semibold text-ink">{order.reference}</span>
                  <span className="text-xs text-ink-faint">{formatDate(order.placedAt)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-ink-soft">{order.shippingAddress.fullName}</span>
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-deep">{order.status}</span>
                  <span className="font-semibold text-ink">{formatZAR(order.total)}</span>
                  {isOpen ? <ChevronUp size={16} className="text-ink-faint" /> : <ChevronDown size={16} className="text-ink-faint" />}
                </div>
              </button>
              <div className={cn("grid transition-all", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 border-t border-line bg-surface/60 p-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Items</p>
                      <ul className="mt-2 space-y-1.5">
                        {order.items.map((item) => (
                          <li key={item.productId} className="flex justify-between text-sm">
                            <span className="text-ink-soft">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-medium text-ink">{formatZAR(item.price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Shipping to</p>
                      <address className="mt-2 text-sm not-italic leading-relaxed text-ink-soft">
                        {order.shippingAddress.fullName}
                        <br />
                        {order.shippingAddress.line1}, {order.shippingAddress.suburb}
                        <br />
                        {order.shippingAddress.city}, {order.shippingAddress.province}
                        <br />
                        {order.shippingAddress.postalCode}
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
