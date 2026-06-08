
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Shield, Lightbulb } from "lucide-react";

const initiatives = [
    { icon: Shield, title: "Safety & Security", description: "Ensuring a safe and secure campus environment for female students and staff is our top priority." },
    { icon: Lightbulb, title: "Leadership Workshops", description: "Organizing workshops and mentorship programs to empower female students to take on leadership roles." },
    { icon: Handshake, title: "Awareness Campaigns", description: "Conducting campaigns on gender sensitization, women's health, and legal rights." },
];

export default function Page() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Women Empowerment Cell</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
          The Women Empowerment Cell at Obsidian Peak University is dedicated to fostering a gender-sensitive campus and empowering our female students and staff.
        </p>
      </div>
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
