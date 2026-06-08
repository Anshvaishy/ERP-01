
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

const OrgBox = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "bg-card border p-3 rounded-lg shadow-sm text-center text-xs md:text-sm font-semibold w-full max-w-[200px] mx-auto",
    className
  )}>
    {children}
  </div>
);

const Connector = () => (
    <div className="h-6 w-px bg-border my-1 mx-auto"></div>
);

export default function Page() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Organization Structure & Plan</h1>
        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
          Obsidian Peak University's organizational structure is designed to promote synergy, efficiency, and excellence across academic, administrative, and support functions.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Strategic Plan Section */}
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <h2 className="flex items-center gap-2 font-headline text-xl font-bold text-primary mb-4">
                <Target className="w-6 h-6 text-primary"/>
                Strategic Plan and Deployment
            </h2>
            <p className="text-muted-foreground">
              Obsidian Peak University's strategic plan is a roadmap that outlines the university's vision and goals for the future, designed to guide the university's growth and evolution. It encompasses key focus areas such as curriculum enhancement, faculty development, research initiatives, infrastructure expansion, and student engagement. 
            </p>
            <br/>
            <p className="text-muted-foreground">
              The deployment of this strategic plan involves a systematic and phased approach, ensuring that each aspect is implemented with precision and effectiveness. Through collaborative efforts across departments, faculty, and administrative units, Obsidian Peak University aims to create an environment that nurtures creativity, critical thinking, and global perspectives. The strategic plan and its deployment form the foundation for Obsidian Peak University's continuous pursuit of excellence in education and research.
            </p>
          </CardContent>
        </Card>
        
        {/* Organizational Structure Section */}
        <div className="lg:col-span-3">
           <h2 className="text-2xl font-bold font-headline text-primary mb-6 text-center">Organizational Structure</h2>
           <div className="flex flex-col items-center w-full space-y-2">
            
            {/* Top Level */}
            <OrgBox className="bg-primary text-primary-foreground">Chancellor</OrgBox>
            <Connector />
            <OrgBox className="bg-primary/90 text-primary-foreground">Pro-Chancellor</OrgBox>
            <Connector />

            {/* Vice Chancellor Level */}
            <div className="w-full grid grid-cols-3 items-start relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-border"></div>
                 <div className="col-start-2 flex flex-col items-center relative bg-background px-2">
                    <OrgBox className="bg-primary/80 text-primary-foreground">Vice Chancellor</OrgBox>
                 </div>
                 <div className="absolute top-[50%] left-0 w-full flex justify-center">
                    <div className="absolute top-0 right-0 mr-12 text-center bg-background px-2">
                        <Connector />
                        <OrgBox>Finance Officer</OrgBox>
                    </div>
                </div>
            </div>
            <Connector />
            
            {/* Registrar Level */}
            <OrgBox>Registrar</OrgBox>
            <Connector />

            {/* Directors under Registrar */}
            <div className="w-full relative">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center space-y-2">
                        <OrgBox className="bg-secondary">Controller of Examination</OrgBox>
                        <OrgBox>Dy. Registrar (Academics)</OrgBox>
                        <OrgBox>University Club Coordinator</OrgBox>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <OrgBox className="bg-secondary">Director IQAC</OrgBox>
                        <OrgBox>Dy. Registrar (HR)</OrgBox>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <OrgBox className="bg-secondary">Director Admission & PR</OrgBox>
                         <OrgBox>Dy. Registrar (Administration)</OrgBox>
                         <OrgBox>Sports Officer</OrgBox>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <OrgBox className="bg-secondary">Director Training & Placement</OrgBox>
                        <OrgBox>Dy. Registrar (Store)</OrgBox>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <OrgBox className="bg-secondary">Director Centre for Energy</OrgBox>
                        <OrgBox>Dy. Registrar Administrator</OrgBox>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <OrgBox className="bg-secondary">Director Students Welfare</OrgBox>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <OrgBox>Chief Proctor</OrgBox>
                            <OrgBox>Chief Hostel Warden</OrgBox>
                        </div>
                    </div>
                </div>
            </div>
            <Connector />
            
            {/* Institute Directors */}
             <div className="w-full p-4 border rounded-lg">
                <h3 className="text-center font-semibold mb-4 text-primary">Institute Directors</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center text-xs">
                    <OrgBox>Institute of Technology</OrgBox>
                    <OrgBox>Institute of Media Studies</OrgBox>
                    <OrgBox>Institute of Mgmt.</OrgBox>
                    <OrgBox>SRMU Polytechnic</OrgBox>
                    <OrgBox>Institute of Architecture</OrgBox>
                    <OrgBox>Institute of Agricultural Sci.</OrgBox>
                    <OrgBox>Institute of Natural Sci.</OrgBox>
                    <OrgBox>Institute of Legal Studies</OrgBox>
                    <OrgBox>Institute of Bio-Sciences</OrgBox>
                    <OrgBox>Institute of Education</OrgBox>
                    <OrgBox>Research and Consultancy</OrgBox>
                    <OrgBox>Institute of Pharmacy</OrgBox>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
