import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {nextJSHandler} from '@genkit-ai/next';

import '@/ai/flows/personalized-dashboard-tips';
import '@/ai/flows/summarize-feedback';
import '@/ai/flows/generate-course-descriptions';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

export const POST = nextJSHandler();
