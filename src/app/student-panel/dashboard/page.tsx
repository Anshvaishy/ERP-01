
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
  Bell,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getPersonalizedDashboardTips } from "@/ai/flows/personalized-dashboard-tips";
import { useEffect, useState } from "react";
import { db, Notice } from "@/lib/local-storage-db";

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

export default function StudentDashboardPage() {
  const [studentName, setStudentName] = useState("Student");
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
        const student = db.getAll('students').find(s => s.email === session.user);
        if (student) {
            setStudentName(student.name);
        }
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
              <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5"/> Announcements</CardTitle>
              <CardDescription>
                Important notices and updates from the university.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notices.length > 0 ? (
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notices.slice(0, 4).map((item) => (
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
                  No recent announcements.
                </div>
              )}
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
