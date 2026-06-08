
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { University, Users, Award, Shield, GitBranch, Target, CheckCircle, TrendingUp, Group, BookOpen, Star } from 'lucide-react';

const navItems = [
    { href: '/about', label: 'About University', icon: University },
    { href: '/about/governance', label: 'Governance', icon: Users },
    { href: '/about/committees', label: 'Committees', icon: Group },
    { href: '/about/org-structure', label: 'Org Structure', icon: GitBranch },
    { href: '/about/approvals', label: 'Approvals', icon: CheckCircle },
    { href: '/about/awards', label: 'Awards', icon: Award },
    { href: '/about/iqac', label: 'IQAC', icon: Target },
    { href: '/about/naac', label: 'NAAC', icon: Star },
    { href: '/about/nirf', label: 'NIRF', icon: TrendingUp },
];

export function AboutSidebar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-20">
      <h3 className="text-xl font-bold font-headline mb-4 text-primary">About Us</h3>
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
