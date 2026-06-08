
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Counter } from "@/components/counter";
import { BookCopy, Target, Users, Search, Repeat, Library, Wifi, Printer, Link as LinkIcon, Eye, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
    { value: 10, label: "Institutional Libraries", icon: Library, suffix: "+" },
    { value: 120, label: "Print Journals", icon: BookCopy, suffix: "+" },
    { value: 2085, label: "E-Journals", icon: BookCopy, suffix: "+" },
    { value: 65350, label: "Books/E-Books", icon: BookCopy, suffix: "+" },
];

const librarySections = [
    { icon: Search, title: "OPAC (User Interface)", description: "Allows users to easily search, locate, and reserve library resources through a user-friendly digital interface." },
    { icon: Users, title: "Cloak Room", description: "Provides safe and secure storage for personal belongings, ensuring a comfortable and distraction-free library experience." },
    { icon: Repeat, title: "Circulation Section", description: "Facilitates smooth issue, return, and renewal of books, ensuring easy access to learning resources." },
    { icon: BookCopy, title: "Reference Section", description: "A rich collection of encyclopedias, handbooks, and dictionaries for in-library consultation to support in-depth study." },
    { icon: BookCopy, title: "Periodical Section", description: "Offers a wide range of national and international journals, magazines, and newspapers to keep readers updated." },
    { icon: Wifi, title: "E-Zone Section", description: "Provides access to digital resources, online journals, e-books, and databases in a tech-enabled environment." },
    { icon: Briefcase, title: "Acquisition Section", description: "Manages the selection, ordering, and procurement of books and digital resources to enrich the library’s collection." },
    { icon: Printer, title: "Reprographic Section", description: "Offers photocopying, printing, and scanning services to facilitate easy access and reproduction of academic materials." },
];

const libraryServices = [
    "Remote Access to E-resources: The library provides remote access facility of the subscribed e-databases to students and faculty members.",
    "Digitization of the Library: 40-computer section with Wi-Fi/LAN for student and faculty e-resource access.",
    "Kiosks: KOHA-enabled kiosks allow easy catalogue search and account check.",
    "Web OPAC: Library Web OPAC provides 24x7 access to resources and account management.",
    "Online Information Search: Library staff provides help and support to users via email and mobile phone.",
    "Inter Library Loan (ILL) Service: The library has inter-library loan networking with DELNET and IIM, Lucknow.",
    "Reprography Services: The library has photocopy and scanning services for students and faculty members.",
];

const institutionalLibraries = [
    { title: "Institute of Pharmacy Library", description: "The Institute of Pharmacy Library has books, journals, and study materials to help students learn and do research in pharmacy." },
    { title: "Institute of Pharmaceutical Sciences Library", description: "The library provides a wide collection of books, journals, and online resources to support students and faculty in their studies, research, and academic growth in pharmaceutical sciences." },
    { title: "Institute of Legal Studies Library", description: "The library provides a wide range of legal books, journals, and reference materials to support learning, research, and professional growth." },
    { title: "Institute of Management, Commerce & Economics Library", description: "It offers a rich collection of books, journals, case studies, and digital resources to support learning, research, and industry-oriented knowledge in business, commerce, and economics." },
    { title: "Institute of Media Studies Library", description: "The IMS Library provides books, journals, audio-visuals, and digital resources to help students learn, research, and train in journalism, mass communication, and media studies." },
    { title: "Institute of Diploma Studies Library", description: "The library offers key textbooks and resources to support diploma courses and student learning." },
    { title: "Institute of Education and Research Library", description: "It offers books, journals, and study materials to support learning, teaching, and research in the field of education." },
];


export default function Page() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Central Library</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
          The Central Library of Obsidian Peak University supports the teaching, learning, research and innovative activities of the University. The library is fully automated with open-source Integrated Library Management Software ‘KOHA’ and adopts an open shelf system, facilitating users to browse and explore any document on the shelves.
        </p>
      </div>
      
      {/* Stats */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center p-4 rounded-lg bg-card border">
              <stat.icon className="w-10 h-10 text-primary" />
              <p className="text-2xl md:text-3xl font-bold mt-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

      {/* Access Links */}
       <Card>
           <CardHeader>
               <CardTitle>Quick Access</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col sm:flex-row gap-4">
               <Button asChild variant="outline">
                   <Link href="http://elibrary.srmu.ac.in:8999/" target="_blank" rel="noopener noreferrer"><LinkIcon className="mr-2 h-4 w-4"/> WebOPAC Access</Link>
               </Button>
               <Button asChild>
                   <Link href="https://srmu.refread.com/#/home" target="_blank" rel="noopener noreferrer"><Wifi className="mr-2 h-4 w-4"/> Remote Access</Link>
               </Button>
           </CardContent>
       </Card>

      {/* Library Sections */}
       <div>
            <h2 className="text-2xl font-bold font-headline mb-6 text-primary text-center">Library Sections</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {librarySections.map(section => (
                    <Card key={section.title}>
                         <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-lg">
                                <div className="bg-primary/10 p-2 rounded-full"><section.icon className="w-5 h-5 text-primary"/></div>
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{section.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
       </div>

      {/* Vision and Mission */}
       <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Eye className="w-6 h-6 text-primary"/> Vision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Advancement of Obsidian Peak University’s Research and Learning fraternity with varied knowledge based resources, innovative services and vast collection powered by strategic partnerships with leading institutions across the country.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Target className="w-6 h-6 text-primary"/> Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">To extend adequate text and reference materials for its students and their mentors to ensure their comprehensive academic grooming. To play a pivotal role in exploring and inducing research activities in novel areas and to drive research scholars for value added accomplishments.</p>
                </CardContent>
            </Card>
       </div>
       
       {/* Library Services */}
       <Card>
            <CardHeader>
                <CardTitle>Library Services</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {libraryServices.map(service => <li key={service}>{service}</li>)}
                </ul>
            </CardContent>
       </Card>

       {/* Institutional Libraries */}
       <div>
            <h2 className="text-2xl font-bold font-headline mb-6 text-primary text-center">Institutional Libraries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutionalLibraries.map(lib => (
                    <Card key={lib.title}>
                         <CardHeader>
                            <CardTitle className="font-headline text-lg">{lib.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{lib.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
       </div>
    </div>
  );
}
