
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Laptop, FlaskConical, Stethoscope, Landmark, Film, Tractor, Leaf, Microscope, Monitor, HeartPulse, 
    Library, Users, Languages, Wrench, Utensils, Bus, Building, 
    Trophy, Dribbble, Dumbbell
} from "lucide-react";

const academicFacilities = [
    { icon: Laptop, title: "Computer Centres", description: "Over 1000+ high-end systems with Intel® Core™ i7, licensed software, and 24/7 internet access." },
    { icon: FlaskConical, title: "Biotechnology Labs", description: "10+ specialized labs including Molecular Biology, Microbiology, and Genetic Engineering with advanced instruments." },
    { icon: Stethoscope, title: "Pharmacy Labs", description: "10+ labs for Pharmacology and Pharmaceutics, used by 1000+ students for hands-on training." },
    { icon: Landmark, title: "Moot Court", description: "A fully functional courtroom setup for realistic legal training, mock trials, and case arguments." },
    { icon: Film, title: "Studio & Media Labs", description: "Includes 2 news studios, an editing suite, and a green screen setup for hands-on media training." },
    { icon: Tractor, title: "Agricultural Farms", description: "Over 20 hectares of farmland for hands-on training in modern agriculture and crop studies." },
    { icon: Leaf, title: "Herbal Garden", description: "Home to 100+ medicinal plant species for study and research in herbal sciences." },
    { icon: Microscope, title: "State-of-the-Art Labs", description: "More than 60+ specialized labs across disciplines with the latest tools for practical learning." },
    { icon: Monitor, title: "Modern Classrooms", description: "Over 100+ smart classrooms with projectors and audio-visual systems for interactive learning." },
    { icon: HeartPulse, title: "Healthcare Facilities", description: "On-campus healthcare facilities ensure the well-being of the student community with accessible medical services." },
    { icon: Library, title: "Central Library", description: "Access to 65,399 Books/eBooks, 121 print journals, and 2086 e-Journals with various memberships." },
    { icon: Users, title: "Seminar Hall", description: "Spacious halls for seminars, workshops, and guest lectures, promoting a vibrant academic environment." },
    { icon: Languages, title: "Language Lab", description: "Equipped with 30+ interactive modules for language enhancement, training 300+ students each semester." },
    { icon: Wrench, title: "Workshop", description: "Fully equipped mechanical and technical workshops for hands-on training in fabrication, carpentry, and welding." },
];

const sportsFacilities = [
    { icon: Trophy, name: "Tennis", caption: "Serve it up" },
    { icon: Trophy, name: "Kabaddi", caption: "Raid and conquer" },
    { icon: Trophy, name: "Table Tennis", caption: "Spin to win" },
    { icon: Trophy, name: "Cricket", caption: "Passion on the pitch" },
    { icon: Trophy, name: "Volleyball", caption: "Spike it high" },
    { icon: Trophy, name: "Badminton", caption: "Shuttle and smash" },
    { icon: Dribbble, name: "Basketball", caption: "Shoot your shot" },
    { icon: Dumbbell, name: "Gymnasium", caption: "Build your strength" },
    { icon: Trophy, name: "Football", caption: "Goal-oriented" },
];

const academicWings = [
    { 
        id: "b1", 
        title: "B-1: Academic Block",
        content: "A multidisciplinary hub for Civil, Mechanical, Electrical, and Chemical Sciences. It also hosts the Institute of Natural Sciences & Humanities, Institute of Biosciences & Technology, and two auditoriums."
    },
    { 
        id: "b2", 
        title: "B2: Academic Block",
        content: "A thriving hub for Computer Science, Computer Application, Physical, and Mathematical Sciences. It is also home to research and consultancy services and a centralized library."
    },
    { 
        id: "b3", 
        title: "B3: Academic Block",
        content: "A dynamic center hosting specialized institutes, including Pharmacy, Architecture & Planning, and Education & Research, creating an integrated space for diverse educational pursuits."
    },
    { 
        id: "b4", 
        title: "B4: Academic Block",
        content: "A vibrant hub for Humanities, Management, Commerce & Economics, Legal Studies, and Media Studies. It houses facilities like moot court and offices for NCC and NSS."
    },
    { 
        id: "b5", 
        title: "B5: Academic Block",
        content: "Dedicated to agricultural education and technology, hosting the Institute of Agricultural Sciences & Technology and the School of Polytechnic, with well-equipped workshops."
    },
];

export default function Page() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Campus Facilities</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
          Obsidian Peak University’s state-of-the-art campus is designed to foster academic excellence, personal growth, and community engagement. From modern classrooms and extensive libraries to collaborative spaces that encourage creativity, we unlock a million possibilities.
        </p>
      </div>
      
      <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="sports">Sports</TabsTrigger>
            <TabsTrigger value="food">Food & Cafe</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="wings">Academic Wings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic" className="mt-8">
            <h2 className="text-2xl font-bold font-headline mb-6 text-primary text-center">Academic Facilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {academicFacilities.map(facility => (
                    <Card key={facility.title}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-full"><facility.icon className="w-6 h-6 text-primary"/></div>
                                <span className="font-headline">{facility.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{facility.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="sports" className="mt-8">
            <h2 className="text-2xl font-bold font-headline mb-6 text-primary text-center">Sports & Games</h2>
             <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Obsidian Peak University offers top-notch sports and recreational facilities, aligning with the belief that a healthy mind thrives in a healthy body.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sportsFacilities.map(sport => (
                <Card key={sport.name} className="flex flex-col items-center justify-center p-4">
                  <sport.icon className="w-10 h-10 text-primary mb-2" />
                  <p className="font-semibold text-center">{sport.name}</p>
                  <p className="text-xs text-muted-foreground">{sport.caption}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="food" className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Utensils className="w-6 h-6 text-primary"/>Cafeteria & Eating Joints</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The university boasts a vibrant cafeteria and various eating joints, creating a diverse culinary landscape for students. These spaces not only serve as hubs for delicious and nourishing meals but also foster a sense of community and relaxation, where students can unwind and socialize between classes.</p>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Bus className="w-6 h-6 text-primary"/>Transportation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Obsidian Peak University's transportation facility is exemplary, featuring a well-maintained fleet of buses that cater to the commuting needs of students and faculty. The buses operate on multiple routes, linking various departments, hostels, and facilities, ensuring seamless, safe, and comfortable mobility for the university community.</p>
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wings" className="mt-8">
            <h2 className="text-2xl font-bold font-headline mb-6 text-primary text-center">Academic Wings</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Obsidian Peak University features well-defined academic wings, each dedicated to fostering excellence in specific disciplines and providing a conducive environment for specialized learning.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                {academicWings.map(wing => (
                    <Card key={wing.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><Building className="w-6 h-6 text-primary"/>{wing.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{wing.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </TabsContent>
      </Tabs>
    </div>
  );
}
