import React from 'react';
import { Input } from '../common/Input';
import { SectionContainer } from '../common/SectionContainer';

interface Class {
  id: string;
  name: string;
  grade: string;
}

interface Grade {
  id: string;
  name: string;
}

interface ClassSectionProps {
  classes: Class[];
  grades: Grade[];
  newClassName: string;
  selectedGrade: string;
  setNewClassName: (name: string) => void;
  setSelectedGrade: (gradeId: string) => void;
  addClass: () => void;
  removeClass: (id: string) => void;
}

export const ClassSection: React.FC<ClassSectionProps> = ({
  classes,
  grades,
  newClassName,
  selectedGrade,
  setNewClassName,
  setSelectedGrade,
  addClass,
  removeClass,
}) => {
  return (
    <SectionContainer title="Classes">
      <div className="space-y-2 mb-4">
        <Input
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          onSubmit={addClass}
          placeholder="Enter class name"
        />
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Select a grade</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
        <button
          onClick={addClass}
          className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Class
        </button>
      </div>
      <ul className="space-y-2">
        {classes.map((cls) => (
          <li key={cls.id} className="bg-gray-700 p-2 rounded flex justify-between items-start">
            <div>
              <div>{cls.name}</div>
              <div className="text-sm text-gray-400">
                Grade: {grades.find((g) => g.id === cls.grade)?.name}
              </div>
            </div>
            <button
              onClick={() => removeClass(cls.id)}
              className="text-red-500 hover:text-red-700 px-2"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};
