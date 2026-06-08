

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Shield, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const studentLinks = [
    {
        title: "Student Panel",
        description: "Access your courses, attendance, grades, and more.",
        href: "/login",
        icon: LayoutDashboard,
    },
    {
        title: "Result Portal",
        description: "View your official examination results and GPA.",
        href: "/login",
        icon: BookOpen,
    },
    {
        title: "Grievance Redressal",
        description: "Submit and track grievances with the university.",
        href: "/contact",
        icon: Shield,
    },
];

export default function StudentCornerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
              Student Corner
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Your one-stop portal for all student-related services and information.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentLinks.map((item) => (
                <Card key={item.title}>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <item.icon className="w-8 h-8 text-primary" />
                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        <Button asChild variant="link" className="px-0">
                            <Link href={item.href}>
                                Go to {item.title} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
