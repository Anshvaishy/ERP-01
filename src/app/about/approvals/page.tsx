
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Users, Briefcase, Link as LinkIcon, Printer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

type ApprovalItem = {
    title: string;
    authority: string;
    description: string;
    content: string;
}

type AssociationItem = {
    name: string;
    content: string;
}

type CollaborationItem = {
    name: string;
    description: string;
    content: string;
}

type DialogItem = {
    title: string;
    content: string;
}

const approvals: ApprovalItem[] = [
    { 
        title: "NAAC ACCREDITED", 
        authority: "NATIONAL ASSESSMENT & ACCREDITATION COUNCIL", 
        description: "Obsidian Peak University has been Accredited with a CGPA of 2.73 on a four point scale with “B+” Grade valid for a period of 5 years from January 24, 2023 in the first cycle.",
        content: "The National Assessment and Accreditation Council (NAAC) has accredited Obsidian Peak University with a 'B+' Grade, recognizing its commitment to quality education, infrastructure, and student support systems. This accreditation is a testament to our continuous efforts in maintaining high standards in teaching, research, and institutional practices."
    },
    { 
        title: "UNIVERSITY ACT AND GOVT. NOTIFICATION", 
        authority: "GOVT. OF UTTAR PRADESH", 
        description: "Obsidian Peak University has been established by UP State Govt. ACT 1 of 2012",
        content: "Obsidian Peak University is a fully government-recognized institution, established under the Uttar Pradesh State Legislature Act No. 1 of 2012. This notification empowers the university to confer degrees and operate as an autonomous body for higher education."
    },
    { 
        title: "UGC RECOGNITION", 
        authority: "UNIVERSITY GRANTS COMMISSION", 
        description: "Obsidian Peak University has been empowered to award degrees through its main campus by University Grants Commission under section 22 of UGC Act.",
        content: "The University Grants Commission (UGC) has recognized Obsidian Peak University under Section 2(f) and Section 22 of the UGC Act, 1956. This recognition authorizes the university to award degrees for its various programs offered through the main campus, ensuring that our degrees are valid and recognized nationwide."
    },
    { 
        title: "BCI APPROVAL", 
        authority: "BAR COUNCIL OF INDIA", 
        description: "Law programs offered by Obsidian Peak University have an approval from the Bar Council of India.",
        content: "The Bar Council of India (BCI) has granted approval to the law programs offered by our Institute of Legal Studies. This ensures our law curriculum meets the standards required for legal practice in India, and our graduates are eligible to enroll as advocates."
    },
    { 
        title: "PCI APROVAL", 
        authority: "PHARMACY COUNCIL OF INDIA", 
        description: "Pharmacy programs offered by Institute of Pharmacy of Obsidian Peak University have an apporval from the Pharmacy Council of India.",
        content: "The Pharmacy Council of India (PCI) has approved the pharmacy programs at Obsidian Peak University. This approval signifies that our curriculum, infrastructure, and faculty meet the national standards for pharmaceutical education, enabling our graduates to practice as registered pharmacists."
    },
    { 
        title: "NCTE APPROVAL", 
        authority: "NATIONAL COUNCIL FOR TEACHER EDUCATION", 
        description: "Education program offered by Obsidian Peak University has approval from the National Council for Teacher Education.",
        content: "Our teacher education programs are approved by the National Council for Teacher Education (NCTE). This ensures that our B.Ed. and other education-related courses adhere to the norms and standards set for producing qualified and effective educators."
    },
    { 
        title: "AIU MEMBERSHIP", 
        authority: "MEMBER OF ASSOCIATION OF INDIA UNIVERSITIES", 
        description: "Obsidian Peak University is a member of Association of Indian Universities.",
        content: "As a member of the Association of Indian Universities (AIU), Obsidian Peak University's degrees are recognized as equivalent to degrees from other Indian universities. This facilitates student mobility and academic collaboration across the country."
    },
    { 
        title: "AICTE JUDGEMENT", 
        authority: "ALL INDIA COUNCIL FOR TECHNICAL EDUCATION", 
        description: "Obsidian Peak University is running technical and management programs in acordance with the judgement of apex court.",
        content: "In line with the Honorable Supreme Court's judgment, Obsidian Peak University's technical and management programs, such as B.Tech and MBA, are conducted with the highest standards, even though universities are not required to take separate AICTE approval. Our curriculum remains industry-aligned and globally competitive."
    },
    { 
        title: "COA APPROVAL", 
        authority: "COUNCIL OF ARCHITECTURE", 
        description: "Architecture program offered by Obsidian Peak University has approval from the Council of Architecture.",
        content: "The Council of Architecture (COA) has approved the Bachelor of Architecture (B.Arch) program at Obsidian Peak University. This ensures that our students receive a comprehensive education that meets the professional standards required to practice as architects in India."
    },
];

