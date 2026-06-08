
'use client';
import { StudentPanelSidebar } from '@/components/student-panel-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, Student } from '@/lib/local-storage-db';

export default function StudentPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const session = db.get('session');
    if (session?.isLoggedIn && session.userType === 'student') {
        const currentStudent = db.getAll('students').find(s => s.email === session.user);
        if (currentStudent) {
            setStudent(currentStudent);
        } else {
            // This can happen if student is deleted but session persists
            db.logout();
            router.replace('/login');
        }
    } else {
        router.replace('/login');
    }
  }, [router]);


  if (!student) {
    return <div className="flex h-screen w-full items-center justify-center">Loading Student Panel...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <StudentPanelSidebar user={student} />
        <main className="flex-1 flex-col bg-background">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
