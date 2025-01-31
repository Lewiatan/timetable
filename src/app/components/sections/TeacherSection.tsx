import React from 'react';
import { InputWithButton } from '../common/InputWithButton';
import { SectionContainer } from '../common/SectionContainer';

interface Teacher {
  id: string;
  name: string;
  capabilities: string[];
  assignedRoom?: string;
}

interface Lecture {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
}

interface TeacherSectionProps {
  teachers: Teacher[];
  lectures: Lecture[];
  rooms: Room[];
  newTeacherName: string;
  newTeacherCapabilities: string[];
  newTeacherRoom: string;
  setNewTeacherName: (name: string) => void;
  setNewTeacherCapabilities: (capabilities: string[]) => void;
  setNewTeacherRoom: (roomId: string) => void;
  addTeacher: () => void;
}

export const TeacherSection: React.FC<TeacherSectionProps> = ({
  teachers,
  lectures,
  rooms,
  newTeacherName,
  newTeacherCapabilities,
  newTeacherRoom,
  setNewTeacherName,
  setNewTeacherCapabilities,
  setNewTeacherRoom,
  addTeacher,
}) => {
  return (
    <SectionContainer title="Teachers">
      <div className="space-y-2 mb-4">
        <InputWithButton
          value={newTeacherName}
          onChange={(e) => setNewTeacherName(e.target.value)}
          onSubmit={addTeacher}
          placeholder="Enter teacher name"
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Teaching Capabilities:
          </label>
          <div className="space-y-2">
            {lectures.map((lecture) => (
              <div key={lecture.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`capability-${lecture.id}`}
                  value={lecture.id}
                  checked={newTeacherCapabilities.includes(lecture.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewTeacherCapabilities([...newTeacherCapabilities, lecture.id]);
                    } else {
                      setNewTeacherCapabilities(
                        newTeacherCapabilities.filter((id) => id !== lecture.id)
                      );
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                />
                <label
                  htmlFor={`capability-${lecture.id}`}
                  className="ml-2 text-sm text-gray-300"
                >
                  {lecture.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <select
          value={newTeacherRoom}
          onChange={(e) => setNewTeacherRoom(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <button
          onClick={addTeacher}
          className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Teacher
        </button>
      </div>
      <ul className="space-y-2">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="bg-gray-700 p-2 rounded">
            <div>{teacher.name}</div>
            <div className="text-sm text-gray-400">
              Capabilities:{' '}
              {teacher.capabilities
                .map((cap) => {
                  const lecture = lectures.find((l) => l.id === cap);
                  return lecture ? lecture.name : cap;
                })
                .join(', ')}
            </div>
            <div className="text-sm text-gray-400">
              Room: {rooms.find((r) => r.id === teacher.assignedRoom)?.name || 'None'}
            </div>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};