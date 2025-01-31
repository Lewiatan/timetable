import React from 'react';
import { InputWithButton } from '../common/InputWithButton';
import { SectionContainer } from '../common/SectionContainer';

interface Lecture {
  id: string;
  name: string;
}

interface LectureSectionProps {
  lectures: Lecture[];
  newLectureName: string;
  setNewLectureName: (name: string) => void;
  addLecture: () => void;
  removeLecture: (id: string) => void;
}

export const LectureSection: React.FC<LectureSectionProps> = ({
  lectures,
  newLectureName,
  setNewLectureName,
  addLecture,
  removeLecture,
}) => {
  return (
    <SectionContainer title="Lectures">
      <InputWithButton
        value={newLectureName}
        onChange={(e) => setNewLectureName(e.target.value)}
        onSubmit={addLecture}
        placeholder="Enter lecture name"
      />
      <ul className="space-y-2">
        {lectures.map((lecture) => (
          <li key={lecture.id} className="bg-gray-700 p-2 rounded flex justify-between items-center">
            <span>{lecture.name}</span>
            <button
              onClick={() => removeLecture(lecture.id)}
              className="text-red-500 hover:text-red-400"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};
