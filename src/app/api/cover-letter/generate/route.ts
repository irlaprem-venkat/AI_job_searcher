import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription, companyName, roleTitle } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: 'Missing credentials for cover letter' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({
          coverLetter: `Dear Hiring Manager at ${companyName || 'the company'},\n\nI am thrilled to apply for the ${roleTitle || 'open'} position. My background fits the requirements perfectly.\n\nBest regards,\nCandidate`
        });
    }

    const prompt = `
      Write a professional, compelling cover letter (max 300 words) for the ${roleTitle} role at ${companyName}.
      Base the letter on the following resume and job description. Do not include placeholders like "[Your Name]".
      Simply write the body of the cover letter.

      Resume:
      ${resumeText}

      Job description:
      ${jobDescription}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: 'You are an expert career coach writing a cover letter.' }, { role: 'user', content: prompt }],
    });

    return NextResponse.json({ coverLetter: response.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
