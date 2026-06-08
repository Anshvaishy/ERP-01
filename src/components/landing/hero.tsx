
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
    return (
        <section className="relative w-full h-[80vh] min-h-[500px]">
            {heroImage && (
                <Image 
                    src={heroImage.imageUrl} 
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill 
                    className="object-cover" 
                    priority 
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative h-full flex flex-col items-center justify-center text-center text-primary-foreground p-4">
                <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-2xl">
                    Define Your Future at Obsidian Peak
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl drop-shadow-xl">
                    A launchpad for innovators, thinkers, and leaders. Discover programs that blend academic rigor with real-world application.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="font-bold">
                        <Link href="/register">Apply Now</Link>
                    </Button>
                     <Button asChild size="lg" variant="secondary">
                        <Link href="/programs">Explore Programs</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
