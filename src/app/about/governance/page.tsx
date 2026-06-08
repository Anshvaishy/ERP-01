
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { User, Mail, Phone } from 'lucide-react';

type Member = {
  name: string;
  role: string;
  details: string;
  bio: string;
  qualification?: string;
  experience?: string;
};

const governingBody: Member[] = [
    { name: 'Mr. Ansh Vaishy', role: 'Chairman', details: 'Chancellor, Obsidian Peak University', bio: 'Mr. Ansh Vaishy provides strategic leadership and overall direction to the University. He plays a key role in policy formulation, long-term institutional planning, and strengthening governance practices in alignment with national higher education standards.', qualification: 'M.B.A. (Harvard)', experience: '30+ years in Leadership & Management' },
    { name: 'Prof. (Dr.) B. L. Gupta', role: 'President', details: 'Vice Chancellor, Obsidian Peak University', bio: 'Prof. (Dr.) B. L. Gupta oversees academic and administrative leadership of the University. He is responsible for implementing institutional policies, promoting academic excellence, and ensuring quality assurance mechanisms.', qualification: 'Ph.D. in Engineering', experience: '25+ years in Academic Administration' },
    { name: 'Dr. Neeraj Agarwal', role: 'Vice Chairperson', details: 'Pro-Chancellor', bio: 'Actively involved in governance oversight, strategic decision-making, and institutional development initiatives.', qualification: 'Ph.D. in Economics', experience: '20+ years in Governance' },
    { name: 'Mr. Rohan Malhotra', role: 'Nominated Member', details: 'Managing Director, Industrial Enterprise', bio: 'Brings industry expertise to strengthen industry–academia collaboration and employability-focused initiatives.', qualification: 'B.Tech, M.B.A.', experience: '22+ years in Corporate Sector' },
    { name: 'Adv. Kunal Sharma', role: 'Nominated Member', details: 'Senior Legal Advisor', bio: 'Provides guidance on statutory compliance, regulatory frameworks, and legal governance matters.', qualification: 'LL.M.', experience: '18+ years in Corporate Law' },
    { name: 'Prof. (Dr.) Amit Srivastava', role: 'Nominated Member', details: 'Director – Research & Innovation', bio: 'Contributes to research governance, innovation policies, and academic planning.', qualification: 'Ph.D. in Physics', experience: '15+ years in Research Management' },
    { name: 'Prof. (Dr.) Ritu Malviya', role: 'Nominated Member', details: 'Director – IQAC', bio: 'Leads quality assurance systems, accreditation processes, and continuous academic improvement initiatives.', qualification: 'Ph.D. in Education', experience: '17+ years in Quality Assurance' },
    { name: 'Mr. Sanjay Verma', role: 'Special Invitee', details: 'Finance Officer', bio: 'Responsible for financial planning, budgeting, and statutory financial compliance.', qualification: 'Chartered Accountant (CA)', experience: '20+ years in Financial Management' },
    { name: 'Prof. (Dr.) Manoj Kulkarni', role: 'Member Secretary', details: 'Registrar', bio: 'Manages statutory documentation, coordination of governance bodies, and regulatory compliance.', qualification: 'Ph.D. in Public Administration', experience: '18+ years in University Administration' },
];

const executiveCouncil: Member[] = [
    { name: 'Prof. (Dr.) B. L. Gupta', role: 'President & Chairperson', details: 'Vice Chancellor, Obsidian Peak University', bio: 'Provides leadership in executive decision-making, policy implementation, and institutional operations.', qualification: 'Ph.D. in Engineering', experience: '25+ years in Academic Administration' },
    { name: 'Prof. (Dr.) Rajesh Chauhan', role: 'Nominated Member', details: 'Former Vice Chancellor', bio: 'Supports strategic planning and governance best practices.', qualification: 'Ph.D.', experience: '30+ years in Academia' },
    { name: 'Justice (Retd.) Pankaj Mishra', role: 'Nominated Member', details: '', bio: 'Ensures ethical governance, legal oversight, and transparency.', qualification: 'LL.B.', experience: 'Former High Court Judge' },
    { name: 'Dr. Kavita Joshi', role: 'Nominated Member', details: 'Vice Chancellor, National University', bio: 'Contributes expertise in academic leadership and policy development.', qualification: 'Ph.D.', experience: '25+ years as Vice Chancellor' },
    { name: 'Mr. Arjun Kapoor', role: 'Nominated Member', details: 'Chairman & Managing Director', bio: 'Strengthens corporate partnerships and institutional outreach.', qualification: 'M.B.A.', experience: '30+ years in Industry' },
    { name: 'Mr. Deepak Singh', role: 'Nominated Member', details: 'Chief Engineer', bio: 'Advises on infrastructure development and technical planning.', qualification: 'M.Tech (Civil)', experience: '28+ years in Engineering' },
    { name: 'Mr. Nitin Arora', role: 'Nominated Member', details: 'Senior HR Professional', bio: 'Supports skill development, training, and placement strategies.', qualification: 'PGDM (HR)', experience: '20+ years in Human Resources' },
    { name: 'Ms. Pooja Jain', role: 'Ex-Officio Member', details: 'Director – Admissions', bio: 'Leads student admissions, outreach, and enrollment management.', qualification: 'M.B.A.', experience: '15+ years in Admissions' },
    { name: 'Dr. Rakesh Iyer', role: 'Ex-Officio Member', details: 'Director – Research & Consultancy', bio: 'Promotes research culture, consultancy, and innovation.', qualification: 'Ph.D.', experience: '18+ years in Research' },
    { name: 'Prof. (Dr.) Manoj Kulkarni', role: 'Member Secretary', details: 'Registrar', bio: 'Manages statutory documentation, coordination of governance bodies, and regulatory compliance.', qualification: 'Ph.D. in Public Administration', experience: '18+ years in University Administration' },
];

