import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star } from "lucide-react";

const awards = [
  { title: "AA+ Rating for B-School", year: "2025", authority: "Career 360", icon: Star },
  { title: "Excellence in Research & Innovation", year: "2024", authority: "National Education Summit", icon: Award },
  { title: "Top University for Placements", year: "2024", authority: "Corporate Insights Magazine", icon: Star },
  { title: "Green Campus Award", year: "2023", authority: "Ministry of Environment", icon: Award },
  { title: "Best University for Industry Interface", year: "2023", authority: "ASSOCHAM", icon: Star },
  { title: "Outstanding Contribution to Higher Education", year: "2022", authority: "Education World", icon: Award },
  { title: "Best University for Innovation", year: "2022", authority: "India Today Rankings", icon: Star },
  { title: "Top 10 Private Universities in India", year: "2021", authority: "The Week Magazine", icon: Award },
  { title: "Best Private University in North India", year: "2025", authority: "Education Excellence Awards", icon: Star },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
           <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Awards & Rankings</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                Our commitment to excellence is reflected in the numerous accolades and recognitions we have received over the years.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="group relative overflow-hidden bg-card hover:shadow-xl transition-shadow duration-300 flex flex-col text-left">
                <CardHeader>
                   <div className="flex justify-between items-start">
                        <div className="bg-primary/10 p-3 rounded-full transition-colors duration-300 group-hover:bg-primary">
                          <award.icon className="w-7 h-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                        </div>
                        <Badge variant="secondary" className="font-bold text-sm">{award.year}</Badge>
                   </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <CardTitle className="font-headline text-xl mb-2 flex-grow">{award.title}</CardTitle>
                  <p className="text-sm font-semibold text-muted-foreground">{award.authority}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
