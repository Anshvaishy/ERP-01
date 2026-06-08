
'use client';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { db, Notice } from '@/lib/local-storage-db';
import { Badge } from '@/components/ui/badge';

export default function NoticesPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [notices, setNotices] = useState<Notice[]>([]);

  const loadNotices = () => {
    // Auto-delete notices older than 24 hours
    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
    const allNotices: Notice[] = db.getAll('notices');
    const recentNotices = allNotices.filter(notice => new Date(notice.timestamp).getTime() > twentyFourHoursAgo);
    
    if(allNotices.length !== recentNotices.length) {
        localStorage.setItem('notices', JSON.stringify(recentNotices));
    }
    
    setNotices(recentNotices.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  };

  useEffect(() => {
    loadNotices();
    const handleDbChange = (event: any) => {
        if(event.detail.table === 'notices') {
            loadNotices();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    
    // Check for old notices periodically
    const interval = setInterval(loadNotices, 60 * 1000); // every minute
    
    return () => {
      window.removeEventListener('db-change', handleDbChange);
      clearInterval(interval);
    };
  }, []);

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const title = formData.get('title') as string;
    const message = formData.get('message') as string;
    
    if (!title || !message) {
        toast({ title: "Error", description: "Title and message are required.", variant: 'destructive' });
        return;
    }

    const newNotice: Notice = {
        text: message,
        title,
        timestamp: new Date().toISOString(),
    };
    
    db.add('notices', newNotice);

    toast({ title: "Success", description: 'Notice posted successfully.' });
    formRef.current?.reset();
  };

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Notices</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
            <form ref={formRef} onSubmit={handlePostNotice}>
                <CardHeader>
                <CardTitle>Broadcast System</CardTitle>
                <CardDescription>Post an update that auto-deletes after 24 hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" placeholder="e.g., Campus Maintenance Alert" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" placeholder="Enter your announcement message here..." rows={6} required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post Notice
                    </Button>
                </CardFooter>
            </form>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Posted Notices</CardTitle>
                <CardDescription>Announcements from the last 24 hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {notices.length === 0 ? (
                    <p className="text-center text-muted-foreground pt-8">No recent notices.</p>
                ) : (
                   <div className="space-y-4 h-96 overflow-y-auto pr-4">
                    {notices.map((notice, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold">{notice.title}</h4>
                                    <p className="text-xs text-muted-foreground">{new Date(notice.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{notice.text}</p>
                        </div>
                    ))}
                   </div>
                )}
            </CardContent>
        </Card>
      </div>
    </>
  );
}
