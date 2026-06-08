
import dynamic from 'next/dynamic';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/landing/hero';

const AboutSection = dynamic(() => import('@/components/landing/about').then(mod => mod.AboutSection));
const NewsUpdatesSection = dynamic(() => import('@/components/landing/news-updates').then(mod => mod.NewsUpdatesSection));
const ProgramsSection = dynamic(() => import('@/components/landing/programs').then(mod => mod.ProgramsSection));
const AdmissionsSection = dynamic(() => import('@/components/landing/admissions').then(mod => mod.AdmissionsSection));
const ResearchSection = dynamic(() => import('@/components/landing/research').then(mod => mod.ResearchSection));
const LatestNewsSection = dynamic(() => import('@/components/landing/latest-news').then(mod => mod.LatestNewsSection));
const FacilitiesSection = dynamic(() => import('@/components/landing/facilities').then(mod => mod.FacilitiesSection));
const PlacementsSection = dynamic(() => import('@/components/landing/placements').then(mod => mod.PlacementsSection));
const ChairmanMessageSection = dynamic(() => import('@/components/landing/chairman-message').then(mod => mod.ChairmanMessageSection));
const AlumniSection = dynamic(() => import('@/components/landing/alumni').then(mod => mod.AlumniSection));
const StudentTestimonialsSection = dynamic(() => import('@/components/landing/student-testimonials').then(mod => mod.StudentTestimonialsSection));


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <NewsUpdatesSection />
        <ProgramsSection />
        <AdmissionsSection />
        <ResearchSection />
        <LatestNewsSection />
        <FacilitiesSection />
        <PlacementsSection />
        <ChairmanMessageSection />
        <AlumniSection />
        <StudentTestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
