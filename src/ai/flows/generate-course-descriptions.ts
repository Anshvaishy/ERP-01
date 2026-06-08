// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating course descriptions based on keywords and constraints.
 *
 * It exports:
 * - `generateCourseDescription`: A function that takes `GenerateCourseDescriptionInput` and returns a `Promise` of `GenerateCourseDescriptionOutput`.
 * - `GenerateCourseDescriptionInput`: The input type for the `generateCourseDescription` function.
 * - `GenerateCourseDescriptionOutput`: The output type for the `generateCourseDescription` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords describing the course content and focus.'),
  constraints:
    z.string().describe('Constraints for the description, such as target audience or length.'),
});

export type GenerateCourseDescriptionInput = z.infer<
  typeof GenerateCourseDescriptionInputSchema
>;

const GenerateCourseDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated course description.'),
});

export type GenerateCourseDescriptionOutput = z.infer<
  typeof GenerateCourseDescriptionOutputSchema
>;

export async function generateCourseDescription(
  input: GenerateCourseDescriptionInput
): Promise<GenerateCourseDescriptionOutput> {
  return generateCourseDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseDescriptionPrompt',
  input: {schema: GenerateCourseDescriptionInputSchema},
  output: {schema: GenerateCourseDescriptionOutputSchema},
  prompt: `You are an expert copywriter specialized in writing engaging course descriptions for university websites.

  Based on the following keywords and constraints, generate an attractive course description.

  Keywords: {{{keywords}}}
  Constraints: {{{constraints}}}
  `,
});

const generateCourseDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCourseDescriptionFlow',
    inputSchema: GenerateCourseDescriptionInputSchema,
    outputSchema: GenerateCourseDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
