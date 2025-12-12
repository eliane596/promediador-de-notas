import React from 'react';
import { Trash2 } from 'lucide-react';
import { Subject } from '../types';

interface SubjectInputProps {
  subject: Subject;
  onChange: (id: string, field: keyof Subject, value: string | number) => void;
  onRemove: (id: string) => void;
}

const SubjectInput: React.FC<SubjectInputProps> = ({ subject, onChange, onRemove }) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'grade' | 'credits') => {
    const val = e.target.value;

    // Restricción de longitud estricta solicitada
    // Créditos: Máximo 1 dígito
    if (field === 'credits' && val.length > 1) return;
    // Nota: Máximo 3 dígitos
    if (field === 'grade' && val.length > 3) return;

    if (val === '') {
      onChange(subject.id, field, '');
      return;
    }
    
    const num = parseFloat(val);
    if (!isNaN(num)) {
      // Validación para escala Unimagdalena (0-500)
      if (field === 'grade' && (num > 500 || num < 0)) return; 
      
      // Validación para créditos (evitar negativos)
      if (field === 'credits' && num < 0) return;

      onChange(subject.id, field, num);
    }
  };

  // Styles for black background, white text, and script font
  const inputClass = "w-full px-3 py-2 bg-black text-white border border-gray-700 rounded-lg placeholder-gray-500 font-script text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-lilac focus:border-transparent transition-all";

  return (
    <div className="grid grid-cols-12 gap-2 items-center mb-3 animate-fadeIn">
      <div className="col-span-6 sm:col-span-5">
        <input
          type="text"
          placeholder="Materia (ej. Finanzas)"
          className={`${inputClass}`}
          value={subject.name}
          onChange={(e) => onChange(subject.id, 'name', e.target.value)}
        />
      </div>
      <div className="col-span-3 sm:col-span-3">
        <input
          type="number"
          placeholder="Nota"
          min="0"
          max="500"
          className={`${inputClass} text-center`}
          value={subject.grade}
          onChange={(e) => handleNumberChange(e, 'grade')}
        />
      </div>
      <div className="col-span-2 sm:col-span-3">
        <input
          type="number"
          placeholder="Créditos"
          min="1"
          max="9"
          className={`${inputClass} text-center`}
          value={subject.credits}
          onChange={(e) => handleNumberChange(e, 'credits')}
        />
      </div>
      <div className="col-span-1 flex justify-end">
        <button
          onClick={() => onRemove(subject.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Eliminar materia"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default SubjectInput;