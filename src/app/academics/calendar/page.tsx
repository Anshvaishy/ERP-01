import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const calendarEvents = [
    { date: "August 1, 2025", event: "Semester Start", type: "Academic" },
    { date: "September 5, 2025", event: "Teacher's Day Celebration", type: "Event" },
    { date: "September 15-20, 2025", event: "Mid-Semester Examinations", type: "Exam" },
    { date: "October 2, 2025", event: "Gandhi Jayanti", type: "Holiday" },
    { date: "October 20-25, 2025", event: "Tech Fest 'Innovate 2025'", type: "Event" },
    { date: "November 14, 2025", event: "Children's Day", type: "Holiday" },
    { date: "December 15-22, 2025", event: "End-Semester Examinations", type: "Exam" },
    { date: "December 25, 2025", event: "Christmas", type: "Holiday" },
    { date: "January 1, 2026", event: "New Year's Day", type: "Holiday" },
    { date: "January 10, 2026", event: "Semester End", type: "Academic" },
];

const getBadgeVariant = (type: string) => {
    switch (type) {
        case "Academic": return "default";
        case "Event": return "secondary";
        case "Exam": return "destructive";
        case "Holiday": return "outline";
        default: return "default";
    }
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Academic Calendar</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the key dates and events for the academic year 2025-2026.
            </p>
          </div>
          <Card>
            <CardHeader>
                <CardTitle>Fall Semester 2025</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead className="text-right">Category</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {calendarEvents.map((item) => (
                            <TableRow key={item.event}>
                                <TableCell className="font-medium">{item.date}</TableCell>
                                <TableCell>{item.event}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={getBadgeVariant(item.type)}>{item.type}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
