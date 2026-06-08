
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

export default function FacultyAnnouncementsPage() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Post Announcement</h2>
       <Card>
        <CardHeader>
          <CardTitle>New Announcement</CardTitle>
          <CardDescription>Post an update for your students.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="e.g., Mid-term exam schedule" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                     <Select>
                        <SelectTrigger id="course">
                            <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value="all">All Courses</SelectItem>
                             <SelectItem value="CS101">CS101</SelectItem>
                             <SelectItem value="CS305">CS305</SelectItem>
                             <SelectItem value="MA203">MA203</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your announcement message here..." rows={6} />
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Post Announcement
            </Button>
        </CardContent>
      </Card>
    </>
  );
}
