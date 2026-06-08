import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutSidebar } from '@/components/about-sidebar';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-secondary/50">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <aside className="md:col-span-1">
                <AboutSidebar />
              </aside>
              <div className="md:col-span-3">
                {children}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
}
