import React from 'react';
import { Input } from '../common/Input';
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
  removeTeacher: (id: string) => void;
  editTeacher: (id: string, name: string, capabilities: string[], assignedRoom?: string) => void;
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
  removeTeacher,
  editTeacher,
}) => {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editCapabilities, setEditCapabilities] = React.useState<string[]>([]);
  const [editRoom, setEditRoom] = React.useState<string>("");

  const startEditing = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setEditName(teacher.name);
    setEditCapabilities(teacher.capabilities);
    setEditRoom(teacher.assignedRoom || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
    setEditCapabilities([]);
    setEditRoom("");
  };

  const saveEditing = (id: string) => {
    editTeacher(id, editName, editCapabilities, editRoom || undefined);
    cancelEditing();
  };
  return (
    <SectionContainer title="Teachers">
      <div className="space-y-2 mb-4">
        <Input
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
          <li key={teacher.id} className="bg-gray-700 p-2 rounded flex justify-between items-start">
            {editingId === teacher.id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
                  placeholder="Teacher name"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teaching Capabilities:
                  </label>
                  <div className="space-y-2">
                    {lectures.map((lecture) => (
                      <div key={lecture.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`edit-capability-${lecture.id}`}
                          value={lecture.id}
                          checked={editCapabilities.includes(lecture.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditCapabilities([...editCapabilities, lecture.id]);
                            } else {
                              setEditCapabilities(
                                editCapabilities.filter((id) => id !== lecture.id)
                              );
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-600"
                        />
                        <label
                          htmlFor={`edit-capability-${lecture.id}`}
                          className="flex-1 text-sm text-gray-300"
                        >
                          {lecture.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Assigned Room:
                  </label>
                  <select
                    value={editRoom}
                    onChange={(e) => setEditRoom(e.target.value)}
                    className="w-full p-2 rounded bg-gray-600 text-white"
                  >
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    onClick={() => saveEditing(teacher.id)}
                    className="text-green-500 hover:text-green-700 px-2"
                  >
                    ✓
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="font-medium">{teacher.name}</div>
                  <div className="mt-2 space-y-1">
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
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(teacher)}
                    className="text-blue-500 hover:text-blue-700 px-2"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => removeTeacher(teacher.id)}
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
    </SectionContainer>
  );
};
