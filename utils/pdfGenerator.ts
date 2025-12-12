import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Semester, GlobalStats } from '../types';

// Colors based on your theme
const COLORS = {
  lilac: '#B28DFF',
  lilacDark: '#8C66D6',
  gold: '#D4AF37',
  goldDark: '#AA8C2C',
  text: '#333333',
  lightGray: '#f3f3f3'
};

const formatCurrency = (value: number) => value.toFixed(2);

export const generatePDF = (semesters: Semester[], globalStats?: GlobalStats, singleSemesterTitle?: string) => {
  const doc = new jsPDF();
  const isGlobal = !!globalStats;

  // --- Header ---
  // Background stripe
  doc.setFillColor(COLORS.lilac);
  doc.rect(0, 0, 210, 25, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Reporte Académico', 14, 16);
  
  // Subtitle (Name)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Eliane Orozco - Universidad del Magdalena', 14, 23);

  let yPos = 35;

  // --- Title of the specific report ---
  doc.setTextColor(COLORS.goldDark);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const mainTitle = singleSemesterTitle ? `Reporte: ${singleSemesterTitle}` : 'Historial Académico Completo';
  doc.text(mainTitle, 14, yPos);
  
  yPos += 10;

  // --- Iterating Semesters ---
  semesters.forEach((semester) => {
    // Calculate semester details for the header
    let semCredits = 0;
    let semWeighted = 0;
    const tableBody = semester.subjects.map(sub => {
      const grade = typeof sub.grade === 'number' ? sub.grade : 0;
      const creds = typeof sub.credits === 'number' ? sub.credits : 0;
      if(grade > 0 && creds > 0) {
        semCredits += creds;
        semWeighted += grade * creds;
      }
      return [
        sub.name || 'Sin nombre',
        creds || '-',
        grade || '-',
        (grade * creds) || '-'
      ];
    });
    
    const semAvg = semCredits > 0 ? (semWeighted / semCredits).toFixed(2) : '0.00';

    // Semester Header Text
    doc.setTextColor(COLORS.lilacDark);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${semester.name}`, 14, yPos);
    
    // Semester Summary inline
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Promedio: ${semAvg} | Créditos: ${semCredits}`, 150, yPos, { align: 'right' });

    yPos += 2;

    // Table
    autoTable(doc, {
      startY: yPos,
      head: [['Materia', 'Créditos', 'Nota (0-500)', 'Puntos']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: COLORS.gold,
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: {
        font: 'helvetica',
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: COLORS.lightGray
      },
      margin: { top: 10 }
    });

    // Update Y position for next loop
    // @ts-ignore
    yPos = doc.lastAutoTable.finalY + 15;
  });

  // --- Global Summary (If applicable) ---
  if (isGlobal && globalStats) {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    } else {
        yPos += 5;
    }

    doc.setFillColor(COLORS.lightGray);
    doc.setDrawColor(COLORS.gold);
    doc.roundedRect(14, yPos, 182, 30, 3, 3, 'FD');

    doc.setTextColor(COLORS.goldDark);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen Final de Carrera', 20, yPos + 10);

    doc.setTextColor(COLORS.text);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Créditos Cursados: ${globalStats.totalCredits}`, 20, yPos + 20);
    
    doc.setFontSize(14);
    doc.setTextColor(COLORS.lilacDark);
    doc.setFont('helvetica', 'bold');
    doc.text(`Promedio Ponderado Acumulado: ${globalStats.weightedAverage.toFixed(2)}`, 190, yPos + 20, { align: 'right' });
  }

  // --- Footer ---
  const pageCount = doc.internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generado por Calculadora Académica - Eliane Orozco', 105, 290, { align: 'center' });
  }

  const filename = singleSemesterTitle 
    ? `Notas_${singleSemesterTitle.replace(/\s+/g, '_')}.pdf` 
    : 'Historial_Academico_Completo.pdf';
    
  doc.save(filename);
};