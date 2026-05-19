import { prisma } from "@/lib/prisma";
import { Target, Trophy } from "lucide-react";
import AddGoalForm from "@/components/AddGoalForm";
import { getSession } from "@/lib/auth";

export default async function Goals() {
  const session = await getSession();
  if (!session) return null;

  const goals = await prisma.goal.findMany({
    where: { userId: session.userId }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Target size={28} color="#ff0033" />
        Financial Goals
      </h1>

      <AddGoalForm />

      {goals.length === 0 ? (
        <div className="glass-card text-center text-secondary py-12">
          No goals yet. Set your first financial target above!
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {goals.map(goal => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id} className="glass-card">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(255,0,51,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trophy color="#ff0033" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{goal.name}</h3>
                    <div className="text-secondary number">
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold number text-neon">
                  {progress.toFixed(1)}%
                </div>
              </div>
              
              {/* Progress bar */}
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #8b0000 0%, #ff0033 100%)',
                  boxShadow: '0 0 10px rgba(255,0,51,0.5)'
                }} />
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
}
