
'use client';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Counter } from '@/components/counter';

const stats = [
  { value: 25, label: 'Years of Experience', icon: Award, suffix: '+' },
  { value: 100, label: 'Number of Courses', icon: BookOpen, suffix: '+' },
  { value: 12000, label: 'Global Students', icon: Users, suffix: '+' },
  { value: 15000, label: 'Number of Placements', icon: GraduationCap, suffix: '+' },
];

export function AboutSection() {
    return (
        <section id="about" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                        Obsidian Peak University – Leading Private University in India
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Obsidian Peak University is a reputed private university in India known for academic excellence, innovation, and career-oriented education. The university offers diploma, undergraduate, and postgraduate programs across multiple disciplines with a strong focus on research, placements, and industry collaboration.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center p-4 rounded-lg">
                            <stat.icon className="w-12 h-12 text-primary" />
                            <p className="text-3xl md:text-4xl font-bold mt-2">
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Button asChild>
                        <Link href="/about/university">
                            Find Out More about us <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
