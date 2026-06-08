import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { Inter, Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
  variable: '--font-headline',
});


export const metadata: Metadata = {
  title: "Obsidian Peak University | Best Private University in India | Admissions 2026",
  description: "Obsidian Peak University is a top private university in India offering Diploma, UG & PG programs with strong placements, NAAC framework, research excellence and modern campus life.",
  keywords: "Obsidian Peak University, Best Private University in India, University Admissions 2026, Diploma College, Engineering University, Placements, NAAC, NIRF",
  robots: "index, follow",
  author: "Obsidian Peak University",
  other: {
    "language": "English",
    "og:title": "Obsidian Peak University | Admissions 2026",
    "og:description": "Apply to Obsidian Peak University – Diploma, UG & PG programs with placements & research focus.",
    "og:type": "website",
    "og:url": "https://www.obsidianpeak.ac.in",
    "og:image": "https://www.obsidianpeak.ac.in/assets/campus.jpg",
    "twitter:card": "summary_large_image",
    "twitter:title": "Obsidian Peak University | Admissions 2026",
    "twitter:description": "Best private university in India with industry-aligned programs and placements."
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, poppins.variable)}>
      <head>
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "https://schema.org",
            "@type": "CollegeOrUniversity",
            "name": "Obsidian Peak University",
            "url": "https://www.obsidianpeak.ac.in",
            "sameAs": [
              "https://www.facebook.com/obsidianpeak",
              "https://www.linkedin.com/company/obsidianpeak"
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Knowledge Park",
              "addressLocality": "India",
              "addressCountry": "IN"
            }
          }
        `}} />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <FirebaseClientProvider>
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
