"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function CategoryPieChart({ data }: { data: { name: string, value: number }[] }) {
  // Modern vibrant color palette for each category
  const COLORS = [
    '#ff0033', // Neon Red
    '#00d2ff', // Electric Blue
    '#7928ca', // Bright Indigo
    '#ff007f', // Hot Pink
    '#00df89', // Neon Green
    '#ff6b00', // Vivid Orange
    '#ffea00', // Radiant Yellow
    '#4f46e5'  // Slate Blue
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 300 }}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          stroke="rgba(255,0,51,0.2)"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255, 0, 51, 0.15)', borderRadius: '8px' }}
          itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Legend wrapperStyle={{ color: '#8a8a93' }} />
      </PieChart>
    </div>
  );
}
