// backend/config/env.js
import 'dotenv/config';
const required = ['JWT_SECRET', 'GROQ_API_KEY', 'DATABASE_URL'];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
}
export const env = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  groqApiKey: process.env.GROQ_API_KEY,
  databaseUrl: process.env.DATABASE_URL,
};