
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, UserPlus, Upload, CheckCircle, Laptop, FlaskConical, Stethoscope, Wrench, Briefcase, Tractor, Scale, Computer, HeartPulse, Mic, Banknote, Utensils, Palette, Leaf, BookOpen, School } from 'lucide-react';
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const onlineSteps = [
    { number: 1, title: "Visit the Portal", description: "Visit www.obsidianpeak.ac.in and click on the 'Online Admission Form' block, or go directly to the form at https://studentportal.obsidianpeak.ac.in." },
    { number: 2, title: "Register", description: "Fill in all mandatory fields and click the 'Register' button to proceed. This will take you to the login screen, where you'll be prompted to enter your registered mobile number." },
    { number: 3, title: "Verify OTP", description: "Enter your registered mobile number, click 'Send OTP', then enter the received OTP and click 'Verify OTP' to access the student dashboard." },
    { number: 4, title: "Fill Information", description: "Select 'General Information,' fill in the required fields, and press 'Submit'. Enter basic details, then press 'Save' to proceed." },
    { number: 5, title: "Pay Application Fee", description: "Go to 'Application Fee,' review the information, press 'Pay Application Fee,' and complete the payment using one of the available payment options." },
    { number: 6, title: "Pay Registration Fee", description: "Go to 'Registration Fee,' review the info, select an amount of ₹10,000 or more, and complete the payment using any of the given payment options." },
];

const offlineSteps = [
    { title: "Visit Admission Office", description: "Visit our admission offices at the university campus, college campus, or city office. For details visit: obsidianpeak.ac.in/contact-us." },
    { title: "Meet a Counselor", description: "Approach the reception desk, provide your basic details, and get assigned a counselor to discuss programs, fees, and campus life." },
    { title: "Bring Documents", description: "Ensure you carry all your educational documents, Aadhar card, photocopies, and two passport-size photographs." },
    { title: "Register for Program", description: "If eligible, register for your desired program by filling out the admission form and paying the ₹1000 form fee in cash, by card, or online." },
    { title: "Enroll and Submit", description: "Enroll in your program by paying the first installment (30% of the first-year course fee)." },
    { title: "Finalize Admission", description: "Submit all your documents and collect copies of relevant forms and your fee receipts to finalize your admission." },
];

const programsOffered = [
    { title: 'Computer Science', icon: Laptop, href: '/programs' },
    { title: 'Biotechnology', icon: FlaskConical, href: '/programs' },
    { title: 'Allied Health Sciences', icon: Stethoscope, href: '/programs' },
    { title: 'Engineering', icon: Wrench, href: '/programs' },
    { title: 'Management', icon: Briefcase, href: '/programs' },
    { title: 'Agriculture', icon: Tractor, href: '/programs' },
    { title: 'Law', icon: Scale, href: '/programs' },
    { title: 'Computer Application', icon: Computer, href: '/programs' },
    { title: 'Pharmacy', icon: HeartPulse, href: '/programs' },
    { title: 'Media Studies', icon: Mic, href: '/programs' },
    { title: 'Commerce & Economics', icon: Banknote, href: '/programs' },
    { title: 'Food Technology', icon: Utensils, href: '/programs' },
    { title: 'Art & Science', icon: Palette, href: '/programs' },
    { title: 'Nutrition & Dietetics', icon: Leaf, href: '/programs' },
    { title: 'Education', icon: BookOpen, href: '/programs' },
    { title: 'Polytechnic', icon: School, href: '/programs' },
];

const advantages = [
    "26+ Years of Academic Excellence",
    "Global & Industry Collaborations",
    "Advanced Labs & World-Class Infrastructure",
    "Strong Placement Record with MNCs & Fortune 500",
    "Industry-Aligned, Skill-Based Programs (AI, Data Science, etc.)",
    "Support for Research, Innovation & Startups",
    "Experienced Faculty with Industry Exposure",
    "Well-Connected, Student-Friendly Green Campus",
    "Flexible Academics as per NEP 2020",
    "Attractive Scholarships & Affordable Fee Structure",
];


export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">How to Apply</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              To begin your journey at Obsidian Peak University, visit the official website and head to the “Apply Now” section. Choose your desired program, review the criteria, and fill out the online form with accurate details.
            </p>
          </div>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold font-headline text-center mb-2 text-primary">Online Admission Process</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">Applicants must fill out the online form with personal, academic, and program details, upload required documents, and pay the application fee. Ensure all information is accurate and follow university instructions for a smooth application process.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {onlineSteps.map((step) => (
                    <Card key={step.number} className="flex flex-col">
                        <CardHeader className="flex-row gap-4 items-start">
                            <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">
                                {step.number}
                            </div>
                            <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold font-headline text-center mb-2 text-primary">Offline Admission Process</h2>
             <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">Career Counselling at Obsidian Peak University helps students identify their strengths and guides them to navigate the job market with confidence.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {offlineSteps.map((step, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader className="flex-row gap-4 items-start">
                            <div className="flex-shrink-0 bg-secondary text-secondary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold border-2 border-primary text-primary">
                                {index + 1}
                            </div>
                            <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </section>

          <section className="mb-16">
              <h2 className="text-3xl font-bold font-headline text-center mb-8 text-primary">Obsidian Peak University Offers</h2>
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                    {programsOffered.map((program) => (
                        <CarouselItem key={program.title} className="md:basis-1/3 lg:basis-1/5">
                            <Link href={program.href}>
                                <Card className="text-center p-4 h-full flex flex-col items-center justify-center hover:bg-primary/10 hover:shadow-lg transition-all">
                                    <program.icon className="w-10 h-10 text-primary mb-3" />
                                    <p className="font-semibold">{program.title}</p>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-1rem]"/>
                <CarouselNext className="right-[-1rem]"/>
              </Carousel>
          </section>

          <section>
            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-center text-primary font-headline text-3xl">Get Advantage of studying in a NAAC Accredited University</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {advantages.map((adv) => (
                            <li key={adv} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-muted-foreground">{adv}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