const academicCouncil: Member[] = [
    { name: 'Prof. (Dr.) B. L. Gupta', role: 'President & Chairman', details: 'Vice Chancellor, Obsidian Peak University', bio: 'Heads academic governance, curriculum reforms, and academic quality assurance.', qualification: 'Ph.D. in Engineering', experience: '25+ years in Academic Administration' },
    { name: 'Prof. (Dr.) Meenal Tiwari', role: 'Nominated Member', details: '', bio: 'Expert in curriculum design and outcome-based education.', qualification: 'Ph.D. in Education Technology', experience: '20+ years in Curriculum Design' },
    { name: 'Prof. (Dr.) Ramesh Pathak', role: 'Nominated Member', details: '', bio: 'Senior academician with experience in higher education policy and reforms.', qualification: 'Ph.D., D.Litt.', experience: '35+ years in Higher Education' },
    { name: 'Dr. Alok Bansal', role: 'Nominated Member', details: 'Director, Technical Institute', bio: 'Supports technical education planning and academic reforms.', qualification: 'Ph.D. in Computer Science', experience: '22+ years as Institute Director' },
    { name: 'Dr. Vinay Deshpande', role: 'Nominated Member', details: 'Principal, Engineering College', bio: 'Contributes to academic quality frameworks and best practices.', qualification: 'Ph.D. in Mechanical Engg.', experience: '25+ years as Principal' },
    { name: 'Mr. Saurabh Malviya', role: 'Nominated Member', details: 'Industry HR Leader', bio: 'Advises on employability, training, and industry-aligned curriculum.', qualification: 'M.B.A. (HR)', experience: '18+ years in HR Leadership' },
    { name: 'Prof. (Dr.) Shalini Kapoor', role: 'Nominated Member', details: '', bio: 'Senior faculty member and research mentor.', qualification: 'Ph.D. in Chemistry', experience: '20+ years as Professor' },
    { name: 'Er. Mohit Khurana', role: 'Nominated Member', details: '', bio: 'Supports project-based learning and industry collaboration.', qualification: 'M.Tech.', experience: '15+ years in Industry' },
    { name: 'Prof. (Dr.) Manoj Kulkarni', role: 'Member Secretary', details: 'Registrar', bio: 'Ensures statutory compliance and documentation of academic governance decisions.', qualification: 'Ph.D. in Public Administration', experience: '18+ years in University Administration' },
];

const MemberDetailsDialog = ({ member, isOpen, onClose }: { member: Member | null; isOpen: boolean; onClose: () => void }) => {
  if (!member) return null;

  const initials = member.name.split(' ').map(n => n[0]).join('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
              <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-2xl font-headline">{member.name}</DialogTitle>
            <DialogDescription>{member.role}</DialogDescription>
          </div>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-center text-muted-foreground">{member.bio}</p>
          
          <div className='border-t pt-4 mt-4'>
            <h4 className='font-semibold mb-3 text-center text-primary'>Profile Details</h4>
            <div className="space-y-2 text-sm">
                {member.details && (
                    <div>
                        <strong className="font-semibold block">Affiliation:</strong>
                        <span className="text-muted-foreground">{member.details}</span>
                    </div>
                )}
                {member.qualification && (
                    <div>
                        <strong className="font-semibold block">Qualification:</strong>
                        <span className="text-muted-foreground">{member.qualification}</span>
                    </div>
                )}
                {member.experience && (
                     <div>
                        <strong className="font-semibold block">Experience:</strong>
                        <span className="text-muted-foreground">{member.experience}</span>
                    </div>
                )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


const MemberCard = ({ member, onLearnMore }: { member: Member; onLearnMore: (member: Member) => void }) => {
  const initials = member.name.split(' ').map(n => n[0]).join('');
  return (
    <Card className="text-center hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <Avatar className="w-20 h-20 mx-auto border-4 border-primary/20">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col items-center flex-grow">
        <h3 className="text-lg font-bold font-headline">{member.name}</h3>
        <p className="text-sm font-semibold text-primary">{member.role}</p>
        <div className="flex-grow mt-1">
            <p className="text-xs text-muted-foreground">{member.details}</p>
        </div>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => onLearnMore(member)}>
            <User className="mr-2 h-4 w-4" />
            View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default function Page() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleLearnMore = (member: Member) => {
    setSelectedMember(member);
  };

  const handleCloseDialog = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <div className="py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Leadership & Governance</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
                The University follows a transparent, participative, and accountable governance framework in alignment with UGC and NAAC guidelines to ensure academic excellence and institutional integrity.
            </p>
        </div>
        <div className="space-y-16">
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Board of Governors</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
              {governingBody.map((member, index) => (
                <MemberCard key={index} member={member} onLearnMore={handleLearnMore} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Executive Management Council</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
              {executiveCouncil.map((member, index) => (
                <MemberCard key={index} member={member} onLearnMore={handleLearnMore} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Academic Senate</h2>
               <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                The Academic Senate is the apex academic decision-making body responsible for curriculum design, academic standards, examination reforms, and research promotion.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
              {academicCouncil.map((member, index) => (
                <MemberCard key={index} member={member} onLearnMore={handleLearnMore} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <MemberDetailsDialog member={selectedMember} isOpen={!!selectedMember} onClose={handleCloseDialog} />
    </>
  );
}

    