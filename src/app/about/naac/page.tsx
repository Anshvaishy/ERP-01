import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const criteria = [
  { name: "Curricular Aspects" },
  { name: "Teaching-Learning and Evaluation" },
  { name: "Research, Innovations and Extension" },
  { name: "Infrastructure and Learning Resources" },
  { name: "Student Support and Progression" },
  { name: "Governance, Leadership and Management" },
  { name: "Institutional Values and Best Practices" },
];

export default function Page() {
  const naacImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">NAAC Accreditation</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Obsidian Peak University is proud to be accredited by the National Assessment and Accreditation Council (NAAC), an autonomous body established by the UGC to assess and accredit institutions of higher education in the country.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4">NAAC Assessment Criteria</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {criteria.map((item) => (
                       <li key={item.name} className="flex items-center">
                         <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                         <span className="text-muted-foreground">{item.name}</span>
                       </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            {naacImage && (
              <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-md">
                <Image
                  src={naacImage.imageUrl}
                  alt="NAAC Accreditation"
                  data-ai-hint={naacImage.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
