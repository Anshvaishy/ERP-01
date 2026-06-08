
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Counter } from '@/components/counter';

const researchStats = [
    { value: 22, label: 'Research & Consultancy Projects Completed' },
    { value: 3, label: 'Funding Received For R & C Projects', prefix: '', suffix: ' Cr.+' },
    { value: 90, label: 'Patents Granted/ Published', suffix: '+' },
    { value: 825, label: 'Research Papers Published', suffix: '+' },
    { value: 270, label: 'Books & Book Chapters Published', suffix: '+' },
    { value: 125, label: 'Ph.D. Awarded', suffix: '+' },
];

export function ResearchSection() {
    return (
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Excellent Research and Innovation Culture</h2>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {researchStats.map(stat => (
                        <div key={stat.label}>
                            <p className="text-4xl font-bold">
                                <Counter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </p>
                            <p className="mt-2 text-primary-foreground/80">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <Button asChild variant="secondary" className="mt-12">
                    <Link href="/research/overview">Know More</Link>
                </Button>
            </div>
        </section>
    );
}
