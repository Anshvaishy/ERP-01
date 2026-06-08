
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Counter } from '@/components/counter';

const placementStats = [
    { value: 95, label: 'Placement in CSE', suffix: '%' },
    { value: 2000, label: 'Job Offers Given', suffix: '+' },
    { value: 60, label: 'Multi-Million $ Companies', suffix: '+' },
    { value: 30, label: 'Highest Package (LPA)', suffix: ' LPA' },
    { value: 4.5, label: 'Average Package (LPA)', decimals: 1 },
    { value: 250, label: 'Top Recruiters', suffix: '+' },
];

export function PlacementsSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">Placements & Career Development</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto text-center">
                    The Training & Placement Cell at Obsidian Peak University prepares students through internships, aptitude training, and industry interactions. Top recruiters visit campus every year offering competitive packages.
                </p>
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
                    {placementStats.map(stat => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-primary">
                                <Counter end={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                            </p>
                            <p className="mt-2 text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild>
                        <Link href="/placements/overview">View Placement Report</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
