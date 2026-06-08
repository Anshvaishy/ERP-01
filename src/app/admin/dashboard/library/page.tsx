
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
import { db } from '@/lib/local-storage-db';
import type { LibraryBook, Student } from '@/lib/local-storage-db';
import { Badge } from '@/components/ui/badge';
import { AddBookDialog } from '@/components/admin/library/add-book-dialog';
import { LibraryActions } from '@/components/admin/library/library-actions';
import { useState, useEffect } from 'react';

export default function LibraryPage() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const loadData = () => {
    setBooks(db.getAll('library'));
    setStudents(db.getAll('students'));
  };

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
        if(event.detail.table === 'library' || event.detail.table === 'students') {
            loadData();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Library Management
      </h2>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Digital &amp; Physical Assets</CardTitle>
                <CardDescription>
                    Searchable catalog, e-book access, and automated alerts.
                </CardDescription>
            </div>
            <AddBookDialog />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Issued To (Roll No)</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{book.bookTitle}</TableCell>
                  <TableCell>{book.roll || 'N/A'}</TableCell>
                  <TableCell>{book.issueDate || 'N/A'}</TableCell>
                  <TableCell>{book.dueDate || 'N/A'}</TableCell>
                  <TableCell>
                     <Badge variant={book.status === 'Available' ? 'default' : 'secondary'}>
                        {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <LibraryActions book={book} students={students} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
