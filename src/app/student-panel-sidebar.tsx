
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogOut,
  User,
  Cog,
  ChevronDown,
  BadgeHelp,
  GraduationCap,
  BookOpen,
  DollarSign,
  UserCheck,
  CalendarCheck,
  Library,
  Home,
  FileText,
  Shield,
  LayoutDashboard,
  KeyRound
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from './logo';
import { Student, db } from '@/lib/local-storage-db';
import { useRouter } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChangePasswordDialog } from './student-panel/change-password-dialog';
import { MyDictionaryDialog } from './student-panel/my-dictionary-dialog';

type DashboardSidebarProps = {
  user: Student;
};

const navItems = [
    { 
        label: "Dashboard", 
        icon: LayoutDashboard, 
        href: "/student-panel/dashboard",
    },
    { 
        label: "Your Academic Dashboard", 
        icon: BadgeHelp, 
        href: "/student-panel/self-service",
    },
    { 
        label: "Academics", 
        icon: GraduationCap, 
        href: "/student-panel/academics",
    },
    {
        label: "Performance Report",
        icon: FileText,
        href: "/student-panel/performance-report"
    },
    {
        label: "Statement of Grade",
        icon: FileText,
        href: "/student-panel/statement-of-grade"
    },
    {
        label: "Attendance",
        icon: CalendarCheck,
        href: "/student-panel/attendance",
    },
    {
        label: "Examinations",
        icon: FileText,
        href: "/student-panel/examinations",
    },
    {
        label: "Financials",
        icon: DollarSign,
        href: "/student-panel/financials",
    },
    {
        label: "Library",
        icon: Library,
        href: "/student-panel/library",
    },
     {
        label: "Personal Info",
        icon: User,
        href: "/student-panel/id-card",
    },
    {
        label: "Admissions",
        icon: UserCheck,
        href: "/student-panel/admissions",
    },
    {
        label: "Hostel",
        icon: Home,
        href: "/student-panel/hostel",
    },
    {
        label: "LMS",
        icon: BookOpen,
        href: "/student-panel/lms",
    },
    {
        label: "Grievance",
        icon: Shield,
        href: "/student-panel/grievance"
    },
];

export function StudentPanelSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const profileImage = PlaceHolderImages.find(p => p.id === 'dashboard-profile');

  const userInitial = user.name?.charAt(0).toUpperCase() || 'U';
  
  const handleLogout = () => {
    db.logout();
    router.push('/login');
  }

  const content = (
    <>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Logo className="size-6 text-primary" />
                <span className="text-lg font-semibold font-headline">Student Panel</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                {navItems.map((item) => (
                     <SidebarMenuItem key={item.label}>
                        <Link href={item.href} passHref>
                            <SidebarMenuButton
                                isActive={pathname === item.href}
                                icon={item.icon}
                                tooltip={item.label}
                            >
                                {item.label}
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <MyDictionaryDialog trigger={
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden">My Dictionary</span>
                </Button>
            } />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-sidebar-accent">
                        <Avatar className="h-10 w-10">
                            {profileImage && <AvatarImage src={user.photo || profileImage.imageUrl} alt={user.name} data-ai-hint={profileImage.imageHint}/>}
                            <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                            <span className="text-sm font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Cog className="mr-2 h-4 w-4" />
                        Profile Settings
                    </DropdownMenuItem>
                    <ChangePasswordDialog trigger={
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <KeyRound className="mr-2 h-4 w-4" />
                            <span>Change Password</span>
                        </DropdownMenuItem>
                    } />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
    </>
  );

  return <Sidebar>{content}</Sidebar>;
}
