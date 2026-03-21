import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: 'Missing resume or job description' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
       // Mock response if no key is provided yet
       return NextResponse.json({
         matchScore: Math.floor(Math.random() * (99 - 70) + 70), // Random 70-99
         analysis: "Based on the mock analysis, your skills align closely with the requirements."
       });
    }

    const prompt = `
      You are an expert AI Recruiter. Analyze the following resume and job description.
      Yield an JSON object containing:
      - "matchScore": an integer from 0 to 100 representing how well the candidate fits the role.
      - "analysis": a 2-3 sentence explanation of the score.

      Resume:
      ${resumeText}

      Job Description:
      ${jobDescription}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" }
    });

    const resultText = response.choices[0].message.content || '{}';
    const result = JSON.parse(resultText);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
