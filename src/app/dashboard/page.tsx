
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  CreditCard,
  BookOpen,
  Users,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getPersonalizedDashboardTips } from "@/ai/flows/personalized-dashboard-tips";
import { useEffect, useState } from "react";

function AiTips({ studentName }: { studentName: string }) {
  const [tips, setTips] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTips() {
      try {
        const tipsInput = {
          studentName,
          academicPerformance: "Good overall grades, but attendance is slightly low at 82%. Shows strong aptitude in practical subjects.",
          interests: "Artificial Intelligence, Web Development, and Graphic Design.",
        };
        const aiTips = await getPersonalizedDashboardTips(tipsInput);
        setTips(aiTips.tips);
      } catch (e) {
        console.error("Failed to fetch AI tips:", e);
        setError("We couldn't generate personalized tips at this moment due to a network issue. Please check back later.");
      }
    }
    fetchTips();
  }, [studentName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 text-yellow-400" />
          Personalized Tips
        </CardTitle>
        <CardDescription>
          Here are some AI-powered suggestions to help you excel.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tips Unavailable</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : tips ? (
          <ul className="space-y-3 list-disc pl-5">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground">{tip}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Loading tips...</p>
        )}
      </CardContent>
    </Card>
  );
}


const announcements = [
    { title: "Mid-Term Examinations Schedule", date: "2 days ago", category: "Academics" },
    { title: "Annual Tech Fest 'Innovate 2024'", date: "4 days ago", category: "Events" },
    { title: "Library Closure for Maintenance", date: "1 week ago", category: "Campus" },
    { title: "Guest Lecture on Quantum Computing", date: "1 week ago", category: "Academics" },
];

export default function DashboardPage() {
  const studentName = "Demo Student";

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Welcome back, {studentName}!
      </h2>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Attendance
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">
                Slightly below the 85% requirement
              </p>
              <Progress value={82} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current GPA
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.6/4.0</div>
              <p className="text-xs text-muted-foreground">
                Good standing
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,500</div>
              <p className="text-xs text-muted-foreground">
                Due by 30th July
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Courses Enrolled
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                This semester
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>
                Important notices and updates from the university.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((item) => (
                    <TableRow key={item.title}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                       <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="lg:col-span-3">
             <AiTips studentName={studentName} />
          </div>
        </div>
      </div>
    </>
  );
}
