
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { db, HostelRoom, Student } from '@/lib/local-storage-db';
import { AllotRoomDialog } from '@/components/admin/allot-room-dialog';
import { AddHostelRoomDialog } from '@/components/admin/add-hostel-room-dialog';
import { useState, useEffect } from 'react';

export default function HostelsPage() {
  const [hostelData, setHostelData] = useState<HostelRoom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const loadData = () => {
    setHostelData(db.getAll('hostel'));
    setStudents(db.getAll('students'));
  }

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
      if (event.detail.table === 'hostel' || event.detail.table === 'students') {
        loadData();
      }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);
  
  const vacantRooms = hostelData.filter(r => r.status === 'Vacant');
  const studentsWithoutRooms = students.filter(s => !hostelData.some(hr => hr.roll === s.roll));

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Hostel Management
      </h2>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Room Allocation</CardTitle>
            <CardDescription>
              View and manage hostel room assignments.
            </CardDescription>
          </div>
          <div className='flex gap-2'>
            <AddHostelRoomDialog />
            <AllotRoomDialog students={studentsWithoutRooms} vacantRooms={vacantRooms} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostelData.map((room) => {
                const student = students.find(s => s.roll === room.roll);
                return (
                  <TableRow key={room.roomNo}>
                    <TableCell className="font-medium">{room.roomNo}</TableCell>
                    <TableCell>{student?.name || 'N/A'}</TableCell>
                    <TableCell>{room.roll || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          room.status === 'Occupied' ? 'secondary' : 'default'
                        }
                      >
                        {room.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