const associations: AssociationItem[] = [
    { name: "LARSEN & TOUBRO LIMITED", content: "Membership and collaboration with L&T for industry-aligned curriculum, internships, and placement opportunities in the engineering and construction sectors." },
    { name: "TATA MOTORS", content: "Association with TATA Motors for joint research projects in automotive engineering and electric vehicle technology, providing students with exposure to industry-leading practices." },
    { name: "JBM", content: "Partnership with JBM Group for skill development in manufacturing and automation, including guest lectures and workshops by industry experts." },
    { name: "IBM", content: "Collaboration with IBM for specialized training and certification programs in areas like AI, Cloud Computing, and Cybersecurity through the IBM SkillsBuild platform." },
    { name: "UNIVERSITY FOR BUSINESS AND TECHNOLOGY (UBT), KOSOVO", content: "An international academic partnership for student and faculty exchange programs, fostering global perspectives and cross-cultural learning." },
    { name: "COLLEGE OF ARTS AND SCIENCES, TEXAS A&M UNIVERSITY-SAN ANTONIO", content: "MoU for joint academic and research activities, providing opportunities for students to engage in international research projects and attend summer school programs." },
    { name: "FICCI LADIES ORGANISATION", content: "Association to promote women's entrepreneurship and leadership through mentorship programs, workshops, and networking events for female students." },
    { name: "CONFEDERATION OF INDIAN INDUSTRY", content: "Active membership with CII, providing a platform for industry interaction, policy advocacy, and participation in national-level summits and conferences." },
    { name: "KAILASH SATYARTHI CHILDREN'S FOUNDATION", content: "Partnership for social outreach and community engagement projects, sensitizing students towards child rights and social welfare." },
    { name: "INDIAN INSTITUTE OF CORPORATE AFFAIRS (IICA)", content: "Collaboration for corporate governance and CSR training programs, equipping management students with contemporary business ethics and practices." },
    { name: "LMA", content: "Institutional membership with the Lucknow Management Association (LMA) for participation in local business seminars, leadership talks, and networking events." },
    { name: "E-CELL IIT MUMBAI", content: "Network membership with E-Cell IIT Bombay to foster an entrepreneurial ecosystem on campus through workshops, competitions, and mentorship from successful startup founders." },
    { name: "CSIR", content: "Collaboration with the Council of Scientific and Industrial Research (CSIR) for access to research facilities, joint projects, and guidance from senior scientists." },
    { name: "TNTO LEGAL WORLD", content: "Partnership with TNTO Legal World for internships, moot court training, and workshops on contemporary legal issues for law students." },
]

