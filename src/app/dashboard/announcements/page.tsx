import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const announcements = [
    { title: "Mid-Term Examinations Schedule", date: "2024-07-15", category: "Academics", content: "The mid-term examinations for the current semester will be held from August 5th to August 15th. The detailed schedule has been sent to your student email." },
    { title: "Annual Tech Fest 'Innovate 2024'", date: "2024-07-12", category: "Events", content: "Get ready for Innovate 2024, our annual tech fest, happening on September 1st and 2nd. Registrations for workshops and competitions are now open." },
    { title: "Library Closure for Maintenance", date: "2024-07-10", category: "Campus", content: "The central library will be closed for annual maintenance from July 20th to July 25th. Please return all borrowed books by July 19th." },
    { title: "Guest Lecture on Quantum Computing", date: "2024-07-08", category: "Academics", content: "We are pleased to announce a guest lecture by Dr. Aruna Sharma on 'The Future of Quantum Computing' on July 28th at the main auditorium." },
    { title: "Scholarship Application Deadline Extended", date: "2024-07-05", category: "Academics", content: "The deadline for submitting applications for the merit-based scholarship has been extended to August 10th. Apply through the student portal." },
];

export default function AnnouncementsPage() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Announcements</h2>
      <div className="space-y-6">
        {announcements.map((item) => (
            <Card key={item.title}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{item.title}</CardTitle>
                             <CardDescription className="mt-1">
                                {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </CardDescription>
                        </div>
                        <Badge variant="outline">{item.category}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{item.content}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </>
  );
}
