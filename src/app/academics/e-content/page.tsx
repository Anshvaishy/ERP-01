
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Star, Users, Mail, Rocket } from "lucide-react";

const aims = [
    "To connect with as many online beneficiaries as possible by disseminating college knowledge resources and seeking outside experts to prepare students for the difficulties of the digital world.",
    "To promote and facilitate the staff members’ independent e-content creation through ongoing training sessions and seminars.",
    "Establish partnerships with surrounding academic institutions to continue the development of new methodologies and material."
];

const committeeMembers = [
    "Dr. Ritu Chandra - IQAC Chairperson",
    "Dr. Sonal Prasad, Assistant Professor, Institute of Biosciences & Technology- Coordinator, E-Content Development Cell",
    "Dr. Amit Kumar Singh, Assistant Professor, Faculty of Mechanical engineering",
    "Er. Rishabh Joshi, Assistant Professor, Faculty of Civil engineering",
    "Dr. Lalit Kumar Shukla, Assistant Professor, Faculty of Physical Sciences",
    "Dr. Vimlesh, Assistant Professor, Faculty of Mathematics",
    "Dr. Sandeepa Kaur Bhatani, Assistant Professor, Institute of Education & research",
    "Dr. Prashant Srivastava, Assistant Professor, Institute of Legal Studies",
    "Dr. Karnika Srivastava, Associate Professor, Institute of Management, Commerce & Economics",
    "Dr. Shikha Srivastava, Assistant Professor, Institute of Pharmacy",
    "Er. Rohit Singh, Assistant Professor, Obsidian Peak Polytechnic"
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">E-Content Development Cell</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
              Information and communication technology (ICT) has been promoted in education through a number of creative efforts recently undertaken by MHRD, UGC, and the Government of India. Obsidian Peak University established an E-Content Development Cell as a result of this. The cell aims to inspire the faculty members to be creative of their academic writing. It strives to maximize the creation and accessibility of online materials, including texts, videos, animations, web connections and self -assessment exercises.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CheckCircle className="w-6 h-6 text-primary"/>Aims & Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {aims.map((aim, i) => (
                            <li key={i} className="flex items-start">
                                <Star className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{aim}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <div className="space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Star className="w-6 h-6 text-primary"/>UPHEDL Ranking Status</CardTitle>
                        <CardDescription>As of 30th July 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                            <li>Ranked <strong>6th</strong> among all universities of Uttar Pradesh.</li>
                            <li>Ranked <strong>3rd</strong> as a private State university.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Rocket className="w-6 h-6 text-primary"/>Key Initiatives</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                            <li>Obsidian Peak University SWAYAM NPTEL Local Chapter</li>
                            <li>IIRS – ISRO Outreach Program</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </div>
          
           <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="w-6 h-6 text-primary"/>Committee Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 grid md:grid-cols-2 gap-x-6">
                        {committeeMembers.map((member, i) => (
                            <li key={i} className="text-muted-foreground">{member}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            
            <div className="mt-12 text-center">
                 <h3 className="text-lg font-semibold">For any query please contact:</h3>
                 <a href="mailto:e-contentdevelopmentcell@obsidianpeak.ac.in" className="text-primary hover:underline flex items-center justify-center gap-2 mt-2">
                    <Mail className="w-5 h-5"/> e-contentdevelopmentcell@obsidianpeak.ac.in
                 </a>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
