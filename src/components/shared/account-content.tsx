"use client";

import { useState } from "react";
import { Package, MapPin, User, CheckCircle2, Circle, Truck } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatDate, formatZAR, initials } from "@/lib/utils";
import { ProductImage } from "@/components/product/product-image";
import { cn } from "@/lib/utils";

const TABS = ["Orders", "Addresses", "Profile"] as const;

export function AccountContent() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Orders");
  const [expanded, setExpanded] = useState<string | null>(MOCK_ORDERS[0]?.id ?? null);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <aside>
        <div className="flex items-center gap-3 rounded-2xl border border-line p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent-deep">
            {initials("Lindiwe Mokoena")}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Lindiwe Mokoena</p>
            <p className="text-xs text-ink-faint">Member since 2023</p>
          </div>
        </div>
        <nav className="mt-4 space-y-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-medium",
                tab === t ? "bg-accent-soft text-accent-deep" : "text-ink-soft hover:bg-surface"
              )}
            >
              {t === "Orders" && <Package size={16} aria-hidden="true" />}
              {t === "Addresses" && <MapPin size={16} aria-hidden="true" />}
              {t === "Profile" && <User size={16} aria-hidden="true" />}
              {t}
            </button>
          ))}
        </nav>
      </aside>

      <div>
        {tab === "Orders" && (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => {
              const isOpen = expanded === order.id;
              return (
                <div key={order.id} className="card overflow-hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                    aria-expanded={isOpen}
                    className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">Order {order.reference}</p>
                      <p className="text-xs text-ink-faint">Placed {formatDate(order.placedAt)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-deep">{order.status}</span>
                      <span className="font-bold text-ink">{formatZAR(order.total)}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-line p-5">
                      <ol className="mb-6 flex flex-wrap gap-x-2 gap-y-3">
                        {order.trackingSteps.map((step, i) => (
                          <li key={step.status} className="flex items-center gap-2">
                            <span className={cn("flex items-center gap-1.5 text-xs font-medium", step.complete ? "text-ink" : "text-ink-faint")}>
                              {step.complete ? (
                                <CheckCircle2 size={14} className="text-positive" aria-hidden="true" />
                              ) : (
                                <Circle size={14} aria-hidden="true" />
                              )}
                              {step.label}
                            </span>
                            {i < order.trackingSteps.length - 1 && <span className="h-px w-6 bg-line" aria-hidden="true" />}
                          </li>
                        ))}
                      </ol>
                      {order.courierTrackingNumber && (
                        <p className="mb-4 flex items-center gap-2 text-xs text-ink-soft">
                          <Truck size={14} aria-hidden="true" />
                          Courier tracking: <span className="font-mono font-medium text-ink">{order.courierTrackingNumber}</span>
                        </p>
                      )}
                      <ul className="space-y-3">
                        {order.items.map((item) => (
                          <li key={item.productId} className="flex items-center gap-3">
                            <ProductImage category={item.category} gradient={item.gradient} name={item.name} size="sm" className="!h-12 !w-12" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-ink">{item.name}</p>
                              <p className="text-xs text-ink-faint">Qty {item.quantity}</p>
                            </div>
                            <p className="text-sm font-semibold text-ink">{formatZAR(item.price * item.quantity)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "Addresses" && (
          <div className="card p-6">
            <p className="text-sm font-semibold text-ink">Default shipping address</p>
            <address className="mt-2 text-sm not-italic leading-relaxed text-ink-soft">
              Lindiwe Mokoena
              <br />
              14 Baker Street, Rosebank
              <br />
              Johannesburg, Gauteng, 2196
              <br />
              082 555 0134
            </address>
          </div>
        )}

        {tab === "Profile" && (
          <div className="card space-y-4 p-6">
            <div>
              <p className="text-xs font-medium text-ink-faint">Full name</p>
              <p className="text-sm font-medium text-ink">Lindiwe Mokoena</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ink-faint">Email</p>
              <p className="text-sm font-medium text-ink">lindiwe.m@example.com</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ink-faint">Phone</p>
              <p className="text-sm font-medium text-ink">082 555 0134</p>
            </div>
            <p className="pt-2 text-xs text-ink-faint">
              This is demo account data. Connect Supabase Auth to make this a real, editable profile — see README.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
