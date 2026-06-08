
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Counter } from "@/components/counter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Briefcase, Target, Globe, Users, CheckCircle, ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";

const placementStats = [
    { value: 12000, label: 'Students Success Stories', icon: Users, suffix: '+' },
    { value: 1500, label: 'Job Offers', icon: Briefcase, suffix: '+' },
    { value: 90, label: 'Placement Rate', icon: CheckCircle, suffix: '%' },
];

const goals = [
    { icon: Briefcase, title: "Create Corporate Ready Professionals", description: "We create opportunities for students to gain practical, real-world experience at Obsidian Peak University, continuously refining our syllabus to align with industry demands." },
    { icon: Users, title: "Build Strong Industry Relations", description: "We stay in consistent touch with recruiters and top companies through regular HR conclaves and corporate meets." },
    { icon: Globe, title: "Promote a Global Outlook", description: "We cultivate a strong cultural and social awareness in our students around global aspects of business, technology, research, and development." },
    { icon: Target, title: "Build an Industry Interface", description: "We guarantee exposure through guest lectures, industrial visits, workshops, research collaborations, and industrial training for our students." },
    { icon: CheckCircle, title: "Provide 100% Placement Assistance", description: "Our Complete Career Building Programme (CCBP) operates year-round, boosting student employability and giving them a competitive advantage." },
];

const placementRecords = {
    "2025": [
        { name: "Mritunjay Singh", course: "B.Tech. in Computer Science Engineering", package: "8.20 LPA", imageId: "testimonial-2" },
        { name: "Utkarsh Gupta", course: "M.B.A.", package: "8.46 LPA", imageId: "testimonial-2" },
        { name: "Abhay Nigam", course: "B.Tech. in Computer Science Engineering", package: "9.00 LPA", imageId: "testimonial-2" },
        { name: "Tanya Jaiswal", course: "B.Sc.(Hons.) in Biotechnology", package: "8.00 LPA", imageId: "testimonial-1" },
        { name: "Kaushik Kumar Upadhyay", course: "B.Tech. in Mechanical Engineering", package: "8.00 LPA", imageId: "testimonial-2" },
    ],
    "2024": [
        { name: "Shivam Agarwal", course: "B.Tech. in Computer Science Engineering", package: "9.00 LPA", imageId: "testimonial-2" },
        { name: "Ankur Singh", course: "M.B.A.", package: "5.89 LPA", imageId: "testimonial-2" },
        { name: "Vidushi Sharma", course: "B.Sc.(Hons.) in Biotechnology", package: "5.04 LPA", imageId: "testimonial-1" },
        { name: "Anushka Kanojia", course: "M.B.A.", package: "5.64 LPA", imageId: "testimonial-1" },
        { name: "Aditi Vikram", course: "B.Tech. in Biotechnology", package: "6.50 LPA", imageId: "testimonial-1" },
    ],
    "2023": [
        { name: "Prashansha Srivastava", course: "B.Tech. in Biotechnology", package: "5.70 LPA", imageId: "testimonial-1" },
        { name: "Gaurav Kumar Chaturvedi", course: "B.Tech. in Mechanical Engineering", package: "4.20 LPA", imageId: "testimonial-2" },
        { name: "Sudhanshu Ranjan", course: "B.Tech. in Electrical Engineering", package: "4.20 LPA", imageId: "testimonial-2" },
        { name: "Ashish Kumar Singh", course: "B.Tech. in EE", package: "4.50 LPA", imageId: "testimonial-2" },
        { name: "Akash Srivastava", course: "B.Tech. in CSE", package: "4.00 LPA", imageId: "testimonial-2" },
    ]
};

