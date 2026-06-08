
'use client';
import { FacultyDashboardSidebar } from '@/components/faculty-dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, Faculty } from '@/lib/local-storage-db';

export default function FacultyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [faculty, setFaculty] = useState<Faculty | null>(null);

  useEffect(() => {
    const session = db.get('session');
     if (session?.isLoggedIn && session.userType === 'faculty') {
        const facultyData = db.getAll('faculty').find(f => f.email === session.user);
        if (facultyData) {
          setFaculty(facultyData);
        } else {
           db.logout();
           router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
  }, [router]);

  if (!faculty) {
    return <div className="flex h-screen w-full items-center justify-center">Loading Faculty Panel...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <FacultyDashboardSidebar user={faculty} />
        <main className="flex-1 flex-col bg-secondary/50">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
