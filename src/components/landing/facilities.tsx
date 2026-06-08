
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Lightbulb, Building, FlaskConical, Newspaper, BookOpen, Users } from 'lucide-react';

const facilities = [
    { id: 'facilities', title: 'Facilities', icon: Building, description: "Obsidian Peak University’s state-of-the-art campus is designed to foster academic excellence, personal growth, and community engagement.", imageId: 'facilities-campus', href: '/campus-life/facilities' },
    { id: 'green', title: 'Green Initiatives', icon: Lightbulb, description: "We strive to create a campus culture that embraces environmentally conscious practices, extending from classrooms to wider community spaces.", imageId: 'facilities-green', href: '/campus-life/green' },
    { id: 'clubs', title: 'Clubs', icon: Users, description: "Joining a student club at Obsidian Peak University isn't just about finding a hobby; it's a transformative experience.", imageId: 'facilities-clubs', href: '/campus-life/clubs' },
    { id: 'innovation', title: 'Innovation', icon: FlaskConical, description: "Rooted in a culture of originality and forward-thinking, the university places a premium on creative exploration and novel solutions.", imageId: 'facilities-innovation', href: '/research/innovation' },
    { id: 'consultancy', title: 'Consultancy', icon: BookOpen, description: "Positioned as a bridge between academia and practical application, the consultancy initiatives at Obsidian Peak University bring together academic expertise and industry needs.", imageId: 'facilities-consultancy', href: '/research/consultancy' },
    { id: 'events', title: 'Events', icon: Newspaper, description: "A rich tapestry of celebrations and milestones defines Obsidian Peak University’s collective journey.", imageId: 'facilities-events', href: '/campus-life/events' },
];

export function FacilitiesSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-2">Campus Life at Obsidian Peak University</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-12">
                    The university campus provides modern hostels, a digital library, sports facilities, clubs, cultural activities, and a safe learning environment.
                </p>
                <Tabs defaultValue="facilities" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto flex-wrap">
                        {facilities.map(item => (
                            <TabsTrigger key={item.id} value={item.id} className="flex flex-col gap-2 h-24 items-center justify-center text-center p-2">
                                <item.icon className="w-6 h-6" />
                                <span className="text-xs">{item.title}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {facilities.map(item => {
                        const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
                        return (
                            <TabsContent key={item.id} value={item.id}>
                                <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
                                    <div>
                                        <h3 className="text-2xl font-headline font-bold text-primary">{item.title}</h3>
                                        <p className="mt-4 text-muted-foreground">{item.description}</p>
                                        <Button asChild variant="outline" className="mt-4">
                                            <Link href={item.href}>Learn More</Link>
                                        </Button>
                                    </div>
                                    {itemImage && <div className="relative h-80 rounded-lg overflow-hidden">
                                        <Image src={itemImage.imageUrl} alt={item.title} data-ai-hint={itemImage.imageHint} loading="lazy" fill className="object-cover" />
                                    </div>}
                                </div>
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </section>
    );
}
