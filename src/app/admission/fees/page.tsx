
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { programDetailsData, ProgramDetail } from "@/lib/program-details";

const ugPrograms = programDetailsData.filter(p => p.level === "Undergraduate" && p.programName !== "Default");
const pgPrograms = programDetailsData.filter(p => p.level === "Postgraduate");
const diplomaPrograms = programDetailsData.filter(p => p.level === "Diploma");

const FeeTable = ({ programs }: { programs: ProgramDetail[] }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Tuition Fee</TableHead>
                <TableHead>Examination Fee</TableHead>
                <TableHead>Other Fees</TableHead>
                <TableHead className="text-right font-bold">Total Annual Fee</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {programs.map((item) => (
                <TableRow key={item.programName}>
                    <TableCell className="font-medium">{item.programName}</TableCell>
                    <TableCell>₹{item.fees.tuition.toLocaleString()}</TableCell>
                    <TableCell>₹{item.fees.examination.toLocaleString()}</TableCell>
                    <TableCell>₹{item.fees.other.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">₹{(item.fees.tuition + item.fees.examination + item.fees.other).toLocaleString()}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);


export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Fee Structure</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Find the detailed fee structure for our various programs for the academic session 2025-26.
            </p>
          </div>
          <Card>
            <CardHeader>
                <CardTitle>Program Fees</CardTitle>
                <CardDescription>All fees are listed per annum.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="ug">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="ug">Undergraduate</TabsTrigger>
                        <TabsTrigger value="pg">Postgraduate</TabsTrigger>
                        <TabsTrigger value="diploma">Diploma</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ug" className="mt-4">
                        <FeeTable programs={ugPrograms} />
                    </TabsContent>
                    <TabsContent value="pg" className="mt-4">
                         <FeeTable programs={pgPrograms} />
                    </TabsContent>
                    <TabsContent value="diploma" className="mt-4">
                         <FeeTable programs={diplomaPrograms} />
                    </TabsContent>
                </Tabs>
                <div className="mt-6 text-sm text-muted-foreground space-y-2">
                    <p><b>Hostel Fees:</b> Three Seater: ₹80,000/- per year | Two Seater: ₹1,05,000/- per year. (Caution money ₹5,000/- extra in first year)</p>
                    <p><b>Bus Fees:</b> ₹33,000/- per year.</p>
                    <p>*Note: The university reserves the right to revise the fee structure. Other fees include charges for Registration, Sports, Library, Medical, Co-curricular activities etc.</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
