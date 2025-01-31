'use client';

import { useState } from 'react';
import { LectureSection } from './components/sections/LectureSection';
import { RoomSection } from './components/sections/RoomSection';
import { TeacherSection } from './components/sections/TeacherSection';
import { GradeSection } from './components/sections/GradeSection';
import { ClassSection } from './components/sections/ClassSection';
import { TimetableSection } from './components/TimetableSection';

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

export default function Home() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [timetable, setTimetable] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [newLectureName, setNewLectureName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherCapabilities, setNewTeacherCapabilities] = useState<string[]>([]);
  const [newTeacherRoom, setNewTeacherRoom] = useState('');
  const [newGradeName, setNewGradeName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [lectureHours, setLectureHours] = useState<{ [key: string]: number }>({});

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

  const generateTimetable = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lectures,
          rooms,
          teachers,
          grades,
          classes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate timetable');
      }

      const data = await response.json();
      setTimetable(data.timetable);
    } catch (error) {
      console.error('Error generating timetable:', error);
      alert('Failed to generate timetable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Better Timetable</h1>
        <p className="text-gray-300">A comprehensive application for generating school timetables efficiently</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LectureSection
          lectures={lectures}
          newLectureName={newLectureName}
          setNewLectureName={setNewLectureName}
          addLecture={addLecture}
        />

        <RoomSection
          rooms={rooms}
          newRoomName={newRoomName}
          setNewRoomName={setNewRoomName}
          addRoom={addRoom}
        />

        <TeacherSection
          teachers={teachers}
          lectures={lectures}
          rooms={rooms}
          newTeacherName={newTeacherName}
          newTeacherCapabilities={newTeacherCapabilities}
          newTeacherRoom={newTeacherRoom}
          setNewTeacherName={setNewTeacherName}
          setNewTeacherCapabilities={setNewTeacherCapabilities}
          setNewTeacherRoom={setNewTeacherRoom}
          addTeacher={addTeacher}
        />

        <GradeSection
          grades={grades}
          lectures={lectures}
          newGradeName={newGradeName}
          lectureHours={lectureHours}
          setNewGradeName={setNewGradeName}
          setLectureHours={setLectureHours}
          addGrade={addGrade}
        />

        <ClassSection
          classes={classes}
          grades={grades}
          newClassName={newClassName}
          selectedGrade={selectedGrade}
          setNewClassName={setNewClassName}
          setSelectedGrade={setSelectedGrade}
          addClass={addClass}
        />
      </div>

      <TimetableSection
        lectures={lectures}
        rooms={rooms}
        teachers={teachers}
        grades={grades}
        classes={classes}
        onGenerateTimetable={generateTimetable}
        timetable={timetable}
        isLoading={isLoading}
      />
    </div>
  );
}
