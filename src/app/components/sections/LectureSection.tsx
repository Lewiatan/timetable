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
  editLecture: (id: string, name: string) => void;
}

export const LectureSection: React.FC<LectureSectionProps> = ({
  lectures,
  newLectureName,
  setNewLectureName,
  addLecture,
  removeLecture,
  editLecture,
}) => {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState("");

  const handleEdit = (lecture: Lecture) => {
    setEditingId(lecture.id);
    setEditValue(lecture.name);
  };

  const handleSaveEdit = (id: string) => {
    if (editValue.trim()) {
      editLecture(id, editValue.trim());
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

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
            {editingId === lecture.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-gray-600 text-white px-2 py-1 rounded flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveEdit(lecture.id);
                    } else if (e.key === 'Escape') {
                      handleCancelEdit();
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={() => handleSaveEdit(lecture.id)}
                  className="text-green-500 hover:text-green-400 px-2"
                >
                  ✓
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-400 px-2"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <span>{lecture.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleEdit(lecture)}
                    className="text-blue-500 hover:text-blue-400 px-2"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => removeLecture(lecture.id)}
                    className="text-red-500 hover:text-red-400 px-2"
                  >
                    ×
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};
