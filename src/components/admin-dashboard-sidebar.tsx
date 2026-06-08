
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Book,
  User,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Computer,
  CreditCard,
  Building,
  Library,
  Newspaper,
  Shield,
  Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from './logo';
import { AdminProfileDropdown } from './admin-profile-dropdown';

type DashboardSidebarProps = {
  user: {
    name: string;
    email: string;
  };
};

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/dashboard/students', label: 'Students & Admissions', icon: Users },
    { href: '/admin/dashboard/faculty', label: 'Faculty', icon: User },
    { href: '/admin/dashboard/subjects', label: 'Subjects', icon: Book },
    { href: '/admin/dashboard/attendance', label: 'Attendance', icon: CalendarCheck },
    { href: '/admin/dashboard/results', label: 'Exam Results', icon: GraduationCap },
    { href: '/admin/dashboard/lms', label: 'LMS', icon: Computer },
    { href: '/admin/dashboard/fees', label: 'Finance (Fees)', icon: CreditCard },
    { href: '/admin/dashboard/payroll', label: 'Payroll', icon: CreditCard },
    { href: '/admin/dashboard/hostels', label: 'Hostel', icon: Building },
    { href: '/admin/dashboard/library', label: 'Library', icon: Library },
    { href: '/admin/dashboard/grievances', label: 'Grievances', icon: Shield },
    { href: '/admin/dashboard/notices', label: 'Notices', icon: Newspaper },
    { href: '/admin/dashboard/users', label: 'Data/Users', icon: Shield },
    { href: '/admin/dashboard/settings', label: 'Settings', icon: Settings },
];


export function AdminDashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  
  const content = (
    <>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Logo className="size-6 text-primary" />
                <span className="text-lg font-semibold font-headline">Admin Panel</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                {navItems.map((item) => {
                    let isActive = false;
                    if (item.href === '/admin/dashboard/students') {
                        isActive = pathname.startsWith('/admin/dashboard/students') || pathname.startsWith('/admin/dashboard/admissions');
                    } else if (item.href === '/admin/dashboard') {
                        isActive = pathname === '/admin/dashboard';
                    } else {
                        isActive = pathname.startsWith(item.href);
                    }

                    return (
                        <SidebarMenuItem key={item.label}>
                            <Link href={item.href} passHref>
                                <SidebarMenuButton
                                    isActive={isActive}
                                    icon={item.icon}
                                    tooltip={item.label}
                                >
                                    {item.label}
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <AdminProfileDropdown user={user} />
        </SidebarFooter>
    </>
  );

  return <Sidebar>{content}</Sidebar>;
}
