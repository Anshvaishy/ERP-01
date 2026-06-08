
'use client';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const programTabsData = {
    "Undergraduate": ["Microbiology", "Nutrition & Dietetics", "Artificial Intelligence", "Computer Science Engineering", "Computer Application", "Agriculture", "Biotechnology", "Engineering", "Management", "Commerce and Economics", "Media Studies (Journalism)", "Legal Studies (Law)", "Pharmacy", "Allied Health Sciences", "Natural Sciences", "Humanities"],
    "Postgraduate": ["M.Tech", "MBA", "M.Sc", "M.A.", "MCA"],
    "Integrated": ["B.Tech + M.Tech", "B.Tech + MBA"],
    "Polytechnic (Diploma)": ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering"],
    "Industry Honors": ["B.Tech. in CSE (AI & ML)", "B.Tech. in CSE (Cyber Security)", "B.B.A. in Business Analytics"],
};

export function ProgramsSection() {
    return (
        <section id="programs" className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                    Academic Programs
                </h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                    The academic framework at Obsidian Peak University is designed to meet national and global education standards. Outcome-based education, continuous evaluation, project-based learning, and digital resources ensure quality teaching and learning. Each program emphasizes employability, skill development, and practical exposure.
                </p>
                <Tabs defaultValue="Undergraduate" className="mt-12 max-w-5xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto flex-wrap">
                        {Object.keys(programTabsData).map(tab => (
                            <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
                        ))}
                    </TabsList>
                    {Object.entries(programTabsData).map(([tab, courses]) => (
                        <TabsContent key={tab} value={tab}>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-left mt-8">
                                {courses.map(course => (
                                    <Link href="/programs" key={course} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                                        <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span>{course}</span>
                                    </Link>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
                <Button asChild className="mt-8">
                    <Link href="/programs">View All Programs</Link>
                </Button>
            </div>
        </section>
    );
}
