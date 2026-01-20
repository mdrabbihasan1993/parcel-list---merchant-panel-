
import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  iconColorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, iconColorClass = 'text-gray-300' }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <div className={iconColorClass}>{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  );
};
