import React from 'react';
import { GlobalStats } from '../types';
import { Award, Calculator, Download } from 'lucide-react';

interface GlobalSummaryProps {
  stats: GlobalStats;
  onDownloadGlobal: () => void;
}

const GlobalSummary: React.FC<GlobalSummaryProps> = ({ stats, onDownloadGlobal }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="bg-gold-light bg-opacity-20 p-2 rounded-full hidden sm:block">
                  <Calculator className="text-gold-dark w-6 h-6" />
              </div>
              <div className="text-left">
                  <h3 className="text-lg text-gray-500 leading-none mb-1">Resumen de Carrera</h3>
                  <p className="text-base text-gray-400 leading-none">Total créditos: <strong className="text-gray-700 text-xl">{stats.totalCredits}</strong></p>
              </div>
            </div>

            <button
              onClick={onDownloadGlobal}
              className="md:hidden bg-lilac/10 text-lilac-dark p-2 rounded-full hover:bg-lilac hover:text-white transition-colors"
              title="Descargar Reporte Completo"
            >
              <Download size={24} />
            </button>
        </div>

        <div className="flex items-center gap-6">
            <div className="text-right flex items-center gap-4">
                <span className="text-xl text-lilac-dark hidden sm:inline">Promedio Ponderado Final</span>
                <span className="text-xl text-lilac-dark sm:hidden">Promedio</span>
                <div className="relative group">
                    <div className="text-5xl md:text-6xl text-lilac leading-none">
                        {stats.weightedAverage.toFixed(2)}
                    </div>
                    {/* Decorative underline */}
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full opacity-60"></div>
                </div>
            </div>
            
            <button
              onClick={onDownloadGlobal}
              className="hidden md:flex items-center gap-2 bg-lilac hover:bg-lilac-dark text-white px-4 py-2 rounded-full transition-colors shadow-sm ml-4"
              title="Descargar Reporte Completo"
            >
               <Download size={20} />
               <span className="font-script text-xl">Descargar</span>
            </button>
            
            <div className="hidden lg:block">
                <Award size={48} className="text-gold" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSummary;