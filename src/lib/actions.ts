"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { sendThankYouEmail } from "@/lib/emailjs-client";

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  rating: z.coerce.number().min(1).max(5),
})

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitFeedback(prevState: any, formData: FormData) {
  const validatedFields = feedbackSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, feedback, rating } = validatedFields.data;

  console.log("Feedback received:", { name, email, feedback, rating });

  try {
    await sendThankYouEmail({
      to_email: email,
      name,
    });
  } catch (error) {
    console.error("Failed to send thank you email:", error);
    // Optionally return an error state to the UI
  }

  return {
    message: "Thank you for your feedback!",
  };
}

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  console.log("Contact form submitted:", validatedFields.data)
  return {
    message: "Your message has been sent. We will get back to you shortly.",
  }
}

export async function handleGenericForm(prevState: any, formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const formName = rawFormData.form_name || 'generic_form';
    console.log(`[${formName}] form submitted with data:`, rawFormData);
    if(rawFormData.path) {
        revalidatePath(rawFormData.path as string);
    }
    return { message: `${formName.toString().replace(/_/g, ' ')} settings saved.` };
}