const recruiterTestimonials = [
    { name: "Ms. Smily Gupta", company: "Team Leader at Integrated Resource inc.", text: "It was a pleasure to have the students as a part of our foundation family . The team was full of energy, Knowledge, and ideas. We look forward to having a synergistic relationship in Future.", imageId: "testimonial-1" },
    { name: "Mr. Dheeraj Chhabra", company: "Co-Founder & Director at Learning Routes", text: "Obsidian Peak's Placement team has been very cooperative. The eagerness to learn and grow help us improve our service offering to the institution from an industry perspective too.", imageId: "testimonial-2" },
    { name: "Mr. Saurabh Singh", company: "Associate Manager at HCL Technologies", text: "Students at Obsidian Peak University are competent, passionate and goal oriented which is equivalent to the student quality of any premium group across India.", imageId: "testimonial-2" },
    { name: "Ms. Sonal Arora", company: "Senior HR Manager at Accenture", text: "Professionalism, sincerity and passion to do something for their students beyond limits has been the major strength of Obsidian Peak University.", imageId: "testimonial-1" },
];

const studentTestimonials = [
    { name: "Ashish Kumar Singh", course: "B.Tech. in EE (Batch: 2023)", text: "Obsidian Peak University and its faculties have put in all the efforts to groom us and make us corporate professionals. It was a wonderful experience at Obsidian Peak University.", imageId: "testimonial-2" },
    { name: "Shivangi SIngh", course: "B.Tech. in BT (Batch: 2020)", text: "My experience at Obsidian Peak was full of learning and grooming. I am thankful to all the faculties, mentors and entire department for providing us with quality education.", imageId: "testimonial-1" },
    { name: "Richa Tekchandani", course: "B.Tech. in CSE (Batch: 2022)", text: "In my experience all the teachers are very supportive and friendly and the placement process has been very smooth throughout. I would always be very grateful for the lifelong connections I made.", imageId: "testimonial-1" },
    { name: "Krishna Rastogi", course: "B.Tech. in CSE (Batch: 2021)", text: "I am very Thankful to the faculties of CS Departments as they are very much supportive and helpful and the Placement Cell which is also doing a great job by arranging excellent opportunities.", imageId: "testimonial-2" },
];

const recruiters = [
    "Adani", "TATA", "Capgemini", "Patanjali", "IBM", "SAP", "WIPRO", "JBM Auto", "RDC Concrete", "Unthinkable", "Coforge", "Cognizant", "TCS", "Infosys", "Deloitte", "IVRI", "Mankind", "Zydus", "Glaxo", "Torrent Power", "L&T", "Berger", "Ultratech", "Prism", "HCL", "Torrent Gas", "Jeevansathi.com", "Genpact", "HDFC Bank", "ICICI Bank", "Jaro Education", "Axis Bank", "PwC", "Airtel", "Josh Technology", "Tech Mahindra",
];

const placementDrives = {
    "2025": [
        { company: "Zimyo", date: "25 September, 2025", description: "A cutting-edge HR and payroll software company that simplifies workforce management through innovative solutions." },
        { company: "99acres", date: "26 November, 2025", description: "A leading Indian real estate platform that facilitates the buying, selling, and renting of properties." },
    ],
    "2024": [
        { company: "Zimyo", date: "25 September, 2024", description: "A cutting-edge HR and payroll software company that simplifies workforce management through innovative solutions." },
        { company: "99acres", date: "26 November, 2024", description: "A leading Indian real estate platform that facilitates the buying, selling, and renting of properties." },
        { company: "Accenture", date: "14 October, 2024", description: "A global professional services company specializing in IT consulting, digital transformation, and cloud solutions." },
        { company: "Addverb", date: "30 September, 2024", description: "A leading robotics and automation company revolutionizing industries with innovative solutions." },
    ],
    "2023": [
         { company: "CapitalVia", date: "25 November, 2023", description: "A leading financial advisory firm specializing in real-time market research and investment guidance." },
        { company: "Cognizant", date: "15 October, 2023", description: "A global technology company, specializing in digital transformation, IT consulting, and business process outsourcing." },
    ]
};

const placementTeam = [
    { name: "Gaurav Saxena", role: "Manager (Training & Placement)", imageId: "testimonial-2" },
    { name: "Anajali Kumari", role: "Alumni Coordinator", imageId: "testimonial-1" },
    { name: "Deepak Kumar", role: "Placement Executive", imageId: "testimonial-2" },
    { name: "Santosh Mishra", role: "Officer", imageId: "testimonial-2" },
    { name: "Alok Gupta", role: "Coordinator (Training & Placement)", imageId: "testimonial-2" },
];

