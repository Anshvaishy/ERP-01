import Image from "next/image";
import { Award, BookOpen, Users, GraduationCap, CheckCircle, Target, Eye, Handshake, TrendingUp, Anchor, FlaskConical, Tv, Building, Star, Group, Zap, HandHelping, Globe, PenTool, GitCommit, HeartHandshake, University } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Counter } from "@/components/counter";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
    { value: 25, label: 'Years of Experience', icon: Award, suffix: '+' },
    { value: 100, label: 'Number of Courses', icon: BookOpen, suffix: '+' },
    { value: 12000, label: 'Global Students', icon: Users, suffix: '+' },
    { value: 15000, label: 'Number of Placements', icon: GraduationCap, suffix: '+' },
];

const whyObsidianPeak = [
    { icon: Globe, title: "Connect", description: "With global trends, industry stalwarts, and new perspectives through our conferences." },
    { icon: Building, title: "Build", description: "Your future career, with access to expert guidance, and with placements and job offers from 250+ top-level companies." },
    { icon: Users, title: "Leadership", description: "Obsidian Peak University is the brainchild of visionary leaders who dreamed of building an institution where education is a journey of empowerment." },
    { icon: Tv, title: "Exposure", description: "To prepare industry-ready professionals, we offer industrial visits, hands-on laboratory work, expert guest lectures, and an incubation center." },
    { icon: Zap, title: "Dive", description: "Into a dynamic learning journey with our cutting-edge industry-driven programs, expert faculty, and modern infrastructure." },
    { icon: FlaskConical, title: "Explore", description: "Your curiosity and contribute to breakthroughs in diverse fields through our research initiatives." },
    { icon: Group, title: "Experience", description: "A vibrant campus life through our student clubs, sports facilities, homely campus accommodation, and exciting campus events." },
];

const coreValues = [
    { icon: Star, title: "Student-Centered", description: "Our focus is on students, offering interdisciplinary programs that lead to professional excellence, while providing them with every kind of support they need." },
    { icon: Handshake, title: "Inclusivity and Diversity", description: "We actively promote and ensure diversity and equity, fostering an inclusive environment for all. We also prioritize environmental, economic, and social sustainability." },
    { icon: Award, title: "Excellence", description: "We are dedicated to maintaining academic excellence by delivering quality education, promoting extracurricular activities, and capacity-building." },
    { icon: Anchor, title: "Integrity & Ethics", description: "We uphold the highest ethical standards, professionalism, and a commitment to academic freedom. Transparency and accountability are fundamental to our operations." },
    { icon: GitCommit, title: "Participatory Governance", description: "We believe in shared decision-making. Our outreach programs engage with various stakeholders for consultations and collective deliberations." },
];

const campusFeatures = [
    { icon: HeartHandshake, title: "Holistic Development", description: "Encourage students to partake in social welfare activities and to inculcate responsibility towards society and environment." },
    { icon: University, title: "State-of-the-art Campus", description: "Discover Obsidian Peak's state-of-the-art facilities, lush green spaces, and dynamic academic environment." },
    { icon: Zap, title: "Cutting-Edge Technology", description: "“PeopleSoft Oracle” for student support, management of student affairs, Finance and HR services, is used to enhance performance." },
    { icon: FlaskConical, title: "Focus on Research", description: "Robust Research Environment encourages the questioning spirit of faculty and students alike." },
    { icon: HandHelping, title: "Dedicated Placement Cell", description: "Ensures industry interface for guest lectures, field visits, collaborations for research, industrial training and generation of employment opportunities." },
    { icon: Globe, title: "Exchange Programs", description: "Student/faculty exchange programs with leading national and international educational institutes of repute." },
    { icon: PenTool, title: "Industry Honour Programme", description: "Obsidian Peak and different industry leaders have collaborated to provide students the most advanced and globally accepted curriculum." },
    { icon: TrendingUp, title: "Collaboration and Industry Interaction Cell", description: "A focused and dedicated cell to cater to the requirements of different academic departments by collaborating with global organizations." },
];


