
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ArrowRight } from "lucide-react";
import { db, AttendanceRecord, Student } from "@/lib/local-storage-db";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AttendancePage() {
  const [summary, setSummary] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [overall, setOverall] = useState({ percentage: 0, late: 0, absent: 0 });
  const [lowAttendance, setLowAttendance] = useState<Student[]>([]);

  useEffect(() => {
    // This is a simplified simulation. A real app would have more complex logic.
    const attendance = db.getAll('attendance');
    const students = db.getAll('students');
    const subjects = db.getAll('subjects');

    if (attendance.length > 0) {
      const present = attendance.filter(a => a.status === 'Present').length;
      setOverall({ percentage: Math.round((present / attendance.length) * 100), late: 12, absent: attendance.length - present });
    }

    const subjectAttendance: { [key: string]: { present: number, total: number } } = {};
    attendance.forEach(rec => {
      if (!subjectAttendance[rec.subject]) {
        subjectAttendance[rec.subject] = { present: 0, total: 0 };
      }
      subjectAttendance[rec.subject].total++;
      if (rec.status === 'Present') {
        subjectAttendance[rec.subject].present++;
      }
    });

    const summaryData = Object.entries(subjectAttendance).map(([subjectCode, data]) => {
      const subject = subjects.find(s => s.code === subjectCode);
      return {
        course: subject?.name || subjectCode,
        percentage: Math.round((data.present / data.total) * 100),
        present: data.present,
        total: data.total,
      };
    });
    setSummary(summaryData);

    const studentAttendance: { [key: string]: { present: number, total: number } } = {};
    attendance.forEach(rec => {
        if(!studentAttendance[rec.roll]) {
            studentAttendance[rec.roll] = { present: 0, total: 0 };
        }
        studentAttendance[rec.roll].total++;
        if (rec.status === 'Present') {
            studentAttendance[rec.roll].present++;
        }
    });
    
    const lowAttStudents = students.filter(student => {
        const stats = studentAttendance[student.roll];
        if(!stats || stats.total === 0) return false;
        return (stats.present / stats.total) < 0.75;
    });
    setLowAttendance(lowAttStudents);

    // Mock recent activity
    setRecentActivity([
      { id: 1, studentName: 'Demo Student', course: 'CS101', status: 'Checked In', time: '09:01 AM' },
      { id: 2, studentName: 'Jane Doe', course: 'BS101', status: 'Checked In', time: '09:03 AM' },
      { id: 3, studentName: 'John Smith', course: 'CS101', status: 'Checked In', time: '09:05 AM' },
      { id: 4, studentName: 'Demo Student', course: 'CS101', status: 'Checked Out', time: '10:00 AM' },
    ]);

  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Smart Attendance</h2>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard/attendance/manual">
            Manual Attendance Entry
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 mt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Overall Attendance</CardTitle>
              <CardDescription>Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overall.percentage}%</div>
              <p className="text-xs text-muted-foreground">+2% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Late Arrivals</CardTitle>
              <CardDescription>Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overall.late}</div>
              <p className="text-xs text-muted-foreground">-3 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Absentees</CardTitle>
              <CardDescription>Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overall.absent}</div>
              <p className="text-xs text-muted-foreground">+1 from yesterday</p>
            </CardContent>
          </Card>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Low Attendance Alert</AlertTitle>
            <AlertDescription>
              {lowAttendance.length} students are below 75% attendance this month.
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Activity Log</CardTitle>
              <CardDescription>Live feed from campus biometric systems.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.studentName}</TableCell>
                      <TableCell>{activity.course}</TableCell>
                      <TableCell>
                        <Badge variant={activity.status === 'Checked In' ? 'default' : 'secondary'}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance by Course</CardTitle>
              <CardDescription>Summary for the current semester.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {summary.map((item) => (
                  <div key={item.course}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.course}</span>
                      <span className="text-sm text-muted-foreground">{item.present}/{item.total} classes</span>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </>
  );
}
