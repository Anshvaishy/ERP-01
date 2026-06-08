import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sun, Moon } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Shift Schedule (First Year Only)</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              To accommodate all our first-year students, classes are conducted in two shifts.
            </p>
          </div>
          <Card>
            <CardContent className="pt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Shift</TableHead>
                            <TableHead>Timings</TableHead>
                            <TableHead>Programs</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium flex items-center gap-2"><Sun className="text-yellow-500"/>Morning Shift</TableCell>
                            <TableCell>8:00 AM - 2:00 PM</TableCell>
                            <TableCell>B.Tech, B.Arch, B.Pharm</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell className="font-medium flex items-center gap-2"><Moon className="text-blue-500"/>Afternoon Shift</TableCell>
                            <TableCell>12:00 PM - 6:00 PM</TableCell>
                            <TableCell>BBA, BCA, B.Com, BA, B.Sc</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                 <p className="text-sm text-muted-foreground mt-4">*Note: Shift timings and program allocation are subject to change by the university administration.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
