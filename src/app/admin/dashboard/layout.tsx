
'use client';
import { AdminDashboardSidebar } from '@/components/admin-dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/local-storage-db';
import { FirebaseClientProvider } from '@/firebase';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const session = db.get('session');
    if (!session || !session.isLoggedIn || session.userType !== 'admin') {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const user = { name: "Admin", email: "admin@obsidianpeak.ac.in" };

  if (isAuthenticated === null) {
    // You can render a loading spinner here
    return <div>Loading...</div>;
  }

  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AdminDashboardSidebar user={user} />
          <main className="flex-1 flex-col bg-secondary/50">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
