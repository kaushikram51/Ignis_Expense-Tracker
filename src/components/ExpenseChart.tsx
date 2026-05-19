"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpenseChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff0033" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff0033" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="name" stroke="#8a8a93" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#8a8a93" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255, 0, 51, 0.15)', borderRadius: '8px' }}
            itemStyle={{ color: '#ff0033', fontWeight: 'bold' }}
          />
          <Area type="monotone" dataKey="amount" stroke="#ff0033" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
