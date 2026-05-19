import { prisma } from "@/lib/prisma";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import AddTransactionForm from "@/components/AddTransactionForm";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();
  if (!session) return null;

  const transactions = await prisma.transaction.findMany({
    where: { userId: session.userId },
    orderBy: { date: 'desc' },
    take: 5
  });

  const allTransactions = await prisma.transaction.findMany({
    where: { userId: session.userId }
  });
  
  const balance = allTransactions.reduce((acc, curr) => {
    return curr.type === 'INCOME' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const income = allTransactions.filter(t => t.type === 'INCOME').reduce((a, b) => a + b.amount, 0);
  const expenses = allTransactions.filter(t => t.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="flex gap-6 mb-8">
        <div className="glass-card flex-1">
          <div className="flex items-center gap-4 mb-4 text-secondary">
            <Wallet size={24} />
            <h3 className="font-semibold">Total Balance</h3>
          </div>
          <div className="text-4xl font-bold number">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </div>

        <div className="glass-card flex-1">
          <div className="flex items-center gap-4 mb-4 text-secondary">
            <ArrowDownRight size={24} color="#8b0000" />
            <h3 className="font-semibold">Total Expenses</h3>
          </div>
          <div className="text-2xl font-bold number">${expenses.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </div>

        <div className="glass-card flex-1">
          <div className="flex items-center gap-4 mb-4 text-secondary">
            <ArrowUpRight size={24} color="#4CAF50" />
            <h3 className="font-semibold">Total Income</h3>
          </div>
          <div className="text-2xl font-bold number">${income.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </div>
      </div>

      <AddTransactionForm />

      <div className="glass-card">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        {transactions.length === 0 ? (
          <div className="text-secondary text-center py-8">
            No recent activity. Start by adding a transaction above!
          </div>
        ) : (
          <div className="flex-col gap-4">
            {transactions.map(t => (
              <div key={t.id} className="flex justify-between items-center p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,0,51,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {t.category[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{t.description || t.category}</div>
                    <div className="text-secondary text-sm">{t.category}</div>
                  </div>
                </div>
                <div className={`font-bold number ${t.type === 'EXPENSE' ? 'text-neon' : ''}`} style={{ color: t.type === 'INCOME' ? '#fff' : '' }}>
                  {t.type === 'EXPENSE' ? '-' : '+'}${t.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
