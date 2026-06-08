
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import * as React from 'react';
import { LogOut, KeyRound } from 'lucide-react';
import { db } from '@/lib/local-storage-db';
import { ChangePasswordDialog } from '@/components/student-panel/change-password-dialog';

type AdminProfileDropdownProps = {
    user: {
        name: string;
        email: string;
    };
};

export function AdminProfileDropdown({ user }: AdminProfileDropdownProps) {
    const [mounted, setMounted] = React.useState(false);
    const router = useRouter();
    const profileImage = PlaceHolderImages.find(p => p.id === 'testimonial-3');
    const userInitial = user.name?.charAt(0).toUpperCase() || 'A';

    React.useEffect(() => {
        setMounted(true);
    }, []);
    
    const handleLogout = () => {
        db.logout();
        router.push('/login');
    }

    if (!mounted) {
        return (
            <div className="flex items-center gap-3 p-2">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                    <div className="h-4 w-20 rounded-md bg-muted"></div>
                    <div className="h-3 w-28 rounded-md bg-muted"></div>
                </div>
            </div>
        )
    }

    return (
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
    );
}
