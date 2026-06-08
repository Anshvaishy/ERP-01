import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
            <h1 className="text-4xl font-bold font-headline text-primary">Disclaimer</h1>
            <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p>
              The information provided by Obsidian Peak University on https://www.obsidianpeak.ac.in (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>

            <h2 className="text-2xl font-headline font-bold mt-8">External Links Disclaimer</h2>
            <p>
              The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>

            <h2 className="text-2xl font-headline font-bold mt-8">Professional Disclaimer</h2>
            <p>
              The Site cannot and does not contain legal or academic advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of academic or legal advice.
            </p>
             <h2 className="text-2xl font-headline font-bold mt-8">Errors and Omissions Disclaimer</h2>
            <p>
              While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Obsidian Peak University is not responsible for any errors or omissions, or for the results obtained from the use of this information.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
