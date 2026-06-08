import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const publications = [
    { title: "A Novel Approach to Machine Learning in Cybersecurity", authors: "Dr. A. Sharma, Dr. R. Verma", journal: "IEEE Transactions on Information Forensics and Security", year: "2025", type: "Journal" },
    { title: "Sustainable Agriculture Practices in Northern India", authors: "Prof. S. Gupta", journal: "International Journal of Agricultural Science", year: "2025", type: "Journal" },
    { title: "Advances in Nanotechnology for Drug Delivery", authors: "Dr. P. Singh", journal: "Proceedings of the National Academy of Sciences", year: "2024", type: "Conference Paper" },
    { title: "The Impact of GST on Small and Medium Enterprises", authors: "Dr. M. Khan", journal: "Journal of Business & Economic Policy", year: "2024", type: "Journal" },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Recent Publications</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              A glimpse into the impactful research being conducted by our faculty and scholars.
            </p>
          </div>
          <div className="space-y-6">
            {publications.map((pub) => (
                <Card key={pub.title}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{pub.title}</CardTitle>
                                <CardDescription className="mt-1 font-medium">{pub.authors}</CardDescription>
                            </div>
                            <Badge>{pub.type}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground italic">Published in: {pub.journal}, {pub.year}</p>
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
