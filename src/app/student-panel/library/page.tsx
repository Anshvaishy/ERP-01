
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { db, Student, LibraryBook } from '@/lib/local-storage-db';

export default function LibraryPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [issuedBooks, setIssuedBooks] = useState<LibraryBook[]>([]);
  const [allBooks, setAllBooks] = useState<LibraryBook[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
        const currentStudent = db.getAll('students').find(s => s.email === session.user);
        if (currentStudent) {
            setStudent(currentStudent);
            const libraryData = db.getAll('library');
            setIssuedBooks(libraryData.filter(b => b.roll === currentStudent.roll));
            setAllBooks(libraryData);
        }
    }
  }, []);

  const filteredBooks = allBooks.filter(book => 
    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) && book.status === 'Available'
  );

  if (!student) {
    return <div>Loading library data...</div>
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Digital Library</h2>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Issued Books</CardTitle>
          <CardDescription>Books currently borrowed by you from the library.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead className="text-right">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issuedBooks.length > 0 ? (
                issuedBooks.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{book.bookTitle}</TableCell>
                    <TableCell>{book.issueDate}</TableCell>
                    <TableCell className="text-right font-semibold text-destructive">{book.dueDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No books currently issued.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Online Public Access Catalog (OPAC)</CardTitle>
          <CardDescription>Search for available books in the library.</CardDescription>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by book title..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{book.bookTitle}</TableCell>
                  <TableCell className="text-right text-green-600 font-semibold">{book.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
