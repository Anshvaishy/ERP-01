import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const faqs = [
  {
    question: "How do I check my attendance?",
    answer: "You can check your attendance by navigating to the 'Attendance' section from the dashboard sidebar. It provides a detailed summary of your attendance for each course.",
  },
  {
    question: "Where can I find my exam results?",
    answer: "Your exam results are available in the 'Results' section. You can view your GPA and status for each semester.",
  },
  {
    question: "How can I update my profile information?",
    answer: "To update your profile, go to the 'Settings' page. There you will find options to edit your personal details.",
  },
    {
    question: "Who should I contact for technical issues?",
    answer: "For any technical issues with the student portal, please reach out to our IT support team via email at itsupport@obsidianpeak.ac.in or call them at +91 11 2345 6788.",
  },
];

export default function HelpPage() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Help & Support</h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start">
                        <Mail className="h-6 w-6 mr-4 mt-1 text-primary" />
                        <div>
                            <h3 className="font-semibold">Email Us</h3>
                            <p className="text-sm text-muted-foreground">support@obsidianpeak.ac.in</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <Phone className="h-6 w-6 mr-4 mt-1 text-primary" />
                        <div>
                            <h3 className="font-semibold">Call Us</h3>
                            <p className="text-sm text-muted-foreground">+91 11 2345 6788</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