export default function Page() {
    const directorImage = PlaceHolderImages.find(p => p.id === 'dean-male');
    return (
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-background">
            {/* Intro Section */}
            <section className="bg-secondary py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Placement Overview</h1>
                            <p className="text-lg mt-4 text-muted-foreground">
                               At Obsidian Peak University, we transform aspirations into tangible careers. The key to achieving this goal is our dynamic Placement Cell Team, committed to equipping students with the essential skills, knowledge, and confidence required to excel in the competitive job market.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {placementStats.map((stat) => (
                                <Card key={stat.label} className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-center text-primary mb-2">
                                          <stat.icon className="w-8 h-8"/>
                                        </div>
                                        <CardTitle className="text-3xl font-bold text-primary">
                                            <Counter end={stat.value} suffix={stat.suffix} />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground font-semibold">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Goals Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Goals</h2>
                        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                            Our placement cell sets clear goals, recognizing that training and development are ongoing processes, with placement as the ultimate achievement.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {goals.slice(0, 5).map((goal, index) => (
                            <Card key={goal.title} className="hover:border-primary/50 hover:shadow-lg transition-all">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0"><goal.icon className="w-8 h-8 text-primary"/></div>
                                        <div>
                                            <p className="text-sm text-primary font-semibold">Goal {index + 1}</p>
                                            <p className="text-lg font-headline">{goal.title}</p>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{goal.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Placement Records */}
            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Placement Records</h2>
                        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                            Outstanding placement records showcase our commitment to student success and industry relevance.
                        </p>
                    </div>
                    <Tabs defaultValue="2025" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="2025">2025</TabsTrigger>
                            <TabsTrigger value="2024">2024</TabsTrigger>
                            <TabsTrigger value="2023">2023</TabsTrigger>
                        </TabsList>
                        {Object.entries(placementRecords).map(([year, students]) => (
                            <TabsContent key={year} value={year} className="mt-8">
                                <Carousel opts={{ loop: true, align: 'start' }}>
                                    <CarouselContent className="-ml-4">
                                        {students.map(student => {
                                            const studentImage = PlaceHolderImages.find(p => p.id === student.imageId);
                                            return (
                                            <CarouselItem key={student.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                                 <Card className="h-full group overflow-hidden">
                                                    <CardContent className="flex flex-col items-center text-center p-6">
                                                        <Avatar className="w-28 h-28 mb-4 border-4 border-primary/20">
                                                            {studentImage && <AvatarImage src={studentImage.imageUrl} className="group-hover:scale-105 transition-transform" />}
                                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <p className="font-bold text-lg">{student.name}</p>
                                                        <p className="text-sm text-muted-foreground">{student.course}</p>
                                                        <p className="text-xl font-bold text-primary mt-2">Package: {student.package}</p>
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        )})}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-[-1rem] sm:left-[-2rem]" />
                                    <CarouselNext className="right-[-1rem] sm:right-[-2rem]" />
                                </Carousel>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>

             {/* Testimonials */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">What Our People Say</h2>
                        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                           Testimonials from students, and recruiters on their placement experience at Obsidian Peak.
                        </p>
                    </div>
                     <Tabs defaultValue="recruiters" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="recruiters">From Recruiters</TabsTrigger>
                            <TabsTrigger value="students">From Students</TabsTrigger>
                        </TabsList>
                        <TabsContent value="recruiters" className="mt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {recruiterTestimonials.map(item => (
                                    <Card key={item.name}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Avatar>
                                                    <AvatarImage src={PlaceHolderImages.find(p => p.id === item.imageId)?.imageUrl} />
                                                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="italic text-muted-foreground">&ldquo;{item.text}&rdquo;</p>
                                                    <p className="font-bold mt-4">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">{item.company}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="students" className="mt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {studentTestimonials.map(item => (
                                    <Card key={item.name}>
                                        <CardContent className="p-6">
                                             <div className="flex items-start gap-4">
                                                <Avatar>
                                                     <AvatarImage src={PlaceHolderImages.find(p => p.id === item.imageId)?.imageUrl} />
                                                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="italic text-muted-foreground">&ldquo;{item.text}&rdquo;</p>
                                                    <p className="font-bold mt-4">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">{item.course}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                     </Tabs>
                      <div className="text-center mt-8">
                        <Button asChild variant="outline">
                            <Link href="/placements/testimonials">View all testimonials <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                      </div>
                </div>
            </section>
            
            {/* Recruiters */}
             <section className="py-16 md:py-24 bg-primary/5">
                <div className="container mx-auto px-4">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Recruiters</h2>
                        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                            Our recruitment partners include a wide range of industry leaders, across disciplines, fields, and professional landscapes.
                        </p>
                    </div>
                     <div className="flex flex-wrap gap-6 items-center justify-center">
                        {recruiters.map((recruiter) => {
                            return (
                                <div key={recruiter} className="p-4 bg-background rounded-lg border flex items-center justify-center min-w-[140px] filter grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
                                    <span className="font-semibold text-muted-foreground text-lg">{recruiter}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

             {/* Placement Drives */}
             <section className="py-16 md:py-24">
                 <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Placement Drives</h2>
                        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                            Dynamic placement drives connect our students with leading employers, facilitating successful career launches.
                        </p>
                    </div>
                     <Tabs defaultValue="2024" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="2025">2025</TabsTrigger>
                            <TabsTrigger value="2024">2024</TabsTrigger>
                            <TabsTrigger value="2023">2023</TabsTrigger>
                        </TabsList>
                         {Object.entries(placementDrives).map(([year, drives]) => (
                            <TabsContent key={year} value={year} className="mt-8">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {drives.map(drive => (
                                    <Card key={drive.company} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <CardTitle className="font-headline text-xl">{drive.company}</CardTitle>
                                            <CardDescription>Date of Visit: {drive.date}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">{drive.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                 </div>
             </section>

             {/* Placement Cell Section */}
             <section className="py-16 md:py-24 bg-secondary">
                 <div className="container mx-auto px-4">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Meet the Placement Cell</h2>
                    </div>
                    <Card className="max-w-4xl mx-auto mb-12">
                        <CardContent className="p-8">
                           <div className="grid md:grid-cols-3 gap-8 items-center">
                               <div className="md:col-span-1 flex flex-col items-center text-center">
                                    {directorImage && (
                                        <Avatar className="w-32 h-32 border-4 border-primary">
                                            <AvatarImage src={directorImage.imageUrl} />
                                            <AvatarFallback>RJ</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <h4 className="font-bold text-lg mt-4">Mr. Rakesh Jaiswal</h4>
                                    <p className="text-sm text-muted-foreground">Director Placement</p>
                                    <div className="text-xs space-y-1 mt-2 text-muted-foreground">
                                        <a href="tel:+919312113944" className="flex items-center gap-2 hover:text-primary"><Phone className="h-3 w-3"/>+91-9312113944</a>
                                        <a href="mailto:director.placement@obsidianpeak.ac.in" className="flex items-center gap-2 hover:text-primary"><Mail className="h-3 w-3"/>director.placement@obsidianpeak.ac.in</a>
                                    </div>
                               </div>
                               <div className="md:col-span-2">
                                   <h3 className="font-semibold text-lg mb-2">Message From the Director</h3>
                                   <blockquote className="italic text-muted-foreground border-l-4 pl-4">
                                       "Greetings from the Training and Placement Department. Obsidian Peak University is one of North India's emerging universities with over 5,000 students graduating annually. Our students are regularly assessed for employability and secure top placements. We warmly invite you to experience a smooth and productive hiring process with us and look forward to a strong, collaborative association."
                                   </blockquote>
                               </div>
                           </div>
                        </CardContent>
                    </Card>

                    <h3 className="text-2xl font-bold font-headline text-center mb-8 text-primary">Our Team</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {placementTeam.map(member => {
                            const memberImage = PlaceHolderImages.find(p => p.id === member.imageId);
                            return(
                                <Card key={member.name} className="text-center">
                                    <CardContent className="p-6 flex flex-col items-center">
                                        <Avatar className="w-24 h-24 mb-3 border-4 border-muted">
                                            {memberImage && <AvatarImage src={memberImage.imageUrl} />}
                                            <AvatarFallback>{member.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                 </div>
             </section>

          </main>
          <Footer />
        </div>
    )
}
