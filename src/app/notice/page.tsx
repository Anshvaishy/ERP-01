
'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db, Notice } from '@/lib/local-storage-db';
import { Bell } from 'lucide-react';

export default function NoticePage() {
    const [notices, setNotices] = useState<Notice[]>([]);

    useEffect(() => {
        const allNotices = db.getAll('notices');
        // Auto-delete notices older than 24 hours for display
        const now = Date.now();
        const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
        const recentNotices = allNotices.filter(notice => new Date(notice.timestamp).getTime() > twentyFourHoursAgo);
        setNotices(recentNotices.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-secondary/50">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Notice Board</h1>
                        <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
                            Latest announcements and updates from Obsidian Peak University. Notices are valid for 24 hours from the time of posting.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {notices.length > 0 ? (
                            notices.map((item) => (
                                <Card key={item.timestamp}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle>{item.title}</CardTitle>
                                                <CardDescription className="mt-1">
                                                    Posted on: {new Date(item.timestamp).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.text}</p>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <CardContent className="pt-6 text-center text-muted-foreground flex flex-col items-center gap-4">
                                    <Bell className="w-12 h-12 text-muted-foreground/50" />
                                    <p>There are no active notices at the moment. Please check back later.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
