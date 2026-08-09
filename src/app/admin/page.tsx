import { TrendingUp, TrendingDown, Package, ShoppingCart, AlertTriangle, Users } from "lucide-react";
import { PRODUCTS, MOCK_ORDERS } from "@/lib/mock-data";
import { formatZAR, formatDate } from "@/lib/utils";
import type { AdminStat } from "@/lib/types";

export default function AdminDashboardPage() {
  const revenue = MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0);
  const lowStock = PRODUCTS.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= 3);
  const outOfStock = PRODUCTS.filter((p) => p.stockQuantity === 0);

  const stats: AdminStat[] = [
    { label: "Revenue (30 days)", value: formatZAR(revenue), delta: "+12.4%", trend: "up" },
    { label: "Orders", value: String(MOCK_ORDERS.length), delta: "+3", trend: "up" },
    { label: "Avg. order value", value: formatZAR(Math.round(revenue / MOCK_ORDERS.length)), delta: "-2.1%", trend: "down" },
    { label: "Active listings", value: String(PRODUCTS.length), delta: `${lowStock.length} low stock`, trend: "flat" },
  ];

  const icons = [TrendingUp, ShoppingCart, Users, Package];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">Welcome back — here&rsquo;s how iConnect Pre-Owned is doing.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = icons[i];
          return (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    stat.trend === "up" ? "text-positive" : stat.trend === "down" ? "text-red-500" : "text-ink-faint"
                  }`}
                >
                  {stat.trend === "up" && <TrendingUp size={12} />}
                  {stat.trend === "down" && <TrendingDown size={12} />}
                  {stat.delta}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-ink">{stat.value}</p>
              <p className="mt-1 text-xs text-ink-faint">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-ink">Recent orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs text-ink-faint">
                  <th className="pb-3 font-medium">Reference</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-line last:border-0">
                    <td className="py-3 font-medium text-ink">{order.reference}</td>
                    <td className="py-3 text-ink-soft">{formatDate(order.placedAt)}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-deep">{order.status}</span>
                    </td>
                    <td className="py-3 text-right font-semibold text-ink">{formatZAR(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
            <AlertTriangle size={15} className="text-caution" aria-hidden="true" />
            Stock alerts
          </h2>
          <ul className="mt-4 space-y-3">
            {[...outOfStock, ...lowStock].slice(0, 6).map((p) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <span className="truncate text-ink-soft">{p.name}</span>
                <span className={`shrink-0 text-xs font-semibold ${p.stockQuantity === 0 ? "text-red-500" : "text-caution"}`}>
                  {p.stockQuantity === 0 ? "Out of stock" : `${p.stockQuantity} left`}
                </span>
              </li>
            ))}
            {outOfStock.length + lowStock.length === 0 && <li className="text-sm text-ink-faint">All stock levels healthy.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
