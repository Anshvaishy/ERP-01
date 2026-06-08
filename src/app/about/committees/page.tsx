import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Shield, BookOpen, UserCheck, Handshake, Landmark, Monitor, Heart, Scale } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const committees = [
    { 
        icon: Users, 
        title: "Internal Complaints Committee (ICC)", 
        description: "Ensures a safe and respectful environment by addressing complaints of sexual harassment, in compliance with The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.",
        members: ["Prof. (Dr.) Ritu Malviya (Presiding Officer)", "Dr. Meenal Tiwari (Member)", "Mr. Sanjay Verma (Member)", "Adv. Kunal Sharma (External Member)"]
    },
    { 
        icon: Shield, 
        title: "Anti-Ragging Committee", 
        description: "Proactively works to prevent ragging, which is a criminal offense, and addresses any incidents with strict and prompt action as per the UP Prohibition of Ragging in Educational Institutions Act 2010.",
        members: ["Prof. (Dr.) Rajesh Chauhan (Chairman)", "Mr. Deepak Singh (Member)", "Dr. Kavita Joshi (Member)", "Student Representative (Convener)"]
    },
    { 
        icon: UserCheck, 
        title: "Proctorial Board", 
        description: "Maintains discipline and decorum within the campus, ensuring a serene and conducive environment for the pursuit of academic excellence.",
        members: ["Dr. Alok Bansal (Chief Proctor)", "Mr. Saurabh Malviya (Proctor)", "Ms. Pooja Jain (Proctor)", "Er. Mohit Khurana (Proctor)"]
    },
    { 
        icon: Handshake, 
        title: "SC/ST Welfare Committee", 
        description: "The University is sensitive about the welfare of all students. This committee is dedicated to supporting SC and ST students and ensuring their well-being on campus.",
        members: ["Dr. Vinay Deshpande (Chairman)", "Prof. (Dr.) Shalini Kapoor (Member)", "Mr. Arjun Kapoor (Community Representative)", "Student Representative"]
    },
    { 
        icon: Heart, 
        title: "Students Welfare Fund Committee", 
        description: "Established to help needy, poor, and deserving students pursue their studies by providing necessary financial assistance.",
        members: ["Prof. (Dr.) Manoj Kulkarni (Chairman)", "Mr. Sanjay Verma (Finance Officer)", "Dr. Rakesh Iyer (Member)"]
    },
    { 
        icon: Users, 
        title: "Anti-Discrimination Cell", 
        description: "Ensures that everybody is provided with equal opportunity irrespective of caste, religion, language, or gender.",
        members: ["Justice (Retd.) Pankaj Mishra (Chairperson)", "Dr. Kavita Joshi (Member)", "Prof. (Dr.) Meenal Tiwari (Member)"]
    },
    { 
        icon: Monitor, 
        title: "Digital Learning Monitoring Cell", 
        description: "Established under the Digital Initiative by MHRD, this cell monitors and promotes digital learning resources and methodologies across the university.",
        members: ["Prof. (Dr.) Amit Srivastava (Coordinator)", "Dr. Ritu Chandra (Member, IQAC)", "Er. Rishabh Joshi (Technical Member)"]
    },
    { 
        icon: Handshake, 
        title: "Gender Sensitization Cell", 
        description: "Works towards creating awareness about gender issues and fostering an environment of gender justice, personal security, and dignity for all.",
        members: ["Dr. Sonal Prasad (Coordinator)", "Dr. Sandeepa Kaur Bhatani (Member)", "Ms. Pooja Jain (Member)"]
    },
    { 
        icon: Landmark, 
        title: "OBC Cell", 
        description: "Established with the purpose to empower and support students from Other Backward Classes (OBC) in their academic and extracurricular activities.",
        members: ["Dr. Prashant Srivastava (Coordinator)", "Dr. Shikha Srivastava (Member)", "Mr. Nitin Arora (Member)"]
    },
    { 
        icon: Landmark, 
        title: "Minority Cell", 
        description: "Aims to support and strengthen minority groups in all their extracurricular, co-curricular, and academic endeavors, ensuring an inclusive environment.",
        members: ["Dr. Karnika Srivastava (Coordinator)", "Dr. Vimlesh (Member)", "Student Representative"]
    },
    { 
        icon: Landmark, 
        title: "Unnat Bharat Cell", 
        description: "Inspired by the vision of transformational change in rural development by leveraging knowledge institutions to help build an inclusive India.",
        members: ["Dr. Lalit Kumar Shukla (Coordinator)", "Prof. (Dr.) Ramesh Pathak (Advisor)", "Er. Rohit Singh (Member)"]
    },
    { 
        icon: Scale, 
        title: "Student Grievance and Redressal Committee", 
        description: "Investigates and evaluates any complaints submitted by students, providing a fair and impartial mechanism for grievance resolution.",
        members: ["Prof. (Dr.) B. L. Gupta (Chairman)", "Prof. (Dr.) Manoj Kulkarni (Member Secretary)", "Two Senior Faculty Members"]
    },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Committees & Cells</h1>
                <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
                    Education has the potential to change our world. It is a powerful tool for eradicating inequality, gender disparity, diminishing poverty, and developing means for creating a sustainable planet. Founders of Obsidian Peak University envision it to be a globally recognized place of teaching-learning, research, and preparing human capital with ethical, social, and ecological sensibilities.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {committees.map((committee) => (
                    <Card key={committee.title} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <committee.icon className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-lg">{committee.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <p className="text-sm text-muted-foreground mb-4">{committee.description}</p>
                             {committee.members && committee.members.length > 0 && (
                                <Accordion type="single" collapsible className="w-full mt-auto">
                                    <AccordionItem value="item-1" className="border-t">
                                        <AccordionTrigger className="text-sm">View Members</AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                                {committee.members.map((member, index) => (
                                                    <li key={index}>{member}</li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
