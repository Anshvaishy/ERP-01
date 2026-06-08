import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Recycle, Leaf } from "lucide-react";

const initiatives = [
    { icon: Sun, title: "Solar Power Generation", description: "A significant portion of our campus's energy needs are met by our rooftop solar power plant." },
    { icon: Recycle, title: "Waste Management", description: "We have a comprehensive waste segregation and recycling program to minimize our environmental footprint." },
    { icon: Leaf, title: "Tree Plantation Drives", description: "Regular tree plantation events are organized to maintain and enhance the green cover of our campus." },
];

export default function Page() {
  const greenImage = PlaceHolderImages.find(p => p.id === 'facilities-green');
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Green Initiatives</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
          Obsidian Peak University is committed to sustainability and creating an eco-friendly campus.
        </p>
      </div>
      {greenImage && (
        <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-md mb-12">
            <Image
            src={greenImage.imageUrl}
            alt="Green Campus"
            data-ai-hint={greenImage.imageHint}
            fill
            className="object-cover"
            />
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-8">
        {initiatives.map(item => (
            <Card key={item.title}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                         <div className="bg-primary/10 p-2 rounded-full"><item.icon className="w-6 h-6 text-primary" /></div>
                         {item.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
