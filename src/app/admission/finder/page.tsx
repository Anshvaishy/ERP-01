"use client";
import { useState } from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const allPrograms = [
    { name: 'Polytechnic', level: 'Diploma', interest: 'Engineering', institute: 'SRMU Polytechnic' },
    { name: 'B.Tech in Biotechnology', level: 'Undergraduate', interest: 'Engineering', institute: 'Institute of Biosciences and Technology' },
    { name: 'B.Tech in Computer Science', level: 'Undergraduate', interest: 'Engineering', institute: 'Institute of Technology' },
    { name: 'B.Tech in Mechanical Engineering', level: 'Undergraduate', interest: 'Engineering', institute: 'Institute of Technology' },
    { name: 'Bachelor of Computer Application (BCA)', level: 'Undergraduate', interest: 'Engineering', institute: 'Institute of Technology' },
    { name: 'B.Sc in Allied Health Sciences', level: 'Undergraduate', interest: 'Health Sciences', institute: 'Institute of Biosciences and Technology' },
    { name: 'B.Sc in Agriculture', level: 'Undergraduate', interest: 'Agriculture', institute: 'Institute of Agricultural Sciences and Technology' },
    { name: 'Bachelor of Pharmacy (B.Pharm)', level: 'Undergraduate', interest: 'Health Sciences', institute: 'Institute of Pharmacy' },
    { name: 'Bachelor of Business Administration (BBA)', level: 'Undergraduate', interest: 'Business', institute: 'Institute of Management, Commerce and Economics' },
    { name: 'Bachelor of Laws (LLB)', level: 'Undergraduate', interest: 'Law', institute: 'Institute of Legal Studies' },
    { name: 'B.A. in Media Studies', level: 'Undergraduate', interest: 'Humanities', institute: 'Institute of Media Studies' },
    { name: 'B.Com in Commerce & Economics', level: 'Undergraduate', interest: 'Business', institute: 'Institute of Management, Commerce and Economics' },
    { name: 'B.Sc in Food Technology', level: 'Undergraduate', interest: 'Science', institute: 'Institute of Biosciences and Technology' },
    { name: 'B.Sc in Nutrition & Dietetics', level: 'Undergraduate', interest: 'Health Sciences', institute: 'Institute of Biosciences and Technology' },
    { name: 'B.A. in Arts & Science', level: 'Undergraduate', interest: 'Humanities', institute: 'Institute of Natural Sciences and Humanities' },
    { name: 'M.Sc in Agriculture', level: 'Postgraduate', interest: 'Agriculture', institute: 'Institute of Agricultural Sciences and Technology' },
    { name: 'M.Sc in Biotechnology', level: 'Postgraduate', interest: 'Science', institute: 'Institute of Biosciences and Technology' },
    { name: 'M.Tech in Computer Science', level: 'Postgraduate', interest: 'Engineering', institute: 'Institute of Technology' },
    { name: 'Master of Computer Application (MCA)', level: 'Postgraduate', interest: 'Engineering', institute: 'Institute of Technology' },
    { name: 'M.Tech in Mechanical Engineering', level: 'Postgraduate', interest: 'Engineering', institute: 'Institute of Technology' },
    { name: 'Master of Business Administration (MBA)', level: 'Postgraduate', interest: 'Business', institute: 'Institute of Management, Commerce and Economics' },
    { name: 'Master of Laws (LLM)', level: 'Postgraduate', interest: 'Law', institute: 'Institute of Legal Studies' },
    { name: 'M.Com in Commerce & Economics', level: 'Postgraduate', interest: 'Business', institute: 'Institute of Management, Commerce and Economics' },
    { name: 'M.A. in Education', level: 'Postgraduate', interest: 'Education', institute: 'Institute of Education and Research' },
    { name: 'M.A. in Media Studies', level: 'Postgraduate', interest: 'Humanities', institute: 'Institute of Media Studies' },
    { name: 'M.A. in Arts & Science', level: 'Postgraduate', interest: 'Humanities', institute: 'Institute of Natural Sciences and Humanities' },
    { name: 'Master of Social Work (MSW)', level: 'Postgraduate', interest: 'Humanities', institute: 'Institute of Natural Sciences and Humanities' },
    { name: 'Ph.D.', level: 'Doctoral', interest: 'Research', institute: 'All Institutes' },
];

const levels = [...new Set(allPrograms.map(p => p.level))];
const interests = [...new Set(allPrograms.map(p => p.interest))];
const institutes = [...new Set(allPrograms.map(p => p.institute))];

export default function Page() {
  const [level, setLevel] = useState('');
  const [interest, setInterest] = useState('');
  const [institute, setInstitute] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState(allPrograms);

  const handleSearch = () => {
    let programs = allPrograms;
    if (level) {
      programs = programs.filter(p => p.level === level);
    }
    if (interest) {
      programs = programs.filter(p => p.interest === interest);
    }
    if (institute) {
      programs = programs.filter(p => p.institute === institute);
    }
    setFilteredPrograms(programs);
  };

  const resetFilters = () => {
    setLevel('');
    setInterest('');
    setInstitute('');
    setFilteredPrograms(allPrograms);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Program Finder</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Find the perfect program for you at Obsidian Peak University based on your interests and academic level.
            </p>
          </div>
          <Card className="max-w-5xl mx-auto mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
                 <Select value={interest} onValueChange={setInterest}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Area of Interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {interests.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
                 <Select value={institute} onValueChange={setInstitute}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Institute" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutes.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch} className="w-full">Search Programs</Button>
                <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.length > 0 ? filteredPrograms.map(program => (
              <Card key={program.name}>
                <CardHeader>
                  <CardTitle>{program.name}</CardTitle>
                  <CardDescription>{program.level} - {program.interest}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="px-0">Learn More</Button>
                </CardContent>
              </Card>
            )) : (
              <p className="text-center text-muted-foreground md:col-span-3">No programs match your criteria.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
