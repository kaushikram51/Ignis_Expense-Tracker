import { prisma } from "@/lib/prisma";
import ExpenseChart from "@/components/ExpenseChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import { Activity, PieChart as PieChartIcon } from "lucide-react";
import { getSession } from "@/lib/auth";

export default async function Analytics() {
  const session = await getSession();
  if (!session) return null;

  const expenseTransactions = await prisma.transaction.findMany({
    where: { type: 'EXPENSE', userId: session.userId },
    orderBy: { date: 'asc' }
  });

  // Group by day for the chart
  const groupedData = expenseTransactions.reduce((acc: any, curr) => {
    const day = curr.date.toLocaleDateString('en-US', { weekday: 'short' });
    if (!acc[day]) acc[day] = 0;
    acc[day] += curr.amount;
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map(key => ({
    name: key,
    amount: groupedData[key]
  }));

  // Group by category for expenses
  const expenseCategoryData = expenseTransactions.reduce((acc: any, curr) => {
    const categoryName = curr.category.charAt(0).toUpperCase() + curr.category.slice(1).toLowerCase();
    if (!acc[categoryName]) acc[categoryName] = 0;
    acc[categoryName] += curr.amount;
    return acc;
  }, {});

  const expensePieData = Object.keys(expenseCategoryData).map(key => ({
    name: key,
    value: expenseCategoryData[key]
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Activity size={28} color="#ff0033" />
        Analytics
      </h1>

      {expenseTransactions.length === 0 ? (
        <div className="glass-card text-center text-secondary py-12">
          No expense data available. Add some expenses on the dashboard to see your analytics.
        </div>
      ) : (
        <>
          <div className="glass-card mb-8">
            <h2 className="text-xl font-bold mb-6">Cash Flow Trends</h2>
            <ExpenseChart data={chartData.length > 0 ? chartData : [{name: 'Mon', amount: 0}, {name: 'Tue', amount: 0}]} />
          </div>

          {expensePieData.length > 0 && (
            <div className="glass-card">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PieChartIcon size={24} /> Expenses by Category
              </h2>
              <div className="flex gap-8 items-center flex-wrap">
                <div className="flex-1 min-w-[300px]">
                  <CategoryPieChart data={expensePieData} />
                </div>
                <div className="flex gap-4 flex-wrap flex-1">
                  {Object.keys(expenseCategoryData).map(cat => (
                    <div key={cat} className="flex-1 min-w-[150px]" style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="text-secondary mb-2">{cat}</div>
                      <div className="text-2xl font-bold number text-neon">${expenseCategoryData[cat].toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
