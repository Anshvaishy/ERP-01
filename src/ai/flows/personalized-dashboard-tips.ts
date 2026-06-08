'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized dashboard tips for students based on their academic performance and interests.
 *
 * - `getPersonalizedDashboardTips` - An async function that takes a student's profile information and returns personalized tips.
 * - `PersonalizedDashboardTipsInput` - The input type for the `getPersonalizedDashboardTips` function.
 * - `PersonalizedDashboardTipsOutput` - The output type for the `getPersonalizedDashboardTips` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedDashboardTipsInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  academicPerformance: z
    .string()
    .describe(
      "A summary of the student's academic performance, including grades, attendance, and any areas of concern."
    ),
  interests: z
    .string()
    .describe('The student’s interests, hobbies, and career goals.'),
});
export type PersonalizedDashboardTipsInput = z.infer<
  typeof PersonalizedDashboardTipsInputSchema
>;

const PersonalizedDashboardTipsOutputSchema = z.object({
  tips: z
    .array(z.string())
    .describe('A list of personalized tips and suggestions for the student.'),
});
export type PersonalizedDashboardTipsOutput = z.infer<
  typeof PersonalizedDashboardTipsOutputSchema
>;

export async function getPersonalizedDashboardTips(
  input: PersonalizedDashboardTipsInput
): Promise<PersonalizedDashboardTipsOutput> {
  return personalizedDashboardTipsFlow(input);
}

const personalizedDashboardTipsPrompt = ai.definePrompt({
  name: 'personalizedDashboardTipsPrompt',
  input: {schema: PersonalizedDashboardTipsInputSchema},
  output: {schema: PersonalizedDashboardTipsOutputSchema},
  prompt: `You are an AI assistant providing personalized tips and suggestions to university students.

  Based on the student's academic performance and interests, provide 3 actionable tips to help them succeed.

  Student Name: {{{studentName}}}
  Academic Performance: {{{academicPerformance}}}
  Interests: {{{interests}}}

  Tips:`,
});

const personalizedDashboardTipsFlow = ai.defineFlow(
  {
    name: 'personalizedDashboardTipsFlow',
    inputSchema: PersonalizedDashboardTipsInputSchema,
    outputSchema: PersonalizedDashboardTipsOutputSchema,
  },
  async input => {
    const {output} = await personalizedDashboardTipsPrompt(input);
    return output!;
  }
);
