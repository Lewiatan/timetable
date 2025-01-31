import React from 'react';
import { SectionContainer } from './common/SectionContainer';

interface Lecture {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
}

interface Teacher {
  id: string;
  name: string;
  capabilities: string[];
  assignedRoom?: string;
}

interface Grade {
  id: string;
  name: string;
  requiredLectures: { [key: string]: number };
}

interface Class {
  id: string;
  name: string;
  grade: string;
}

interface TimetableSectionProps {
  lectures: Lecture[];
  rooms: Room[];
  teachers: Teacher[];
  grades: Grade[];
  classes: Class[];
  onGenerateTimetable: () => void;
  timetable: string | null;
  isLoading: boolean;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({
  lectures,
  rooms,
  teachers,
  grades,
  classes,
  onGenerateTimetable,
  timetable,
  isLoading,
}) => {
  const hasData = lectures.length > 0 && rooms.length > 0 && teachers.length > 0 && grades.length > 0 && classes.length > 0;

  return (
    <div className="mt-8">
      <div className="flex justify-center mb-4">
        <button
          onClick={onGenerateTimetable}
          disabled={!hasData || isLoading}
          className={`px-6 py-3 rounded-lg text-lg font-semibold ${
            hasData && !isLoading
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Generating...' : 'Generate Timetable'}
        </button>
      </div>

      {timetable && (
        <SectionContainer title="Generated Timetable">
          <div className="bg-gray-800 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
            {timetable}
          </div>
        </SectionContainer>
      )}

      {!hasData && (
        <p className="text-center text-gray-400 mt-4">
          Please add at least one of each: lecture, room, teacher, grade, and class to generate a timetable.
        </p>
      )}
    </div>
  );
};