
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const studentTestimonials = [
    { name: "Aditya Verma", course: "B.Tech. in CSE (2nd Year)", testimonial: "The faculty in the Computer Science department are incredible. They are not just teachers but mentors who are genuinely invested in our success. The coding clubs and hackathons provide a platform to apply what we learn in class. The 24/7 access to labs is a huge plus, allowing us to work on projects and experiment with new technologies at our own pace. The supportive environment makes learning a joy." },
    { name: "Sneha Iyer", course: "B.B.A. (3rd Year)", testimonial: "As a business student, the industry exposure at Obsidian Peak is unmatched. We have regular guest lectures from CEOs and industry leaders, which provides invaluable insights into the corporate world. The mandatory internship program gave me practical experience and helped me secure a pre-placement offer. The curriculum is constantly updated to reflect current market trends, making our education highly relevant and practical." },
    { name: "Karan Desai", course: "B.Sc. in Physics (1st Year)", testimonial: "The research opportunities for undergraduates here are amazing. I was able to join a research project with a professor in my very first semester. The advanced laboratories and equipment are on par with some of the best institutions. The university truly fosters a spirit of inquiry and discovery, and the faculty encourages us to ask questions and challenge conventional wisdom. It’s an inspiring place to be for anyone passionate about science." },
];

export function StudentTestimonialsSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">From Our Students</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto text-center">
                    Discover what our current students love about their journey at Obsidian Peak.
                </p>
                <Carousel className="mt-12" opts={{ loop: true, align: "start" }}>
                    <CarouselContent className="-ml-4">
                        {studentTestimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full">
                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                        <p className="text-muted-foreground italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
                                        <p className="mt-4 font-bold font-headline">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.course}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                </Carousel>
                <div className="text-center mt-8">
                    <Button variant="outline" asChild>
                        <Link href="/placements/testimonials">View All Testimonials</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
