
'use client';
import { Button } from '@/components/ui/button';
import { LibraryBook, Student, db } from '@/lib/local-storage-db';
import { IssueBookDialog } from './issue-book-dialog';
import { useToast } from '@/hooks/use-toast';

type LibraryActionsProps = {
  book: LibraryBook;
  students: Student[];
};

function ReturnButton({ book }: { book: LibraryBook }) {
    const { toast } = useToast();

    const handleReturn = () => {
        const returnedBook: LibraryBook = {
            ...book,
            roll: undefined,
            issueDate: undefined,
            dueDate: undefined,
            status: 'Available',
        };
        db.update('library', book.bookTitle, returnedBook);
        toast({ title: 'Success', description: 'Book returned successfully.' });
    }

    return (
        <Button size="sm" variant="outline" onClick={handleReturn}>Return</Button>
    );
}

export function LibraryActions({ book, students }: LibraryActionsProps) {
  if (book.status === 'Available') {
    return <IssueBookDialog book={book} students={students} />;
  }

  return <ReturnButton book={book} />;
}
