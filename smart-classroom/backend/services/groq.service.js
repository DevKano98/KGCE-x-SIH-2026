// backend/services/groq.service.js
import { env } from '../config/env.js';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

async function requestGroq(messages) {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.groqApiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.3,
      messages,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || 'Groq request failed');
  }

  return data.choices?.[0]?.message?.content?.trim() || '';
}

export async function askTutor(subject, topic, question) {
  return requestGroq([
    {
      role: 'system',
      content: `You are a patient academic tutor helping a student with ${subject}${topic ? `, topic: ${topic}` : ''}. Explain clearly, accurately, and step by step where useful.`,
    },
    { role: 'user', content: question },
  ]);
}

export async function generateQuiz(subject, topic) {
  const content = await requestGroq([
    {
      role: 'system',
      content: 'Return only valid JSON. No markdown, no preamble.',
    },
    {
      role: 'user',
      content: `Generate 5 MCQs on ${topic} in ${subject}. Format: [{"question":"","options":["","","",""],"answer":""}]`,
    },
  ]);

  return JSON.parse(content.replace(/```json|```/g, '').trim());
}
