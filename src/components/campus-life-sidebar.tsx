
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Building, Users, Calendar, GraduationCap, Leaf, Library, Heart, Sun } from 'lucide-react';

const navItems = [
    { href: '/campus-life/facilities', label: 'Facilities', icon: Building },
    { href: '/campus-life/clubs', label: 'Clubs', icon: Users },
    { href: '/campus-life/events', label: 'Events', icon: Calendar },
    { href: '/campus-life/convocation', label: 'Convocation', icon: GraduationCap },
    { href: '/campus-life/senate', label: 'Student Senate', icon: Users },
    { href: '/campus-life/green', label: 'Green Initiatives', icon: Leaf },
    { href: '/campus-life/library', label: 'Library', icon: Library },
    { href: '/campus-life/outreach', label: 'Outreach', icon: Heart },
    { href: '/campus-life/women-empowerment', label: 'Women Empowerment', icon: Sun },
];

export function CampusLifeSidebar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-20">
      <h3 className="text-xl font-bold font-headline mb-4 text-primary">Campus Life</h3>
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
