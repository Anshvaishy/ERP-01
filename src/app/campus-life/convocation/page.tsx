
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
    const convocationImage = PlaceHolderImages.find(p => p.id === 'facilities-events');
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Convocation</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
          University convocation is a significant and ceremonial event marking the culmination of years of academic dedication and achievement for graduating students.
        </p>
      </div>
      
      {convocationImage && (
        <div className="relative h-[50vh] w-full overflow-hidden rounded-lg shadow-md mb-12">
            <Image
            src={convocationImage.imageUrl}
            alt="Convocation Ceremony"
            data-ai-hint={convocationImage.imageHint}
            fill
            className="object-cover"
            />
        </div>
      )}

      <div className="space-y-12">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">The Significance of Convocation</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                    This formal gathering brings together students, faculty, staff, families, and distinguished guests to celebrate the successful completion of academic programs. The convocation typically involves a solemn procession, the conferring of degrees, inspiring speeches from notable figures or university leaders, and the presentation of awards to outstanding graduates. It serves as a momentous rite of passage, symbolizing the transition from student life to the professional world.
                </p>
                <blockquote className="text-xl italic font-semibold text-center">
                    "As you start this new chapter, remember that learning is a lifelong journey, and your convocation is just the beginning."
                </blockquote>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Our First Convocation</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                    The first convocation is a momentous occasion marking the inaugural formal graduation ceremony for an academic institution. Obsidian Peak University organized its First Convocation Ceremony on 11th October, 2021 in the university campus to felicitate the passed out students with degrees. A glimpse of Indian Culture was reflected in this first Convocation.
                </p>
                <p>
                    For the sessions 2019-20 and 2020-21, a total of 2954 degrees were conferred online to the Undergraduates, Postgraduates and Doctorate students. Ensuring Covid-19 protocols, the ceremony was a symbolic event where only Gold and Silver medallists were invited on campus for felicitation. The event started with an academic procession followed by a lamp lighting ceremony by the chief guests Prof. V.N. Rajasekharan Pillai, former Chairman, UGC, Er. Pankaj Agarwal, Chancellor, Er. Pooja Agarwal, Pro-Chancellor, Prof. A.K. Singh Vice-Chancellor, Dr. Sudhir Kumar Mishra (BrahMos Aerospace CEO & MD) and Padma Shri Prahlad Singh Tipania (Kabir Folklore).
                </p>
            </CardContent>
        </Card>

        <div className="text-center">
            <h2 className="text-2xl font-bold font-headline">Watch the Ceremony</h2>
            <p className="text-muted-foreground mt-2 mb-6">Relive the memorable moments from our last convocation ceremony.</p>
            <Button asChild size="lg">
                <Link href="#">
                    <Video className="mr-2"/> Watch Now
                </Link>
            </Button>
        </div>
      </div>

    </div>
  );
}
