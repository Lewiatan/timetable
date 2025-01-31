import { NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function POST(request: Request) {
  try {
    const { lectures, rooms, teachers, grades, classes } = await request.json();

    const prompt = PromptTemplate.fromTemplate(`
      Generate a school timetable based on the following data:

      Lectures: {lectures}
      Rooms: {rooms}
      Teachers: {teachers}
      Grades: {grades}
      Classes: {classes}

      Please create a weekly timetable that:
      1. Distributes lectures evenly throughout the week
      2. Ensures teachers are not double-booked
      3. Assigns appropriate rooms based on availability
      4. Meets the required lecture hours for each grade
      5. Considers teacher capabilities and assigned rooms
      6. Includes appropriate breaks between lectures
      7. Operates between 8:00 AM and 4:00 PM
      8. Has 45-minute lecture slots with 10-minute breaks

      Format the timetable in a clear, readable structure.
    `);

    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      maxOutputTokens: 2048,
      temperature: 0.7,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const outputParser = new StringOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    const response = await chain.invoke({
      lectures: JSON.stringify(lectures, null, 2),
      rooms: JSON.stringify(rooms, null, 2),
      teachers: JSON.stringify(teachers, null, 2),
      grades: JSON.stringify(grades, null, 2),
      classes: JSON.stringify(classes, null, 2),
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
