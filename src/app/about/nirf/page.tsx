import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BookOpen, Users, GraduationCap, Microscope } from "lucide-react";

const nirfParams = [
    { icon: BookOpen, name: "Teaching, Learning & Resources" },
    { icon: Microscope, name: "Research and Professional Practice" },
    { icon: GraduationCap, name: "Graduation Outcomes" },
    { icon: Users, name: "Outreach and Inclusivity" },
    { icon: TrendingUp, name: "Perception" },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">NIRF Ranking</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Obsidian Peak University actively participates in the National Institutional Ranking Framework (NIRF), a methodology adopted by the Ministry of Education, Government of India, to rank institutions of higher education in India.
            </p>
          </div>
           <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">NIRF Parameters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                    {nirfParams.map((param) => (
                        <div key={param.name} className="flex flex-col items-center p-4 rounded-lg">
                            <div className="bg-primary/10 p-3 rounded-full mb-3">
                                <param.icon className="w-8 h-8 text-primary" />
                            </div>
                            <p className="font-medium text-muted-foreground">{param.name}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
