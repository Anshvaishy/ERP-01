import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
            <h1 className="text-4xl font-bold font-headline text-primary">Terms and Conditions</h1>
            <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p>
              Welcome to Obsidian Peak University. These terms and conditions outline the rules and regulations for the use of Obsidian Peak University's Website, located at https://www.obsidianpeak.ac.in.
            </p>
            <p>
              By accessing this website we assume you accept these terms and conditions. Do not continue to use Obsidian Peak University if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-headline font-bold mt-8">Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these Terms, Obsidian Peak University and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.
            </p>

            <h2 className="text-2xl font-headline font-bold mt-8">Restrictions</h2>
            <p>
              You are specifically restricted from all of the following:
            </p>
            <ul>
              <li>Publishing any Website material in any other media;</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
              <li>Publicly performing and/or showing any Website material;</li>
              <li>Using this Website in any way that is or may be damaging to this Website;</li>
              <li>Using this Website in any way that impacts user access to this Website;</li>
              <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website.</li>
            </ul>

            <h2 className="text-2xl font-headline font-bold mt-8">Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
