
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const admissionPaths = [
    { title: "After Class 10th", description: "Explore a range of design and polytechnic courses.", href: "/programs" },
    { title: "After Class 12th", description: "Choose from a wide array of undergraduate programs.", href: "/programs" },
    { title: "Industry Honors", description: "Specialized programs in collaboration with industry leaders.", href: "/programs" },
    { title: "After Graduation", description: "Advance your career with our postgraduate degrees.", href: "/programs" },
    { title: "After Polytechnic", description: "Lateral entry options for diploma holders.", href: "/programs" },
    { title: "After Post Graduation", description: "Pursue research and innovation with our Ph.D. programs.", href: "/research/phd" },
];

export function AdmissionsSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Admissions 2026 – Apply Online</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Obsidian Peak University admissions are transparent and merit-based. Students can apply online, upload documents, and track admission status through the official portal.
                </p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {admissionPaths.map(path => (
                        <Card key={path.title} className="text-left">
                            <CardHeader>
                                <CardTitle className="font-headline">{path.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{path.description}</p>
                                <Button asChild variant="link" className="px-0 mt-2">
                                    <Link href={path.href}>
                                        Read more <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Button asChild size="lg" className="mt-12">
                    <Link href="/register">Apply Now</Link>
                </Button>
            </div>
        </section>
    );
}
