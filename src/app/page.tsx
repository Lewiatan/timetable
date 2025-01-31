'use client';

import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../../utils/localStorage';
import { LectureSection } from './components/sections/LectureSection';
import { RoomSection } from './components/sections/RoomSection';
import { TeacherSection } from './components/sections/TeacherSection';
import { GradeSection } from './components/sections/GradeSection';
import { ClassSection } from './components/sections/ClassSection';
import { TimetableSection } from './components/TimetableSection';
import { removeItem } from '@/utils/removeItem';

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
  const [lectures, setLectures] = useState<Lecture[]>(() => loadFromStorage('lectures', []));
  const [rooms, setRooms] = useState<Room[]>(() => loadFromStorage('rooms', []));
  const [teachers, setTeachers] = useState<Teacher[]>(() => loadFromStorage('teachers', []));
  const [grades, setGrades] = useState<Grade[]>(() => loadFromStorage('grades', []));
  const [classes, setClasses] = useState<Class[]>(() => loadFromStorage('classes', []));

  useEffect(() => { saveToStorage('lectures', lectures); }, [lectures]);
  useEffect(() => { saveToStorage('rooms', rooms); }, [rooms]);
  useEffect(() => { saveToStorage('teachers', teachers); }, [teachers]);
  useEffect(() => { saveToStorage('grades', grades); }, [grades]);
  useEffect(() => { saveToStorage('classes', classes); }, [classes]);
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

  const removeLecture = (id: string) => {
    removeItem('lectures', id, lectures, setLectures);
  };

  const editLecture = (id: string, name: string) => {
    const updatedLectures = lectures.map(lecture =>
      lecture.id === id ? { ...lecture, name } : lecture
    );
    setLectures(updatedLectures);
  };

  const addRoom = () => {
    if (newRoomName) {
      setRooms([...rooms, { id: Date.now().toString(), name: newRoomName }]);
      setNewRoomName('');
    }
  };

  const removeRoom = (id: string) => {
    removeItem('rooms', id, rooms, setRooms);
  };

  const editRoom = (id: string, name: string) => {
    const updatedRooms = rooms.map(room =>
      room.id === id ? { ...room, name } : room
    );
    setRooms(updatedRooms);
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

  const removeTeacher = (id: string) => {
    removeItem('teachers', id, teachers, setTeachers);
  };

  const editTeacher = (id: string, name: string, capabilities: string[], assignedRoom?: string) => {
    const updatedTeachers = teachers.map(teacher =>
      teacher.id === id ? { ...teacher, name, capabilities, assignedRoom } : teacher
    );
    setTeachers(updatedTeachers);
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

  const removeGrade = (id: string) => {
    removeItem('grades', id, grades, setGrades);
  };

  const editGrade = (id: string, name: string, requiredLectures: { [key: string]: number }) => {
    const updatedGrades = grades.map(grade =>
      grade.id === id ? { ...grade, name, requiredLectures } : grade
    );
    setGrades(updatedGrades);
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

  const removeClass = (id: string) => {
    removeItem('classes', id, classes, setClasses);
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
          removeLecture={removeLecture}
          editLecture={editLecture}
        />

        <RoomSection
          rooms={rooms}
          newRoomName={newRoomName}
          setNewRoomName={setNewRoomName}
          addRoom={addRoom}
          removeRoom={removeRoom}
          editRoom={editRoom}
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
          removeTeacher={removeTeacher}
          editTeacher={editTeacher}
        />

        <GradeSection
          grades={grades}
          lectures={lectures}
          newGradeName={newGradeName}
          lectureHours={lectureHours}
          setNewGradeName={setNewGradeName}
          setLectureHours={setLectureHours}
          addGrade={addGrade}
          removeGrade={removeGrade}
          editGrade={editGrade}
        />

        <ClassSection
          classes={classes}
          grades={grades}
          newClassName={newClassName}
          selectedGrade={selectedGrade}
          setNewClassName={setNewClassName}
          setSelectedGrade={setSelectedGrade}
          addClass={addClass}
          removeClass={removeClass}
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
