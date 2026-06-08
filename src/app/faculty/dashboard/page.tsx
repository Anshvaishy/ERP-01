
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Users, Bell } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db, Notice, Faculty } from '@/lib/local-storage-db';
import { useEffect, useState } from 'react';

export default function FacultyDashboardPage() {
    const [faculty, setFaculty] = useState<Faculty | null>(null);
    const [notices, setNotices] = useState<Notice[]>([]);

    useEffect(() => {
      const session = db.get('session');
      if (session?.user) {
        setFaculty(db.getAll('faculty').find(f => f.email === session.user) || null);
      }
      
      const allNotices = db.getAll('notices');
      const sortedNotices = allNotices.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setNotices(sortedNotices);

      const handleDbChange = (event: any) => {
        if (event.detail.table === 'notices') {
          const updatedNotices = db.getAll('notices');
          const sorted = updatedNotices.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setNotices(sorted);
        }
      };
      window.addEventListener('db-change', handleDbChange);
      return () => window.removeEventListener('db-change', handleDbChange);
    }, []);

    const stats = [
        { title: "Courses Taught", value: "4", icon: BookOpen },
        { title: "Total Students", value: "128", icon: Users },
        { title: "University Notices", value: notices.length, icon: Bell },
    ];

    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Welcome, {faculty?.name || 'Faculty Member'}!</h2>
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map(stat => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>University Notices</CardTitle>
                        <CardDescription>Recent announcements from the administration.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {notices.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Announcement</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {notices.slice(0, 4).map(item => (
                                    <TableRow key={item.timestamp}>
                                        <TableCell>
                                          <p className="font-medium">{item.title}</p>
                                          <p className="text-xs text-muted-foreground line-clamp-1">{item.text}</p>
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground text-xs">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                       ) : (
                         <div className="py-8 text-center text-muted-foreground">
                           No recent university notices.
                         </div>
                       )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
