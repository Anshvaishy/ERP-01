
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail, Phone, Link as LinkIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

const senateActivities = {
    "2022-23": [
        "The formation of Student Senate has been amended from session 2022-23 wherein for the post of Institute Representatives (IRs) and Office Bearers process of election has been changed as per University Student Senate amended Policy and an impartial Selection Committee at Institute Level and University Level respectively will judge through interview/interaction amongst all the interested CRs for IRs and IRs for Office Bearer who have filed their nomination as a candidate for the said post.",
        "Announcement of dates of Nomination and Election of Class Representative (CRs), Institute Representative (IRs), Office Bearers and Nominated Members on 20th September, 2022 and amended on 10th October, 2022.",
        "The Class Representative’s election have been successfully conducted on 11th October, 2022 with 165 CRs being elected/unopposed from all Institutes, while selection for University Student Senate 40 IRs on 21st October, 2022 while for 10 Nominated Members and 4 Office Bearers on 29th October, 2022.",
        "Badge Giving and Oath Taking Ceremony was held on 23rd November, 2022 with Hon’ble Vice Chancellor, Pro Vice Chancellor and Registrar.",
        "Meetings with IRs on 8th February and 27th April, 2023 to finalize the agenda points for the meeting with University Authorities.",
        "Meeting with IRs and University Authorities headed by Vice Chancellor on 8th May, 2023 with 15 agenda points from Senate side was handled by Convener and Secretary of USS in association with DSW.",
        "Concluding Meeting with Senate Members was held on 21st June, 2023 wherein Action Taken Report was presented by Dy. Reg. Acad. and then Certificates were distributed amongst Senate Members by Hon’ble Vice Chancellor and Pro Vice Chancellor while Director-Student welfare proposed the vote of thanks."
    ],
    "2021-22": [
        "Virtual Oath Taking Ceremony conducted for the new senate members in light of ongoing health guidelines.",
        "Organized a university-wide survey on the effectiveness of online classes and hybrid learning models, presenting a comprehensive report to the Academic Council.",
        "Successfully campaigned for extended digital library access and resources for all students.",
        "Hosted a series of webinars on career development and post-graduation opportunities with industry experts.",
        "Facilitated the creation of a digital grievance redressal portal for faster query resolution."
    ],
    "2020-21": [
        "Coordinated with university administration to ensure smooth transition to fully online learning platforms.",
        "Established a student-led support group to assist peers with technical and academic challenges related to remote learning.",
        "Proposed and implemented a 'pass/fail' grading option for elective courses to reduce academic pressure during the pandemic.",
        "Organized virtual cultural and technical events to maintain campus community engagement despite physical distancing.",
        "Liaised with the IT department to address and resolve campus-wide internet connectivity issues reported by students."
    ],
    "2019-20": [
        "Conducted the annual Student Senate elections, resulting in the formation of a new representative body for the academic year.",
        "Successfully proposed the installation of water purification stations across all academic blocks and hostels.",
        "Initiated a campus-wide 'Green Campus' drive, including large-scale tree plantation and waste segregation awareness programs.",
        "Organized 'Spardha 2019', the annual inter-institute sports meet, which saw record participation from students across all departments.",
        "Presented a formal proposal for the renovation and modernization of the university cafeteria, which was approved by the board."
    ],
    "2018-19": [
        "The first University Student Senate was formally constituted, and the inaugural members took the oath of office.",
        "Drafted and ratified the official constitution and by-laws of the Student Senate, establishing its structure and operational guidelines.",
        "Established the defined roles and responsibilities of Class Representatives (CRs) and Institute Representatives (IRs).",
        "Held the inaugural meeting with the Vice Chancellor to present the senate's vision, objectives, and charter for the academic year.",
        "Proposed the formation of several new student clubs, including a coding club and a social service league, which were subsequently approved."
    ],
};

