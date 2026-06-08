
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const latestNews = [
    { date: "November 14, 2025", title: "Innovation Meets Agriculture at the Obsidian Peak University Kisan Mela 2025", description: "Obsidian Peak University organized a two-day “Kisan Mela 2025” under the theme Advanced Agriculture – Advanced India...", imageId: "about-image", href: "/campus-life/events" },
    { date: "November 11, 2025", title: "Empowering Future Engineers: L&T EduTech AI Lab Opens at Obsidian Peak", description: "Obsidian Peak University inaugurated the L&T EduTech AI Lab – a state-of-the-art Centre of Excellence...", imageId: "course-me", href: "/research/innovation" },
    { date: "November 03, 2025", title: "Expert Talk Session on Smart Meter Implementation", description: "The L&T EduTech Division, in collaboration with Obsidian Peak University, organized an enriching Expert Talk Session...", imageId: "course-cs", href: "/campus-life/events" },
];

export function LatestNewsSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">Latest News and Events</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto text-center">
                    At University’s beautiful campus, you’ll find a diverse and welcoming community that will teach you life skills along with having fun.
                </p>
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    {latestNews.map(news => {
                        const newsImage = PlaceHolderImages.find(p => p.id === news.imageId);
                        return (
                            <Card key={news.title} className="overflow-hidden group">
                                {newsImage && <Link href={news.href} className="block relative h-56">
                                    <Image src={newsImage.imageUrl} alt={news.title} loading="lazy" fill className="object-cover group-hover:scale-105 transition-transform"/>
                                </Link>}
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground">{news.date}</p>
                                    <CardTitle className="mt-2 font-headline text-xl hover:text-primary"><Link href={news.href}>{news.title}</Link></CardTitle>
                                    <p className="mt-2 text-muted-foreground line-clamp-3">{news.description}</p>
                                    <Button variant="link" className="px-0 mt-4" asChild>
                                        <Link href={news.href}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
