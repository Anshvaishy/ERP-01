import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
    { name: "Aditya Verma", course: "B.Tech. in CSE (2nd Year)", testimonial: "The faculty in the Computer Science department are incredible. They are not just teachers but mentors who are genuinely invested in our success. The coding clubs and hackathons provide a platform to apply what we learn in class. The 24/7 access to labs is a huge plus, allowing us to work on projects and experiment with new technologies at our own pace. The supportive environment makes learning a joy.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-2') },
    { name: "Sneha Iyer", course: "B.B.A. (3rd Year)", testimonial: "As a business student, the industry exposure at Obsidian Peak is unmatched. We have regular guest lectures from CEOs and industry leaders, which provides invaluable insights into the corporate world. The mandatory internship program gave me practical experience and helped me secure a pre-placement offer. The curriculum is constantly updated to reflect current market trends, making our education highly relevant and practical.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-1') },
    { name: "Karan Desai", course: "B.Sc. in Physics (1st Year)", testimonial: "The research opportunities for undergraduates here are amazing. I was able to join a research project with a professor in my very first semester. The advanced laboratories and equipment are on par with some of the best institutions. The university truly fosters a spirit of inquiry and discovery, and the faculty encourages us to ask questions and challenge conventional wisdom. It’s an inspiring place to be for anyone passionate about science.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-2') },
    { name: "Meera Krishnan", course: "B.A. in Media Studies (2nd Year)", testimonial: "The media studies program offers a fantastic balance between theory and hands-on practice. We have access to a fully-equipped studio for film and broadcast production, and our assignments involve creating real content like documentaries and news segments. The faculty consists of experienced journalists and filmmakers who provide practical, real-world guidance. The campus newspaper and radio station offer great platforms to build our portfolios.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-1') },
    { name: "Rajbir Singh", course: "LL.B. (3rd Year)", testimonial: "The moot court at Obsidian Peak is a phenomenal training ground for aspiring lawyers. We get to argue cases in a realistic courtroom setting, which builds both confidence and argumentation skills. The law library is extensive, with access to numerous online databases and journals. The faculty's open-door policy means you can always walk in for guidance on complex legal concepts or career advice. The focus on legal ethics is also a core part of our education here.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-2') },
    { name: "Fatima Ansari", course: "M.Sc. in Biotechnology (1st Year)", testimonial: "I chose Obsidian Peak for my postgraduate studies because of its reputation for cutting-edge research in biotech. The laboratories are equipped with the latest technology, including DNA sequencers and mass spectrometers. The curriculum is intensive and research-oriented, preparing us for careers in both academia and industry. The university's collaborations with leading biotech firms provide excellent opportunities for internships and placements. It’s a challenging but highly rewarding environment.", avatar: PlaceHolderImages.find(p => p.id === 'testimonial-3') },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
           <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Student Testimonials</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                Hear what our students have to say about their experience at Obsidian Peak University.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
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
                        {item.course}
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
