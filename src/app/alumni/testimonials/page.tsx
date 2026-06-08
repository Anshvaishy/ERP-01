import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Page() {
  const alumni = [
    { name: 'Vikram Singh', course: 'B.Tech. CSE (Batch: 2018)', company: 'Google', testimonial: "Obsidian Peak provided an unparalleled foundation in computer science. The rigorous curriculum, combined with hands-on projects in the AI and machine learning labs, prepared me for the challenges at a company like Google. The faculty's mentorship was instrumental, guiding me through complex research and encouraging me to push boundaries. I am forever grateful for the network and friendships I built here.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-2') },
    { name: 'Priya Sharma', course: 'M.B.A. (Batch: 2020)', company: 'McKinsey & Company', testimonial: "The MBA program at Obsidian Peak was a transformative experience. It perfectly blended academic theory with real-world business cases, taught by professors with extensive industry experience. The emphasis on leadership and strategic thinking was a game-changer. The career services team was incredibly supportive, connecting me with top consulting firms and preparing me for the demanding interview process. I credit my success to the holistic development I received here.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-1') },
    { name: 'Aarav Gupta', course: 'B.A. LL.B. (Batch: 2019)', company: 'Cyril Amarchand Mangaldas', testimonial: "The School of Legal Studies at Obsidian Peak is exceptional. The moot court competitions, judged by actual high court justices, were an invaluable experience that honed my litigation skills. The curriculum is meticulously designed to cover both theoretical law and its practical applications. The faculty, a mix of seasoned academics and practicing lawyers, provided insights that textbooks simply cannot offer. This university truly prepares you for a successful legal career.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-2') },
    { name: 'Sunita Reddy', course: 'B.Sc. Biotechnology (Batch: 2021)', company: 'Biocon', testimonial: "My time at Obsidian Peak was defined by research and innovation. The state-of-the-art laboratories and the encouragement to pursue independent projects allowed me to explore my passion for genetic engineering. The faculty are not just teachers but also mentors who guide you through every step of the research process. The university's strong industry connections led to my internship and eventual placement at Biocon. It's the perfect place for aspiring scientists.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-3') },
    { name: 'Rohan Mehta', course: 'B.B.A. (Batch: 2017)', company: 'Founder, Alpha Innovations', testimonial: "Obsidian Peak didn't just give me a degree; it gave me the confidence to start my own company. The incubation center, 'Abhinav', provided the mentorship and resources I needed to turn my business idea into a reality. The curriculum's focus on entrepreneurship, finance, and marketing was incredibly practical. The network of peers and faculty I connected with continues to be my strongest support system in my entrepreneurial journey.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-2') },
    { name: 'Isha Khan', course: 'B.Des. (Batch: 2022)', company: 'Tata Elxsi', testimonial: "The design program at Obsidian Peak is a perfect blend of creativity and technical skill. We were encouraged to experiment with different mediums and technologies, from traditional sketching to 3D printing and VR. The studio environment was always buzzing with energy and collaboration. The faculty pushed us to develop a strong portfolio, which was crucial during placements. I felt completely prepared for the professional world.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-1') },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
           <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Alumni Testimonials</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                Hear from our distinguished alumni about their journey at Obsidian Peak University and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((item, index) => (
                <Card key={index} className="bg-background h-full flex flex-col">
                    <CardContent className="pt-6 flex-grow">
                    <div className="flex flex-col items-center text-center h-full">
                        <Avatar className="w-24 h-24 border-4 border-primary">
                        {item.avatar && <AvatarImage src={item.avatar.imageUrl} alt={item.name} data-ai-hint={item.avatar.imageHint} />}
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-4 text-xl font-bold font-headline">
                        {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                        {item.course}, Placed in {item.company}
                        </p>
                        <p className="mt-4 text-sm italic text-muted-foreground flex-grow">
                        &ldquo;{item.testimonial}&rdquo;
                        </p>
                    </div>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
