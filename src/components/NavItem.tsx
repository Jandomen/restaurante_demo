'use client';

import React from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface NavItemProps {
    icon: LucideIcon;
    label: string;
    active?: boolean;
    highlight?: boolean;
    onClick?: () => void;
}

export const NavItem = ({ icon: Icon, label, active = false, highlight = false, onClick }: NavItemProps) => (
    <div
        onClick={onClick}
        className={`
    flex items-center gap-4 px-5 py-4 rounded-[1.25rem] cursor-pointer transition-all duration-300
    ${active
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-[1.02] font-black'
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
  `}
    >
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
        <span className="text-sm tracking-tight">{label}</span>
        {highlight && !active && <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-300"></div>}
        {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
    </div>
);
