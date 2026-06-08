
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const newsUpdates = [
    { title: 'The Future of Commerce', imageId: 'course-ba', href: '/programs' },
    { title: 'AI in Business Analytics', imageId: 'course-ba', href: '/programs' },
    { title: 'Innovations in CSE', imageId: 'course-cs', href: '/programs' },
    { title: 'Agri-Tech Kisan Mela', imageId: 'about-image', href: '/campus-life/events' },
    { title: 'Mechanical Engg. Frontiers', imageId: 'course-me', href: '/programs' },
    { title: 'Advances in Biotechnology', imageId: 'course-psy', href: '/programs' },
];

export function NewsUpdatesSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                        Campus Highlights
                    </h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore the vibrant academic and research highlights from across our university.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsUpdates.map((item) => {
                    const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
                    return (
                        <Card key={item.title} className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <Link href={item.href} className="block">
                                <div className="relative h-48">
                                    {itemImage && (
                                        <Image
                                            src={itemImage.imageUrl}
                                            alt={itemImage.description}
                                            data-ai-hint={itemImage.imageHint}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                                </CardHeader>
                            </Link>
                        </Card>
                    );
                })}
                </div>
                <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/campus-life/events">
                            View All Highlights <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
