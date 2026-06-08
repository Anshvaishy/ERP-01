
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  GraduationCap,
  Bell,
  LifeBuoy,
  Settings,
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

type DashboardSidebarProps = {
  user: {
    name: string;
    email: string;
  };
};

const navGroups = [
    {
        label: "Academics & Learning",
        items: [
            { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/dashboard/attendance', label: 'Attendance', icon: CalendarCheck },
        ]
    },
    {
        label: "Examination",
        items: [
            { href: '/dashboard/results', label: 'Results', icon: GraduationCap },
        ]
    },
    {
        label: "Engagement",
        items: [
             { href: '/dashboard/announcements', label: 'Announcements', icon: Bell },
        ]
    },
    {
        label: "Support",
        items: [
            { href: '/dashboard/help', label: 'Help & Support', icon: LifeBuoy },
            { href: '/dashboard/settings', label: 'Settings', icon: Settings },
        ]
    }
];


export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const profileImage = PlaceHolderImages.find(p => p.id === 'dashboard-profile');

  const userInitial = user.name?.charAt(0).toUpperCase() || 'U';

  const content = (
    <>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Logo className="size-6 text-primary" />
                <span className="text-lg font-semibold font-headline">Obsidian Peak</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
            {navGroups.map((group) => (
                 <SidebarGroup key={group.label}>
                    <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
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
                </SidebarGroup>
            ))}
        </SidebarContent>
        <SidebarFooter>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-sidebar-accent">
                        <Avatar className="h-10 w-10">
                            {profileImage && <AvatarImage src={profileImage.imageUrl} alt={user.name} data-ai-hint={profileImage.imageHint}/>}
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
                    <DropdownMenuItem asChild>
                        <Link href="/">Exit Dashboard</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
    </>
  );

  return <Sidebar>{content}</Sidebar>;
}