function SenateDocDialog({ title, content }: { title: string, content: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-4"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-muted-foreground text-sm max-h-96 overflow-y-auto">{content}</div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => window.print()}>Print</Button>
                    <DialogClose asChild><Button>Close</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function Page() {
  const directorImage = PlaceHolderImages.find(p => p.id === 'dean-male');
  
  const overviewContent = "The Student Senate focuses on two key concerns: fostering an independent student body capable of addressing academic and administrative issues, and collaborating with university authorities to reach new solutions and strategies to benefit university life.";
  const preambleContent = "The Lyngdoh Committee Report makes certain recommendations in the election of student bodies in universities. Obsidian Peak University has adopted an indirect method of election to establish an independent University Student Senate. Senate members, in collaboration with university authorities, shall work to enhance the overall academic ambience, general discipline among students, and campus life.";
  const formationContent = "The Senate is established through an indirect election process, with Class Representatives (CRs) directly elected for each undergraduate and postgraduate class. These CRs then elect a set number of Institute Representatives (IRs) from each institute, totaling 40 elected IRs. The 40 IRs, along with 10 Nominated Members, form the University Student Senate, consisting of 50 members who further elect 4 Office Bearers—Convener, Deputy Convener, Secretary, and Treasurer.";

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Student Senate</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
          Obsidian Peak University's student senate is an independent student body to address academic and administrative concerns, facilitating amicable solutions with university authorities. It is an interface through which student concerns get represented to the university authorities with a fair and community-driven approach.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Director's Profile */}
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardHeader className="text-center">
                    {directorImage && (
                        <Avatar className="w-32 h-32 mx-auto border-4 border-primary">
                            <AvatarImage src={directorImage.imageUrl} alt="Dr. Sanjay Sharma" />
                            <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                    )}
                    <CardTitle className="mt-4 font-headline">Dr. Sanjay Sharma</CardTitle>
                    <CardDescription>Director Student Welfare</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-3">
                    <p><strong>Qualification:</strong> M.Sc. (Physics), M.Sc. (Maths), Ph.D.</p>
                    <p><strong>Experience:</strong> 25 Years</p>
                    <p><strong>Ph.D Guided:</strong> 01 (Awarded)</p>
                    <div className="flex items-center gap-2">
                       <Mail className="w-4 h-4"/> <a href="mailto:director.dsw@obsidianpeak.ac.in" className="hover:text-primary">director.dsw@obsidianpeak.ac.in</a>
                    </div>
                    <div className="flex items-center gap-2">
                       <Phone className="w-4 h-4"/> <a href="tel:+918090954435" className="hover:text-primary">+91-8090954435</a>
                    </div>
                     <div className="flex items-center gap-2">
                       <LinkIcon className="w-4 h-4"/> <a href="https://orcid.org/0000-0002-3490-9162" target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate">orcid.org/0000-0002-3490-9162</a>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        {/* Senate Details */}
        <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="preamble">Preamble</TabsTrigger>
                    <TabsTrigger value="formation">Formation</TabsTrigger>
                    <TabsTrigger value="meetings">Meetings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Card>
                        <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{overviewContent}</p>
                           <SenateDocDialog title="Senate Overview" content={overviewContent} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="preamble">
                    <Card>
                        <CardHeader><CardTitle>Preamble</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{preambleContent}</p>
                            <SenateDocDialog title="Senate Preamble" content={preambleContent} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="formation">
                    <Card>
                        <CardHeader><CardTitle>Formation of University Student Senate</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{formationContent}</p>
                            <SenateDocDialog title="Senate Formation Policy" content={formationContent} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="meetings">
                    <Card>
                        <CardHeader><CardTitle>Meeting Frequency</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Class Representatives (CRs) and Institute Representatives (IRs) meet twice a semester to gather agenda points and communicate decisions to all students. IRs also meet with university authorities once a semester to discuss agenda points and, within a specified timeframe, resolve academic or administrative issues.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            
            <div className="mt-8">
                <h3 className="text-2xl font-bold font-headline mb-4">Past Activities</h3>
                <Accordion type="single" collapsible defaultValue="item-0">
                  {Object.entries(senateActivities).map(([year, activities], index) => (
                    <AccordionItem value={`item-${index}`} key={year}>
                      <AccordionTrigger>Year {year}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {activities.map((activity, i) => (
                                <li key={i}>{activity}</li>
                            ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
            </div>
        </div>
      </div>
    </div>
  );
}
