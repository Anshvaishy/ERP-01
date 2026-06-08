
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { db, Subject } from "@/lib/local-storage-db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { PasswordInput } from "@/components/password-input"
import { Loader2 } from "lucide-react"

const registerSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    class: z.string().min(1, "Please select a course"),
    dob: z.string().min(1, "Date of birth is required"),
    contact: z.string().min(10, "Invalid mobile number"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [courses, setCourses] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const allSubjects: Subject[] = db.getAll('subjects');
    const classNames = [...new Set(allSubjects.map(s => s.class))];
    setCourses(classNames.sort());
  }, []);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      class: "",
      dob: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    setIsPending(true);
    setTimeout(() => {
        try {
            const existingStudent = db.getAll('students').find(s => s.email === data.email);
            const existingAdmission = db.getAll('admissions').find(a => a.email === data.email);
            
            if (existingStudent || existingAdmission) {
                 toast({
                    variant: "destructive",
                    title: "Registration Error",
                    description: "This email is already registered or has a pending application.",
                });
                setIsPending(false);
                return;
            }

            const newAdmission = {
                id: `ADM${Date.now()}`,
                date: new Date().toISOString(),
                status: 'Pending' as 'Pending',
                ...data
            };
            db.add('admissions', newAdmission);

            toast({
                title: "Registration Successful",
                description: "Your application has been submitted for review.",
            });
            router.push("/register/success");
        } catch(e: any) {
             toast({
                variant: "destructive",
                title: "Registration Error",
                description: e.message || "An unknown error occurred.",
            });
        } finally {
            setIsPending(false);
        }
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Applying For</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
        </Button>
      </form>
    </Form>
  )
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-lg py-8">
        <Link href="/" className="flex justify-center items-center mb-6 text-foreground">
          <Logo className="h-8 w-8 mr-2"/>
          <span className="text-2xl font-bold font-headline">Obsidian Peak</span>
        </Link>
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Admission Application 2026</CardTitle>
            <CardDescription>Fill out the form to begin your journey with us.</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>
              <Button variant="link" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
