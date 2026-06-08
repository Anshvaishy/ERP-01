
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Counter } from "@/components/counter";
import { HandHelping, Users, Droplets, BookOpen, Shield, Recycle, GraduationCap, Leaf } from "lucide-react";
import { CardStack } from "@/components/ui/card-stack";

const stats = [
    { value: 1000, label: "Camps Organised", icon: HandHelping, suffix: "+" },
    { value: 500, label: "NSS Volunteers", icon: Users, suffix: "+" },
    { value: 50, label: "Blood Donation Drives", icon: Droplets, suffix: "+" },
];

const initiatives = [
    { 
        id: "apni-pathshala",
        icon: GraduationCap, 
        title: "Apni Pathshala", 
        description: "To empower underprivileged children, 'Apni Pathshala' was constituted to impart primary education. It also organizes free skill development workshops for women from nearby villages to enhance their livelihood." 
    },
    { 
        id: "nss",
        icon: HandHelping, 
        title: "NSS (National Service Scheme)", 
        description: "Obsidian Peak University motivates students for social welfare. NSS Volunteers contribute their knowledge and skills at the ground level, providing service to society without bias." 
    },
    { 
        id: "shuddhi",
        icon: Recycle, 
        title: "Shuddhi", 
        description: "A CSR campaign in sync with the Swachh Bharat Mission, aimed at promoting hygiene, sanitation, and healthy living habits to ensure everyone is aware of the basics of healthy living." 
    },
    { 
        id: "legal-aid",
        icon: Shield, 
        title: "Free Legal Aid Centre", 
        description: "The Institute of Legal Studies' Legal Aid Cell seeks to ensure dissemination of justice equally among all sections of society by promoting free legal aid for the disadvantaged." 
    },
    { 
        id: "swacch-bharat",
        icon: Recycle, 
        title: "Swacch Bharat Abhiyan", 
        description: "NSS volunteers regularly organize 7-day special camps in adopted villages, conducting door-to-door campaigns to make the local masses aware of the importance of cleanliness." 
    },
    { 
        id: "unnat-bharat",
        icon: Leaf, 
        title: "Unnat Bharat Abhiyan", 
        description: "A movement towards rural transformation. Initiatives include free mask and sanitizer distribution, created by engaging and paying women from nearby villages for their stitching skills." 
    },
];

export default function Page() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Outreach Activities</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
            Obsidian Peak University’s CSR activities intend to link the university with the community. Geographically surrounded by villages, these activities have been an integral part of our university since its inception. With a vision to improve the condition of rural people, the university has adopted five villages, making efforts to bring about appropriate behavioral changes by imparting education and sensitizing them towards the use of science and technology.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-2">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <stat.icon className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                     <CardTitle className="text-4xl font-bold">
                        <Counter end={stat.value} suffix={stat.suffix} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground font-semibold">{stat.label}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      {/* Initiatives Section */}
      <div>
        <h2 className="text-3xl font-bold font-headline text-center mb-8 text-primary">Our Initiatives</h2>
        <div className="flex items-center justify-center">
          <CardStack items={initiatives} />
        </div>
      </div>
      
       {/* Holistic Development Section */}
       <Card className="mt-12 bg-primary/5">
            <CardHeader>
                <CardTitle>Holistic Student Development</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    With such extension and outreach programs, Obsidian Peak University sensitizes its students to develop social values, widen their social responsibilities and knowledge towards community issues and challenges. Students are motivated to join NSS, NCC, 1090-Power Angel, Unnat Bharat Abhiyan (UBA) and Apni Pathshala. To promote the feeling of social service, the University organizes Medical and Blood Donation Camps where every year many students donate blood. With the active involvement of NGOs, the university strives to promote awareness on critical issues and students motivate villagers to educate their children.
                </p>
            </CardContent>
       </Card>

    </div>
  );
}
