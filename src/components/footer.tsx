import Link from "next/link"
import { Twitter, Facebook, Linkedin, Instagram, Youtube } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "./ui/button"

const primaryLinks = [
    { href: "/about", title: "About Us" },
    { href: "/programs", title: "Programs" },
    { href: "/admission/apply", title: "Admissions" },
    { href: "/placements/overview", title: "Placements" },
];

const secondaryLinks = [
    { href: "/campus-life/facilities", title: "Campus Life" },
    { href: "/research/overview", title: "Research" },
    { href: "/student-corner", title: "Student Corner" },
    { href: "/contact", title: "Contact Us" },
];

const legalLinks = [
    { href: "/privacy-policy", title: "Privacy Policy" },
    { href: "/terms-and-conditions", title: "Terms & Conditions" },
    { href: "/disclaimer", title: "Disclaimer" },
];

const socialLinks = [
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Facebook, href: "#", name: "Facebook" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Youtube, href: "#", name: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-10 w-auto text-primary" />
              <span className="text-xl font-bold font-headline">Obsidian Peak</span>
            </Link>
            <p className="text-sm text-muted-foreground">
                Obsidian Peak University, Knowledge Park, India
            </p>
             <div className="space-y-1 text-sm">
                <p>Phone: <a href="tel:+918423293265" className="hover:text-primary transition-colors">+91-8423293265</a></p>
                <p>Email: <a href="mailto:admissions@obsidianpeak.ac.in" className="hover:text-primary transition-colors">admissions@obsidianpeak.ac.in</a></p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-muted-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {primaryLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-foreground/80 hover:text-primary transition-colors">{link.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-muted-foreground">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {secondaryLinks.map(link => (
                 <li key={link.href}><Link href={link.href} className="text-foreground/80 hover:text-primary transition-colors">{link.title}</Link></li>
              ))}
            </ul>
          </div>
           <div>
            <h3 className="font-semibold tracking-wider uppercase text-muted-foreground">Stay Connected</h3>
            <p className="mt-4 text-sm text-foreground/80">Subscribe to our newsletter for the latest updates.</p>
            <form className="mt-4 flex gap-2">
                <input type="email" placeholder="Your email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-4 sm:mb-0">
                <p>&copy; {new Date().getFullYear()} Obsidian Peak University. All Rights Reserved.</p>
                <div className="flex space-x-4">
                    {legalLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">{link.title}</Link>
                    ))}
                </div>
            </div>
          <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
        </div>
      </div>
    </footer>
  )
}
