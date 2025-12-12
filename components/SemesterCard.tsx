import React, { useMemo } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';
import { Semester, Subject } from '../types';
import SubjectInput from './SubjectInput';
import { generatePDF } from '../utils/pdfGenerator';

interface SemesterCardProps {
  semester: Semester;
  onUpdateSemester: (id: string, updatedSemester: Semester) => void;
  onRemoveSemester: (id: string) => void;
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semester, onUpdateSemester, onRemoveSemester }) => {
  
  // Calculate local stats for this semester
  const stats = useMemo(() => {
    let totalCredits = 0;
    let totalWeightedPoints = 0;

    semester.subjects.forEach(sub => {
      const grade = typeof sub.grade === 'number' ? sub.grade : 0;
      const credits = typeof sub.credits === 'number' ? sub.credits : 0;
      
      if (grade > 0 && credits > 0) {
        totalCredits += credits;
        totalWeightedPoints += (grade * credits);
      }
    });

    const average = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

    return { totalCredits, average };
  }, [semester.subjects]);

  const addSubject = () => {
    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name: '',
      grade: '',
      credits: ''
    };
    onUpdateSemester(semester.id, {
      ...semester,
      subjects: [...semester.subjects, newSubject]
    });
  };

  const removeSubject = (subjectId: string) => {
    onUpdateSemester(semester.id, {
      ...semester,
      subjects: semester.subjects.filter(s => s.id !== subjectId)
    });
  };

  const updateSubject = (subjectId: string, field: keyof Subject, value: string | number) => {
    const updatedSubjects = semester.subjects.map(s => 
      s.id === subjectId ? { ...s, [field]: value } : s
    );
    onUpdateSemester(semester.id, { ...semester, subjects: updatedSubjects });
  };

  const updateName = (name: string) => {
    onUpdateSemester(semester.id, { ...semester, name });
  };

  const handleDownload = () => {
    generatePDF([semester], undefined, semester.name);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-lilac/30 flex flex-col h-full">
      {/* Semester Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center gap-2">
        <input
          type="text"
          className="bg-transparent text-2xl text-lilac-dark focus:outline-none focus:border-b-2 focus:border-lilac w-full placeholder-lilac-dark/50"
          value={semester.name}
          onChange={(e) => updateName(e.target.value)}
          placeholder="Nombre del Semestre"
        />
        <div className="flex items-center gap-1">
          <button 
            onClick={handleDownload}
            className="text-gray-400 hover:text-lilac transition-colors p-2 rounded-full hover:bg-lilac/10"
            title="Descargar PDF del semestre"
          >
            <Download size={20} />
          </button>
          <button 
            onClick={() => onRemoveSemester(semester.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
            title="Eliminar Semestre"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Subjects List */}
      <div className="p-4 flex-grow space-y-2">
        {semester.subjects.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-lg border-2 border-dashed border-gray-100 rounded-lg">
            Agrega materias para comenzar
          </div>
        ) : (
          semester.subjects.map(subject => (
            <SubjectInput
              key={subject.id}
              subject={subject}
              onChange={updateSubject}
              onRemove={removeSubject}
            />
          ))
        )}
        
        <button
          onClick={addSubject}
          className="w-full mt-4 py-2 border-2 border-dashed border-lilac text-lilac hover:bg-lilac hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-lg"
        >
          <Plus size={20} /> Agregar Materia
        </button>
      </div>

      {/* Semester Stats Footer */}
      <div className="bg-lilac bg-opacity-10 p-4 border-t border-lilac border-opacity-20 mt-auto">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-sm text-gray-500 block mb-1">Total Créditos</span>
            <span className="text-2xl text-gray-700">{stats.totalCredits}</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 block mb-1">Promedio Semestral</span>
            <div className={`text-4xl ${stats.average >= 300 ? 'text-gold-dark' : 'text-gray-400'}`}>
              {stats.average.toFixed(2)}
              <span className="text-xl text-gray-400 ml-1">/ 500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterCard;