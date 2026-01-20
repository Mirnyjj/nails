"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Некорректный номер телефона"),
  service: z.string().optional(),
  date: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(
  formData: FormData
): Promise<ContactActionResult> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string | undefined,
      date: formData.get("date") as string | undefined,
      message: formData.get("message") as string | undefined,
    };

    // Validate
    const validationResult = contactSchema.safeParse(rawData);
    if (!validationResult.success) {
      return {
        success: false,
        message: "Ошибка валидации данных",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const data = validationResult.data;

    // Save to Supabase (you can create a contact_submissions table)
    const supabase = await createServerSupabaseClient();

    // For now, we'll just log it. You can create a table for submissions:
    // CREATE TABLE contact_submissions (
    //   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    //   name TEXT NOT NULL,
    //   phone TEXT NOT NULL,
    //   service_id UUID REFERENCES services(id),
    //   preferred_date DATE,
    //   message TEXT,
    //   created_at TIMESTAMPTZ DEFAULT NOW()
    // );

    console.log("Contact form submission:", data);

    // In production, you might want to:
    // 1. Insert into contact_submissions table
    // 2. Send email notification
    // 3. Send to CRM

    return {
      success: true,
      message: "Заявка успешно отправлена! Свяжусь с вами в ближайшее время.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "Произошла ошибка при отправке формы. Попробуйте позже.",
    };
  }
}
