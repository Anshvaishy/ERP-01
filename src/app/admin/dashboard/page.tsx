
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  BookOpen,
  UserCheck,
  Star,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  TrendingDown,
  UserPlus,
} from "lucide-react";
import { EnrollmentTrendsChart } from "@/components/admin/charts/enrollment-trends-chart";
import { FeeCollectionChart } from "@/components/admin/charts/fee-collection-chart";
import { EnrollmentByDeptChart } from "@/components/admin/charts/enrollment-by-dept-chart";
import { useEffect, useState } from "react";
import { db, Grievance } from "@/lib/local-storage-db";
import { generateAdminInsights } from "@/ai/flows/generate-admin-insights";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

function AIInsights() {
    const [summary, setSummary] = useState<string | null>(null);
    const [metrics, setMetrics] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getInsights() {
            try {
                // 1. Fetch data from DB
                const pendingAdmissions = db.getAll('admissions').filter(a => a.status === 'Pending');
                const pendingGrievances = db.getAll('grievances').filter(g => g.status === 'Pending');
                
                // Calculate low attendance courses (simplified)
                const attendance = db.getAll('attendance');
                const subjects = db.getAll('subjects');
                const courseAttendance: Record<string, { present: number, total: number }> = {};
                
                attendance.forEach(rec => {
                    if (!courseAttendance[rec.subject]) {
                        courseAttendance[rec.subject] = { present: 0, total: 0 };
                    }
                    courseAttendance[rec.subject].total++;
                    if (rec.status === 'Present') {
                        courseAttendance[rec.subject].present++;
                    }
                });

                const lowAttendanceCourses: string[] = [];
                Object.entries(courseAttendance).forEach(([subjectCode, data]) => {
                    if (data.total > 10 && (data.present / data.total) < 0.75) {
                        const subject = subjects.find(s => s.code === subjectCode);
                        if (subject) {
                            lowAttendanceCourses.push(subject.name);
                        }
                    }
                });

                const insightData = {
                    pendingAdmissions: pendingAdmissions.length,
                    pendingGrievances: pendingGrievances.length,
                    lowAttendanceCourses,
                };
                setMetrics(insightData);

                // 2. Call Genkit flow
                if (insightData.pendingAdmissions === 0 && insightData.pendingGrievances === 0 && insightData.lowAttendanceCourses.length === 0) {
                   setSummary("Everything looks great! No urgent items to address. Keep up the excellent work.");
                } else {
                    const result = await generateAdminInsights(insightData);
                    setSummary(result.summary);
                }

            } catch (e) {
                console.error("Failed to fetch AI insights:", e);
                setError("Could not generate AI insights at this time. Please check the Genkit server.");
            } finally {
                setIsLoading(false);
            }
        }
        getInsights();
    }, []);

    const metricItems = [
        { label: "Pending Admissions", value: metrics?.pendingAdmissions, icon: UserPlus, href: "/admin/dashboard/students" },
        { label: "Pending Grievances", value: metrics?.pendingGrievances, icon: ShieldAlert, href: "/admin/dashboard/grievances" },
        { label: "Low Attendance Courses", value: metrics?.lowAttendanceCourses?.length, icon: TrendingDown, href: "/admin/dashboard/attendance" },
    ];

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center"><Sparkles className="mr-2 h-5 w-5 text-primary" /> AI-Powered Daily Brief</CardTitle>
                <CardDescription>A smart summary of today's priorities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    <p className="text-sm text-muted-foreground">Generating insights...</p>
                ) : error ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : (
                    <>
                        <p className="text-sm italic text-muted-foreground">"{summary}"</p>
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                            {metricItems.map(item => (
                                <Link key={item.label} href={item.href} className="text-center p-2 rounded-lg hover:bg-muted">
                                    <item.icon className="h-6 w-6 mx-auto text-primary" />
                                    <p className="text-2xl font-bold">{item.value}</p>
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
  }

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    rating: 0,
  });

  useEffect(() => {
    const students = db.getAll('students');
    const faculty = db.getAll('faculty');
    const courses = db.getAll('subjects');
    // In a real app, rating would come from feedback.
    const avgRating = 4.3;

    setStats({
      students: students.length,
      faculty: faculty.length,
      courses: courses.length,
      rating: avgRating,
    });
  }, []);

  const kpi = [
    { title: "Total Students", value: stats.students, icon: Users, change: "+5.2% from last month" },
    { title: "Total Faculty", value: stats.faculty, icon: UserCheck, change: "+2.1% from last month" },
    { title: "Total Courses", value: stats.courses, icon: BookOpen, change: "+10 from last year" },
    { title: "Avg. Student Rating", value: `${stats.rating}/5`, icon: Star, change: "+0.1 from last semester" },
  ];

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Admin Dashboard</h2>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpi.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Enrollment Trends</CardTitle>
              <CardDescription>Last 12 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <EnrollmentTrendsChart />
            </CardContent>
          </Card>
          <div className="lg:col-span-3">
            <AIInsights />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Fee Collection Status</CardTitle>
              <CardDescription>Current Semester</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <FeeCollectionChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Enrollment by Department</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <EnrollmentByDeptChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
