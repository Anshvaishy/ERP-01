import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is the admission process for Obsidian Peak University?",
        answer: "The admission process is online. You need to register on our portal, fill out the application form, upload the necessary documents, and pay the application fee. Admissions are based on merit and eligibility criteria."
    },
    {
        question: "What are the eligibility criteria for the B.Tech program?",
        answer: "For B.Tech, candidates must have passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 50% marks. Some programs may have additional requirements."
    },
    {
        question: "Does the university offer any scholarships?",
        answer: "Yes, Obsidian Peak University offers a variety of scholarships based on academic merit, performance in entrance exams, and for specific categories like sports and wards of defense personnel. Please visit the scholarship page for more details."
    },
    {
        question: "Are there hostel facilities available?",
        answer: "Yes, we provide separate, well-furnished hostel facilities for boys and girls with 24/7 security, Wi-Fi, and mess services."
    },
    {
        question: "How can I contact the admission office?",
        answer: "You can contact our admission office via email at admissions@obsidianpeak.ac.in or by phone at +91-8423293265 during working hours (9 AM - 5 PM, Monday to Saturday)."
    },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Admission FAQs</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about our admission process.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left font-semibold text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
