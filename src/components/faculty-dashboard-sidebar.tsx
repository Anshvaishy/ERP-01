
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Bell,
  Settings,
  LifeBuoy,
  LogOut,
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
import { Faculty, db } from '@/lib/local-storage-db';
import { useRouter } from 'next/navigation';
import { ChangePasswordDialog } from './student-panel/change-password-dialog';

type DashboardSidebarProps = {
  user: Faculty;
};

const navItems = [
  { href: '/faculty/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/faculty/dashboard/courses', label: 'My Courses', icon: BookOpen },
  { href: '/faculty/dashboard/grades', label: 'Grades & Attendance', icon: GraduationCap },
  { href: '/faculty/dashboard/announcements', label: 'Announcements', icon: Bell },
];

const helpAndSettingsItems = [
    { href: '#', label: 'Help', icon: LifeBuoy },
    { href: '#', label: 'Settings', icon: Settings },
];

export function FacultyDashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const profileImage = PlaceHolderImages.find(p => p.id === 'testimonial-3');

  const userInitial = user.name?.charAt(0).toUpperCase() || 'F';
  
  const handleLogout = () => {
    db.logout();
    router.push('/login');
  }

  const content = (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="size-6 text-primary" />
          <span className="text-lg font-semibold font-headline">Faculty Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href) && (item.href !== '/faculty/dashboard' || pathname === '/faculty/dashboard')}
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
        <SidebarMenu>
            {helpAndSettingsItems.map((item) => (
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-sidebar-accent">
              <Avatar className="h-10 w-10">
                {profileImage && <AvatarImage src={profileImage.imageUrl} alt={user.name} data-ai-hint={profileImage.imageHint} />}
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
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
