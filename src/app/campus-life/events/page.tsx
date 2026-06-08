
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Theater,
  Cpu,
  Trophy,
  BookOpen,
  Mic,
  Leaf,
  PartyPopper,
  Brain,
  Globe,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useEffect, ReactNode } from 'react';

const AnimatedSection = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const eventSections = [
  {
    icon: Theater,
    title: "Utsav – Annual Cultural Fest",
    description: "Utsav is the university’s flagship cultural festival and the most awaited event of the year. It celebrates art, culture, and student creativity. The fest features classical and western dance competitions, solo and band music performances, street plays, stage dramas, fashion parades, fine arts exhibitions, poetry slams, and short-film contests."
  },
  {
    icon: Cpu,
    title: "TechNova – Technical & Innovation Fest",
    description: "TechNova is a platform for innovation, critical thinking, and technical excellence. It includes hackathons, coding battles, app development challenges, robotics competitions, project expos, technical quizzes, and paper presentations."
  },
  {
    icon: Trophy,
    title: "Aarambh – Annual Sports Meet",
    description: "Aarambh symbolizes the spirit of sportsmanship and healthy competition. Students participate in athletics, cricket, football, basketball, volleyball, kabaddi, badminton, table tennis, chess, and indoor games."
  },
  {
    icon: BookOpen,
    title: "GyanSangam – Academic Conferences & Seminars",
    description: "GyanSangam is a series of academic conferences, seminars, and workshops conducted throughout the year. It brings together scholars, researchers, faculty, and students to discuss current research, innovations, and academic developments."
  },
  {
    icon: Mic,
    title: "Prerna Talks – Guest Lectures & Alumni Interaction",
    description: "Prerna Talks is a knowledge-sharing initiative featuring industry experts, entrepreneurs, senior professionals, and distinguished alumni. Speakers share insights on career planning, leadership, entrepreneurship, and industry expectations."
  },
  {
    icon: Leaf,
    title: "Samarpan – Social Responsibility & Outreach Program",
    description: "Samarpan focuses on community service and social awareness. Activities include blood donation camps, tree plantation drives, cleanliness campaigns, health awareness programs, rural outreach initiatives, and social welfare projects."
  },
  {
    icon: PartyPopper,
    title: "Abhinandan – Freshers’ Welcome",
    description: "Abhinandan is a warm welcome program for new students. It helps freshers feel comfortable and connected with campus life through cultural performances, interactive sessions, games, and student introductions."
  },
  {
    icon: Sparkles,
    title: "Vidai – Farewell Ceremony",
    description: "Vidai is a heartfelt farewell event organized for graduating students. It celebrates their academic journey, achievements, and memories. Cultural performances, awards, speeches, and video retrospectives make it a memorable milestone."
  },
  {
    icon: Brain,
    title: "Club Conclave – Student Clubs & Societies Fest",
    description: "Club Conclave brings together all student-run clubs and societies on a single platform. Technical clubs, cultural groups, literary societies, entrepreneurship cells, and social clubs showcase their activities and achievements."
  },
  {
    icon: Globe,
    title: "Unifest – Inter-University Competitions",
    description: "Unifest hosts inter-college and inter-university competitions in academics, culture, sports, and technology. It provides students with exposure, networking opportunities, and a competitive platform beyond the campus."
  },
];


export default function Page() {
  return (
    <div>
      <div className="text-center mb-12">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Campus Events with Signature Event Names</h1>
          <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
            Our university hosts a rich calendar of well-planned events, each with a unique identity and purpose. These signature events reflect our commitment to academic excellence, cultural diversity, innovation, leadership, and community engagement.
          </p>
        </AnimatedSection>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventSections.map((section, index) => (
          <AnimatedSection key={index}>
            <Card className="h-full hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <section.icon className="w-8 h-8 text-primary" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
      
      <div className="mt-12 grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <Card className="h-full bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                        <div className="bg-primary/10 p-2 rounded-full"><Calendar className="w-6 h-6 text-primary" /></div>
                        Stay Connected
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">All event schedules, registrations, and updates are shared through the university website, student portal, and notice boards. Students are encouraged to actively participate, volunteer, and lead initiatives.</p>
                </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection>
            <Card className="h-full bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                        <div className="bg-primary/10 p-2 rounded-full"><Sparkles className="w-6 h-6 text-primary" /></div>
                        A Vibrant Campus Experience
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Each event is thoughtfully designed to support holistic development by blending academics, creativity, innovation, and social responsibility. Together, these events create a dynamic campus life that shapes confident, skilled, and well-rounded individuals.</p>
                </CardContent>
            </Card>
          </AnimatedSection>
      </div>

    </div>
  );
}
