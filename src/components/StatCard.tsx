'use client';

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    LucideIcon
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    isPositive: boolean;
    icon: LucideIcon;
    delay: string;
}

export const StatCard = ({ title, value, trend, isPositive, icon: Icon, delay }: StatCardProps) => (
    <div
        className="bg-white p-6 md:p-7 rounded-[2rem] md:rounded-[2.25rem] shadow-sm border border-slate-200/60 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
        style={{ animationDelay: delay }}
    >
        <div className="relative z-10 flex justify-between items-start mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all duration-500">
                <Icon size={20} className="md:w-[22px]" />
            </div>
            <div className={`flex items-center gap-1 text-[10px] md:text-[11px] font-black uppercase tracking-wider
        ${isPositive ? 'text-green-500' : 'text-red-500'}
      `}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {trend}
            </div>
        </div>
        <div className="relative z-10">
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{value}</h4>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
    </div>
);
