import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Lightbulb, TrendingUp } from "lucide-react";

const cellFunctions = [
    { icon: Users, title: "Student Training", description: "Conducting soft skills, aptitude, and technical training to make students industry-ready." },
    { icon: Briefcase, title: "Industry Connect", description: "Building and maintaining relationships with top companies for recruitment and internships." },
    { icon: Lightbulb, title: "Career Counseling", description: "Providing personalized career guidance and counseling to help students make informed choices." },
    { icon: TrendingUp, title: "Placement Drives", description: "Organizing on-campus and off-campus placement drives with leading recruiters." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Training & Placement Cell</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Our dedicated Training & Placement Cell is the bridge between our students and their future careers at Obsidian Peak University.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cellFunctions.map((item) => (
              <Card key={item.title} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
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
      </main>
      <Footer />
    </div>
  );
}