const collaborations: CollaborationItem[] = [
    { name: "Google", description: "Collaboration on AI, cloud computing, and digital marketing courses.", content: "Obsidian Peak University partners with Google to offer specialized courses and certifications in high-demand areas like AI, Machine Learning, and Google Cloud Platform. Students get hands-on experience with industry-standard tools and a curriculum co-developed with Google experts." },
    { name: "Microsoft", description: "Partnership for Azure cloud services, and student developer programs.", content: "Our collaboration with Microsoft provides students and faculty with access to the Microsoft Azure cloud platform, AI tools, and the Microsoft Learn for Educators program. This partnership supports curriculum development and provides students with globally recognized certifications." },
    { name: "IBM", description: "Joint programs on data science, cybersecurity, and blockchain technology.", content: "Through our partnership with IBM, we offer joint academic programs in emerging technologies. Students benefit from a curriculum enriched with IBM's software, courseware, and case studies, preparing them for specialized roles in the tech industry." },
    { name: "Tata Motors", description: "Partnership for Electric Vehicle (EV) research and training.", content: "This collaboration focuses on joint research and development in Electric Vehicle technology. Students get opportunities for internships and hands-on projects at Tata Motors' facilities, working on the future of mobility." },
    { name: "Infosys", description: "Campus Connect program for faculty development and student training.", content: "The Infosys Campus Connect program is a unique academia-industry partnership. It provides faculty with training on the latest technologies and offers students industry-ready curriculum and project experiences, enhancing their employability." },
    { name: "Larsen & Toubro", description: "Partnership for civil and mechanical engineering projects and internships.", content: "Our strategic partnership with L&T, a leader in engineering and construction, provides students with invaluable industry exposure through internships, live projects, and guest lectures from senior L&T engineers. This collaboration ensures our curriculum is aligned with the latest industry practices." },
];

function ApprovalDetailsDialog({ item, open, onOpenChange }: { item: DialogItem | null, open: boolean, onOpenChange: (open: boolean) => void }) {
    if (!item) return null;

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>' + item.title + '</title>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<h1>' + item.title + '</h1>');
            printWindow.document.write('<p>' + item.content + '</p>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-muted-foreground">{item.content}</div>
                <DialogFooter>
                    <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print / Download</Button>
                    <DialogClose asChild><Button>Close</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default function Page() {
    const [selectedItem, setSelectedItem] = useState<DialogItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = (item: DialogItem) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    }
  
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Approvals & Associations</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
            Obsidian Peak University’s commitment to excellence has been recognised by various leadership, industry and academic bodies. The Uttar Pradesh State Legislature established Obsidian Peak University as a full-fledged university, and it is included among the list of universities that the University Grants Commission maintains under Section 2(f), with the authority to award degrees in accordance with Section 22(1) of the UGC Act, 1956.
        </p>
      </div>
      
      <div className="space-y-16">
        <div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center flex items-center justify-center gap-3"><CheckCircle className="w-8 h-8" /> Approvals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvals.map((approval) => (
                    <Card key={approval.title} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">{approval.title}</CardTitle>
                            <CardDescription>{approval.authority}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{approval.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                           <Button variant="outline" className="w-full" onClick={() => handleOpenDialog({title: approval.title, content: approval.content})}>
                                <Download className="mr-2 h-4 w-4" /> Download PDF
                           </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center flex items-center justify-center gap-3"><Users className="w-8 h-8" /> Associations & Memberships</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {associations.map((item) => (
                    <Card key={item.name} className="text-center">
                        <CardHeader>
                           <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
                        </CardHeader>
                         <CardContent>
                           <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenDialog({title: item.name, content: item.content})}>
                               <Download className="mr-2 h-4 w-4" /> Download PDF
                           </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        
        <div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center flex items-center justify-center gap-3"><Briefcase className="w-8 h-8" /> Industrial Collaborations</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                Obsidian Peak University’s industry-aligned curriculum and course design is its speciality, and hence, it works in tandem with multiple industry bodies.
            </p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collaborations.map((item) => (
                    <Card key={item.name}>
                        <CardHeader>
                           <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                           <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenDialog({title: item.name, content: item.content})}>
                                <LinkIcon className="mr-2 h-4 w-4" /> Learn More
                           </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

      </div>

      <ApprovalDetailsDialog item={selectedItem} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}

    