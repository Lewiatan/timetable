import React, { useState } from 'react';
import { Input } from '../common/Input';
import { SectionContainer } from '../common/SectionContainer';

interface Grade {
  id: string;
  name: string;
  requiredLectures: { [key: string]: number };
}

interface Lecture {
  id: string;
  name: string;
}

interface GradeSectionProps {
  grades: Grade[];
  lectures: Lecture[];
  newGradeName: string;
  lectureHours: { [key: string]: number };
  setNewGradeName: (name: string) => void;
  setLectureHours: (hours: { [key: string]: number }) => void;
  addGrade: () => void;
  removeGrade: (id: string) => void;
  editGrade: (id: string, name: string, requiredLectures: { [key: string]: number }) => void;
}

export const GradeSection: React.FC<GradeSectionProps> = ({
  grades,
  lectures,
  newGradeName,
  lectureHours,
  setNewGradeName,
  setLectureHours,
  addGrade,
  removeGrade,
  editGrade,
}) => {
  const [editingGrade, setEditingGrade] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editHours, setEditHours] = useState<{ [key: string]: number }>({});
  return (
    <SectionContainer title="Grades">
      <div className="space-y-4">
        <Input
          value={newGradeName}
          onChange={(e) => setNewGradeName(e.target.value)}
          onSubmit={addGrade}
          placeholder="Enter grade name"
        />
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Weekly Hours per Lecture:</h3>
          {lectures.map((lecture) => (
            <div key={lecture.id} className="flex items-center gap-2">
              <label className="flex-1 text-sm text-gray-300">{lecture.name}:</label>
              <input
                type="number"
                min="0"
                value={lectureHours[lecture.id] || 0}
                onChange={(e) =>
                  setLectureHours({
                    ...lectureHours,
                    [lecture.id]: parseInt(e.target.value) || 0,
                  })
                }
                className="w-20 p-2 rounded bg-gray-700 text-white"
              />
            </div>
          ))}
        </div>
        <button
          onClick={addGrade}
          className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Grade
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Existing Grades:</h3>
        <ul className="space-y-2">
          {grades.map((grade) => (
            <li key={grade.id} className="bg-gray-700 p-2 rounded flex justify-between items-start">
              {editingGrade === grade.id ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
                  />
                  <div className="space-y-2">
                    {lectures.map((lecture) => (
                      <div key={lecture.id} className="flex items-center gap-2">
                        <label className="flex-1 text-sm text-gray-300">{lecture.name}:</label>
                        <input
                          type="number"
                          min="0"
                          value={editHours[lecture.id] || 0}
                          onChange={(e) =>
                            setEditHours({
                              ...editHours,
                              [lecture.id]: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-20 p-2 rounded bg-gray-600 text-white"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        editGrade(grade.id, editName, editHours);
                        setEditingGrade(null);
                      }}
                      className="text-green-500 hover:text-green-700 px-2"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditingGrade(null)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="font-medium">{grade.name}</div>
                    <div className="mt-2 space-y-1">
                      {Object.entries(grade.requiredLectures).map(([lectureId, hours]) => {
                        const lecture = lectures.find((l) => l.id === lectureId);
                        return lecture ? (
                          <div key={lectureId} className="text-sm text-gray-400">
                            {lecture.name}: {hours} hours/week
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingGrade(grade.id);
                        setEditName(grade.name);
                        setEditHours(grade.requiredLectures);
                      }}
                      className="text-blue-500 hover:text-blue-700 px-2"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => removeGrade(grade.id)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ×
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  );
};
