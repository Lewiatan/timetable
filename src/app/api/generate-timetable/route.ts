import { NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { lectures, rooms, teachers, grades, classes } = requestBody;

    // Build enhanced class objects with all related data
    const enhancedClasses = classes.map(cls => {
      const grade = grades.find(g => g.id === cls.grade);
      const requiredLectures = grade ? grade.requiredLectures : {};

      // Get all teachers that can teach the required lectures
      const relevantTeachers = teachers.filter(teacher =>
        Object.keys(requiredLectures).some(lectureId =>
          teacher.capabilities.includes(lectureId)
        )
      );

      return {
        ...cls,
        gradeData: grade,
        requiredLectures: Object.entries(requiredLectures).map(([lectureId, hours]) => ({
          lecture: lectures.find(l => l.id === lectureId),
          hours: hours,
          possibleTeachers: relevantTeachers.filter(t =>
            t.capabilities.includes(lectureId)
          ).map(t => ({
            ...t,
            assignedRoom: t.assignedRoom ? rooms.find(r => r.id === t.assignedRoom) : null
          }))
        }))
      };
    });

    const prompt = PromptTemplate.fromTemplate(`
      Generate a school timetable based on the following data:
      
      Classes: {classes}
      
      The available time slots:
      8:00 - 8:45
      8:55 - 9:40
      9:50 - 10:35
      10:55 - 11:40
      11:50 - 12:35
      12:45 - 13:30
      13:40 - 14:25
      14:35 - 15:20
      15:30 - 16:15
      16:25 - 17:10
      
      The rules:
      * Each class should have its own timetable
      * Assign teacher to each lecture based on it's capabilities
      * Take into count that each teacher has it's own capabilities of running lectures
      * Respect room capacities when scheduling lectures based on the teacher assigned
      * Consider teacher capabilities and assigned rooms
      * Consider only the available time slots provided
      * Do not add any additional lunch breaks or other breaks
      * Do not assign more lectures per week that it's required by the grade

      Please create a weekly timetable for each of the classes that:
      * Distributes lectures evenly throughout the week for each class
      * Ensures teachers are not double-booked
      * Assigns appropriate rooms based on availability and the teacher
      * Meets the required lecture hours for each grade
      * Ensures that the class has only the lessons that the grade that is has assigned to is requiring
      * The timetable does not have to cover whole week. The most important part is to have the exact number of lectures that is assigned to a grade

      Format the timetable in markdown table for each class.
    `);

    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      temperature: 0.0,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const outputParser = new StringOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    const response = await chain.invoke({
      classes: JSON.stringify(enhancedClasses, null, 2),
    });

    return NextResponse.json({ timetable: response });
  } catch (error) {
    console.error('Error in generate-timetable:', error);
    return NextResponse.json(
      { error: 'Failed to generate timetable' },
      { status: 500 }
    );
  }
}
