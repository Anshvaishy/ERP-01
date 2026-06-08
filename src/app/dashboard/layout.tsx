
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = { name: "Demo Student", email: "student@obsidianpeak.ac.in" };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar user={user} />
        <main className="flex-1 flex-col bg-secondary/50">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