export default function AboutUniversityPage() {
    const chairmanImage = PlaceHolderImages.find(p => p.id === 'founder-image');

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 bg-background">
                {/* Hero Section */}
                <section className="bg-secondary py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">About Obsidian Peak University</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                            Our journey began with an unwavering commitment to quality education. Today, Obsidian Peak University stands as a beacon of academic, cultural, and intellectual excellence, with 11 institutes, a faculty of industry leaders and a vibrant student body.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col items-center p-4 rounded-lg">
                                    <stat.icon className="w-12 h-12 text-primary" />
                                    <p className="text-3xl md:text-4xl font-bold mt-2">
                                        <Counter end={stat.value} suffix={stat.suffix} />
                                    </p>
                                    <p className="text-base md:text-lg text-muted-foreground mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Obsidian Peak Section */}
                <section className="py-16 md:py-24 bg-secondary">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">Why Obsidian Peak University?</h2>
                        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto text-center">
                            At Obsidian Peak University, you will find a world of opportunities to grow and excel.
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {whyObsidianPeak.map(item => (
                                <Card key={item.title} className="text-center">
                                    <CardHeader>
                                        <div className="flex justify-center mb-4">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <item.icon className="w-8 h-8 text-primary" />
                                            </div>
                                        </div>
                                        <CardTitle className="font-headline">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision & Mission Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                         <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">Vision & Mission</h2>
                         <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto text-center">
                            Obsidian Peak University is committed to building a transformative learning experience for all.
                        </p>
                        <div className="mt-12 grid md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader className="flex-row items-center gap-4">
                                    <Eye className="w-10 h-10 text-primary" />
                                    <CardTitle className="font-headline">Vision</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">To become a globally recognized institution for education, research, and nurturing individuals with ethical, social, and ecological awareness, all to contribute to our nation's prosperity.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex-row items-center gap-4">
                                    <Target className="w-10 h-10 text-primary" />
                                    <CardTitle className="font-headline">Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        <li>To expand existing programs and introduce new ones aligned with current national and global trends to meet local needs.</li>
                                        <li>To instill wisdom, professional ethics, values, and social awareness in students of diverse backgrounds.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-16 md:py-24 bg-secondary">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">Our Core Values</h2>
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                            {coreValues.map(value => (
                                <div key={value.title} className="text-center flex flex-col items-center">
                                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                                        <value.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold font-headline">{value.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                 {/* Campus Features Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">Know Our Campus</h2>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                           {campusFeatures.map(feature => (
                                <Card key={feature.title} className="bg-card hover:shadow-lg transition-shadow">
                                    <CardHeader className="flex-row items-center gap-4">
                                        <feature.icon className="w-8 h-8 text-primary flex-shrink-0" />
                                        <CardTitle className="text-lg font-headline">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                           ))}
                        </div>
                    </div>
                </section>

                {/* Chairman's Message Section */}
                <section className="py-16 md:py-24 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-1 flex justify-center">
                                {chairmanImage && (
                                    <Avatar className="w-48 h-48 border-4 border-white">
                                        <AvatarImage src={chairmanImage.imageUrl} alt="Mr. Ansh Vaishy" data-ai-hint={chairmanImage.imageHint} />
                                        <AvatarFallback>AV</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                            <div className="md:col-span-2 text-center md:text-left">
                                <h3 className="text-2xl font-headline font-bold mb-2">Message from the Chairman</h3>
                                <p className="text-lg italic">&ldquo;Our institution stands as a testament to the power of sharp intellect and enduring ambition. At Obsidian Peak, we do not just prepare you for a career; we prepare you to define the future. We foster an environment where bold ideas are tested, and where every student is encouraged to reach for their personal summit of excellence.&rdquo;</p>
                                <h4 className="mt-4 text-xl font-headline font-bold">Ansh Vaishy</h4>
                                <p className="text-primary-foreground/80">
                                    Chairman, Board of Governors, Obsidian Peak University
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
