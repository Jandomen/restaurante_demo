'use client';

import React from 'react';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
    onEnter: () => void;
}

export const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
    const [isEntering, setIsEntering] = React.useState(false);

    const handleEnter = () => {
        setIsEntering(true);
        setTimeout(() => {
            onEnter();
        }, 1200);
    };

    return (
        <div className={`fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center transition-all duration-700 ${isEntering ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px] animate-pulse shadow-2xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-full max-w-[480px] mb-14 animate-in zoom-in-50 duration-1000">
                    <img
                        src="/logo.png"
                        alt="GastroManager Logo"
                        className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(249,115,22,0.5)] scale-125"
                    />
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 animate-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                    Gastro<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Manager</span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl font-medium max-w-md mb-12 animate-in slide-in-from-bottom-10 duration-1000 fill-mode-both">
                    El sistema inteligente de gestión restaurantera y facturación electrónica para líderes.
                </p>

                <button
                    onClick={handleEnter}
                    disabled={isEntering}
                    className="group relative px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] animate-in slide-in-from-bottom-12 duration-1000 fill-mode-both disabled:opacity-50"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                        {isEntering ? 'INICIANDO SISTEMA...' : 'ENTRAR AL PANEL'}
                        {!isEntering && <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
                    </span>
                </button>

                <div className="mt-16 flex items-center gap-8 animate-in fade-in duration-1000 delay-500">
                    <div className="flex flex-col items-center">
                        <span className="text-white font-black text-xl">CFDI 4.0</span>
                        <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Protocolo Oficial</span>
                    </div>
                    <div className="w-px h-8 bg-slate-800"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-white font-black text-xl">Cloud Sync</span>
                        <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest">En Tiempo Real</span>
                    </div>
                </div>
            </div>

            {/* Marca de agua / Decoración sutil */}
            <div className="absolute bottom-10 text-slate-700 text-[10px] font-black uppercase tracking-[0.5em] tracking-widest animate-pulse">
                Premium Restaurant Experience • v2.0
            </div>
        </div>
    );
};
