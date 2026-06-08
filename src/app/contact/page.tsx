
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/forms/contact-form";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ContactPage() {
  const mapImage = PlaceHolderImages.find((p) => p.id === "contact-map");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re here to help. Reach out to us with any questions or
              inquiries.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold font-headline">Send a Message</h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Our Address</h3>
                    <p>Obsidian Peak University, Knowledge Park, India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p>Admissions: admissions@obsidianpeak.ac.in</p>
                    <p>General: contact@obsidianpeak.ac.in</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Call Us</h3>
                    <p>Main Office: +91 11 2345 6789</p>
                    <p>Admissions: <a href="tel:+918423293265" className="hover:text-primary">+91-8423293265</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {mapImage && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold font-headline text-center mb-8">Our Location</h2>
              <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-md">
                 <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    data-ai-hint={mapImage.imageHint}
                    fill
                    className="object-cover"
                  />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
