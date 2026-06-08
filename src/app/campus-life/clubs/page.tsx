import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Palette, Code, Mic, Film, Dumbbell, HandHelping, Landmark, Shield, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const academicClubs = [
    { icon: Landmark, name: "Obsidian Investment Club", description: "Manages a student-led mock portfolio and hosts annual 'Stock Pitch' competitions with industry mentors." },
    { icon: HandHelping, name: "Pre-Law & Pre-Med Associations", description: "Provides specialized counseling, entrance exam workshops (LSAT/MCAT), and clinical/legal networking." },
    { icon: Shield, name: "The Cyber Security Guild", description: "A technical society focused on ethical hacking, CTF (Capture The Flag) competitions, and network defense." },
];

const culturalClubs = [
    { icon: Palette, name: "Meredith International Association", description: "Represents our diverse global student body, hosting the 'Global Peak Festival' annually." },
    { icon: Mic, name: "The Arts & Design Collective", description: "A hub for fine arts, digital media, and photography enthusiasts, managing the campus gallery." },
];

const specialClubs = [
    { icon: Mic, name: "Peak Debating Society", description: "Competes in national and international parliamentary debate tournaments." },
    { icon: Leaf, name: "Environmental Sustainability League", description: "Spearheads green initiatives, including the 'Zero-Waste Campus' project and urban gardening." },
    { icon: Code, name: "The Gaming & Esports League", description: "Manages OPU's competitive varsity esports teams and casual gaming social nights." },
];

export default function Page() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Student Clubs & Societies</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
          The Center for Student Involvement (CSI) oversees over 100+ registered organizations, instrumental in developing leadership and soft skills.
        </p>
      </div>

      <div className="space-y-12">
        <div>
            <h2 className="text-2xl font-bold font-headline mb-6 text-primary border-b pb-2">Academic & Professional Societies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {academicClubs.map(club => (
                    <Card key={club.name}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline">
                                <div className="bg-primary/10 p-2 rounded-full"><club.icon className="w-6 h-6 text-primary" /></div>
                                {club.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{club.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold font-headline mb-6 text-primary border-b pb-2">Cultural & Global Identity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {culturalClubs.map(club => (
                    <Card key={club.name}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline">
                                <div className="bg-primary/10 p-2 rounded-full"><club.icon className="w-6 h-6 text-primary" /></div>
                                {club.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{club.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
         <div>
            <h2 className="text-2xl font-bold font-headline mb-6 text-primary border-b pb-2">Specialized & Special Interest</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {specialClubs.map(club => (
                    <Card key={club.name}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline">
                                <div className="bg-primary/10 p-2 rounded-full"><club.icon className="w-6 h-6 text-primary" /></div>
                                {club.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{club.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
      
      <Card className="mt-12 bg-primary/5">
        <CardHeader>
            <CardTitle>Extracurricular Leadership Program (ELP)</CardTitle>
            <CardDescription>Students holding executive club positions for over two academic cycles are eligible for the Obsidian Leadership Certificate, recognized on their final transcript.</CardDescription>
        </CardHeader>
        <CardContent>
            <h4 className="font-semibold mb-2">Benefits of ELP:</h4>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Priority registration for high-demand elective courses.</li>
                <li>Exclusive invitations to the "President’s Leadership Dinner."</li>
                <li>Access to a dedicated alumni mentorship network.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
