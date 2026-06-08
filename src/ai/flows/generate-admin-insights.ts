'use server';
/**
 * @fileOverview Generates a natural language summary of key admin dashboard metrics.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminInsightsInputSchema = z.object({
  pendingAdmissions: z.number().describe('Number of new admission requests awaiting review.'),
  pendingGrievances: z.number().describe('Number of student grievances that are still pending.'),
  lowAttendanceCourses: z.array(z.string()).describe('A list of course names with attendance below 75%.'),
});
export type AdminInsightsInput = z.infer<typeof AdminInsightsInputSchema>;

const AdminInsightsOutputSchema = z.object({
  summary: z.string().describe('A friendly, natural language summary of the key metrics, highlighting the most important items for the admin to address. Start with a friendly greeting like "Good morning!" or "Here\'s your daily brief:".'),
});
export type AdminInsightsOutput = z.infer<typeof AdminInsightsOutputSchema>;

export async function generateAdminInsights(
  input: AdminInsightsInput
): Promise<AdminInsightsOutput> {
  return generateAdminInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdminInsightsPrompt',
  input: {schema: AdminInsightsInputSchema},
  output: {schema: AdminInsightsOutputSchema},
  prompt: `You are an expert administrative assistant for a university. Your task is to provide a concise, friendly, and actionable summary based on the following data points.

Data:
- Pending Admission Requests: {{{pendingAdmissions}}}
- Pending Grievances: {{{pendingGrievances}}}
- Courses with Low Attendance: {{#if lowAttendanceCourses}}{{#each lowAttendanceCourses}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}

Generate a summary that an admin can quickly read to understand the most urgent tasks. For example, if there are pending admissions, mention that. If there are low attendance courses, point them out. If everything is clear, provide a positive and encouraging message.
`,
});

const generateAdminInsightsFlow = ai.defineFlow(
  {
    name: 'generateAdminInsightsFlow',
    inputSchema: AdminInsightsInputSchema,
    outputSchema: AdminInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
