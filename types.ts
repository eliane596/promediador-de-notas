export interface Subject {
  id: string;
  name: string;
  grade: number | ''; // 0-500 scale
  credits: number | '';
}

export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface SemesterStats {
  totalCredits: number;
  average: number;
  totalPoints: number; // grade * credits
}

export interface GlobalStats {
  totalCredits: number;
  weightedAverage: number;
}