'use client';

import { useState, useRef } from 'react';

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

const handleKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  onSubmit: () => void,
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    onSubmit();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
};

export default function Home() {
  const lectureInputRef = useRef<HTMLInputElement>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
  const teacherInputRef = useRef<HTMLInputElement>(null);
  const gradeInputRef = useRef<HTMLInputElement>(null);
  const classInputRef = useRef<HTMLInputElement>(null);

  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const [newLectureName, setNewLectureName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherCapabilities, setNewTeacherCapabilities] = useState<string[]>([]);
  const [newTeacherRoom, setNewTeacherRoom] = useState('');
  const [newGradeName, setNewGradeName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const addLecture = () => {
    if (newLectureName) {
      setLectures([...lectures, { id: Date.now().toString(), name: newLectureName }]);
      setNewLectureName('');
    }
  };

  const addRoom = () => {
    if (newRoomName) {
      setRooms([...rooms, { id: Date.now().toString(), name: newRoomName }]);
      setNewRoomName('');
    }
  };

  const addTeacher = () => {
    if (newTeacherName && newTeacherCapabilities.length > 0) {
      setTeachers([...teachers, {
        id: Date.now().toString(),
        name: newTeacherName,
        capabilities: newTeacherCapabilities,
        assignedRoom: newTeacherRoom
      }]);
      setNewTeacherName('');
      setNewTeacherCapabilities([]);
      setNewTeacherRoom('');
    }
  };

  const [lectureHours, setLectureHours] = useState<{ [key: string]: number }>({});
  const addGrade = () => {
    if (newGradeName) {
      setGrades([...grades, {
        id: Date.now().toString(),
        name: newGradeName,
        requiredLectures: { ...lectureHours }
      }]);
      setNewGradeName('');
      setLectureHours({});
    }
  };

  const addClass = () => {
    if (newClassName && selectedGrade) {
      setClasses([...classes, {
        id: Date.now().toString(),
        name: newClassName,
        grade: selectedGrade
      }]);
      setNewClassName('');
      setSelectedGrade('');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Better Timetable</h1>
        <p className="text-gray-300">A comprehensive application for generating school timetables efficiently</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Lectures</h2>
          <div className="flex gap-2 mb-4">
            <input
              ref={lectureInputRef}
              type="text"
              value={newLectureName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLectureName(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, addLecture, lectureInputRef)}
              placeholder="Enter lecture name"
              className="flex-1 p-2 rounded bg-gray-700 text-white"
            />
            <button
              onClick={addLecture}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {lectures.map((lecture) => (
              <li key={lecture.id} className="bg-gray-700 p-2 rounded">
                {lecture.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Rooms</h2>
          <div className="flex gap-2 mb-4">
            <input
              ref={roomInputRef}
              type="text"
              value={newRoomName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRoomName(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, addRoom, roomInputRef)}
              placeholder="Enter room name"
              className="flex-1 p-2 rounded bg-gray-700 text-white"
            />
            <button
              onClick={addRoom}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {rooms.map((room) => (
              <li key={room.id} className="bg-gray-700 p-2 rounded">
                {room.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Teachers</h2>
          <div className="space-y-2 mb-4">
            <input
              ref={teacherInputRef}
              type="text"
              value={newTeacherName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTeacherName(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, addTeacher, teacherInputRef)}
              placeholder="Enter teacher name"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Teaching Capabilities:</label>
              <div className="space-y-2">
                {lectures.map((lecture) => (
                  <div key={lecture.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`capability-${lecture.id}`}
                      value={lecture.id}
                      checked={newTeacherCapabilities.includes(lecture.id)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                          setNewTeacherCapabilities([...newTeacherCapabilities, lecture.id]);
                        } else {
                          setNewTeacherCapabilities(newTeacherCapabilities.filter(id => id !== lecture.id));
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                    />
                    <label htmlFor={`capability-${lecture.id}`} className="ml-2 text-sm text-gray-300">
                      {lecture.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <select
              value={newTeacherRoom}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTeacherRoom(e.target.value)}
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
                  Capabilities: {teacher.capabilities.map(cap => {
                  const lecture = lectures.find(l => l.id === cap);
                  return lecture ? lecture.name : cap;
                }).join(', ')}
                </div>
                <div className="text-sm text-gray-400">
                  Room: {rooms.find(r => r.id === teacher.assignedRoom)?.name || 'None'}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Grades</h2>
          <div className="space-y-4">
            <input
              ref={gradeInputRef}
              type="text"
              value={newGradeName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGradeName(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, addGrade, gradeInputRef)}
              placeholder="Enter grade name"
              className="w-full p-2 rounded bg-gray-700 text-white"
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLectureHours({
                      ...lectureHours,
                      [lecture.id]: parseInt(e.target.value) || 0
                    })}
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
                <li key={grade.id} className="bg-gray-700 p-2 rounded">
                  <div className="font-medium">{grade.name}</div>
                  <div className="mt-2 space-y-1">
                    {Object.entries(grade.requiredLectures).map(([lectureId, hours]) => {
                      const lecture = lectures.find(l => l.id === lectureId);
                      return lecture ? (
                        <div key={lectureId} className="text-sm text-gray-400">
                          {lecture.name}: {hours} hours/week
                        </div>
                      ) : null;
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Classes</h2>
          <div className="space-y-2 mb-4">
            <input
              ref={classInputRef}
              type="text"
              value={newClassName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewClassName(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, addClass, classInputRef)}
              placeholder="Enter class name"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <select
              value={selectedGrade}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedGrade(e.target.value)}
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
              <li key={cls.id} className="bg-gray-700 p-2 rounded">
                <div>{cls.name}</div>
                <div className="text-sm text-gray-400">
                  Grade: {grades.find(g => g.id === cls.grade)?.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>


  );
}
