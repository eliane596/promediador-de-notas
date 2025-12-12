import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import Header from './components/Header';
import SemesterCard from './components/SemesterCard';
import GlobalSummary from './components/GlobalSummary';
import BackgroundDecorations from './components/BackgroundDecorations';
import { Semester, GlobalStats } from './types';
import { generatePDF } from './utils/pdfGenerator';

const App: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  // Initialize with one semester if empty
  useEffect(() => {
    if (semesters.length === 0) {
      setSemesters([
        {
          id: crypto.randomUUID(),
          name: 'Semestre 1',
          subjects: []
        }
      ]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const calculateGlobalStats = (): GlobalStats => {
    let totalCredits = 0;
    let totalWeightedPoints = 0;

    semesters.forEach(sem => {
      sem.subjects.forEach(sub => {
        const grade = typeof sub.grade === 'number' ? sub.grade : 0;
        const credits = typeof sub.credits === 'number' ? sub.credits : 0;
        
        if (grade > 0 && credits > 0) {
          totalCredits += credits;
          totalWeightedPoints += (grade * credits);
        }
      });
    });

    const weightedAverage = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

    return { totalCredits, weightedAverage };
  };

  const handleAddSemester = () => {
    const nextNum = semesters.length + 1;
    const newSemester: Semester = {
      id: crypto.randomUUID(),
      name: `Semestre ${nextNum}`,
      subjects: []
    };
    setSemesters([...semesters, newSemester]);
  };

  const handleUpdateSemester = (id: string, updatedSemester: Semester) => {
    setSemesters(semesters.map(s => s.id === id ? updatedSemester : s));
  };

  const handleRemoveSemester = (id: string) => {
    if (confirm('¿Estás segura de que quieres eliminar este semestre y todas sus materias?')) {
      setSemesters(semesters.filter(s => s.id !== id));
    }
  };

  const globalStats = calculateGlobalStats();

  const handleDownloadGlobal = () => {
    generatePDF(semesters, globalStats);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-32 relative">
      <BackgroundDecorations />
      <Header />

      <main className="max-w-6xl w-full mx-auto px-4 py-8 flex-grow relative z-10">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl text-gray-800 border-l-4 border-gold pl-4 font-bold">
                Mi Historial Académico
            </h2>
            <button
                onClick={handleAddSemester}
                className="bg-lilac hover:bg-lilac-dark text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 text-lg group"
            >
                <PlusCircle size={24} className="group-hover:rotate-90 transition-transform" />
                <span className="hidden sm:inline">Nuevo Semestre</span>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {semesters.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              onUpdateSemester={handleUpdateSemester}
              onRemoveSemester={handleRemoveSemester}
            />
          ))}
          
          {/* Add Semester Card (Placeholder style) */}
          <button
            onClick={handleAddSemester}
            className="border-2 border-dashed border-lilac/30 rounded-xl min-h-[300px] flex flex-col items-center justify-center text-gray-400 hover:text-lilac hover:border-lilac hover:bg-lilac hover:bg-opacity-5 transition-all duration-300 group bg-white/50 backdrop-blur-sm"
          >
            <div className="w-16 h-16 rounded-full bg-lilac/10 group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
                <PlusCircle size={32} className="text-lilac group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xl">Agregar Semestre</span>
          </button>
        </div>

      </main>

      <GlobalSummary stats={globalStats} onDownloadGlobal={handleDownloadGlobal} />
    </div>
  );
};

export default App;