import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import { TrendingUp, Wallet, PiggyBank } from "lucide-react";

const quickStats = [
  {
    label: "Monthly Spend",
    value: "฿42,700",
    change: "+8% vs last month",
    icon: TrendingUp,
  },
  {
    label: "Subscriptions",
    value: "12 active",
    change: "3 due this week",
    icon: Wallet,
  },
  {
    label: "Savings Goal",
    value: "฿120k",
    change: "60% funded",
    icon: PiggyBank,
  },
];

export const Dashboard = () => {
  const { user } = useUser();
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:text-slate-50">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 space-y-10">
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-fuchsia-50/60 to-indigo-50/60 p-8 shadow-xl dark:border-white/5 dark:from-fuchsia-500/20 dark:via-slate-900 dark:to-slate-900">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600 dark:text-fuchsia-200">
            Welcome back, {user?.firstName ?? "financier"}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-snug text-slate-900 dark:text-white sm:text-4xl">
            Your personal command center for everything money.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-200">
            Track spending, spot trends, and update records in real time. Use
            the quick actions below to log new activity or review the latest
            transactions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 dark:bg-white dark:text-slate-900">
              Add a new record
            </button>
            <button className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 dark:border-white/40 dark:text-white/90 dark:hover:border-white">
              View trends
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickStats.map(({ label, value, change, icon: Icon }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  {label}
                </p>
                <Icon className="h-4 w-4 text-pink-600 dark:text-pink-300" />
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                {value}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {change}
              </p>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-white/5">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Log a record
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              Capture expenses or income with categories, payment methods, and
              notes.
            </p>
            <div className="mt-6">
              <FinancialRecordForm />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Recent activity
              </h2>
              <span className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-400">
                Live sync
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              Sort, edit, and delete entries directly in the table below.
            </p>
            <div className="mt-6">
              <FinancialRecordList />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
