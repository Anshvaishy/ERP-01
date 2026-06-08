
"use client"

import Link from "next/link"
import * as React from "react"
import { Menu, ChevronDown, Users, Search, Phone } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "./ui/scroll-area"

const aboutLinks = [
  { href: "/about", title: "About University", description: "Our history, mission, and core values." },
  { href: "/about/governance", title: "Governance", description: "Meet our leadership and governing bodies." },
  { href: "/about/committees", title: "Committees", description: "Explore the committees ensuring our standards." },
  { href: "/about/org-structure", title: "Org Structure", description: "Understand our organizational framework." },
  { href: "/about/approvals", title: "Approvals", description: "View our accreditations and approvals." },
  { href: "/about/awards", title: "Awards", description: "Recognitions of our commitment to excellence." },
  { href: "/about/iqac", title: "IQAC", description: "Our Internal Quality Assurance Cell." },
  { href: "/about/naac", title: "NAAC", description: "NAAC accreditation details." },
  { href: "/about/nirf", title: "NIRF", description: "Our participation in the NIRF." },
];

const academicsLinks = [
  { href: "/academics/institutes", title: "Our Institutes", description: "Explore our diverse academic institutes." },
  { href: "/academics/curriculum", title: "Curriculum Design", description: "Learn about our modern curriculum." },
  { href: "/academics/teaching", title: "Teaching & Learning", description: "Our student-centric teaching process." },
  { href: "/academics/e-content", title: "E-Content Cell", description: "Our digital learning initiatives." },
  { href: "/academics/abc", title: "Academic Bank of Credits", description: "Flexible learning through ABC." },
  { href: "/academics/calendar", title: "Academic Calendar", description: "Key dates for the academic year." },
  { href: "/academics/global-mobility", title: "Global Mobility", description: "International exchange programs." },
  { href: "/academics/policies", title: "Policies & Reports", description: "Access important university policies." },
];

const admissionLinks = [
  { href: "/admission/overview", title: "Admission Overview", description: "Start your journey with us." },
  { href: "/admission/prospectus", title: "Prospectus 2026", description: "Key dates, fees, and exam details." },
  { href: "/admission/apply", title: "How to Apply", description: "A simple guide to our online process." },
  { href: "/admission/finder", title: "Program Finder", description: "Find the perfect program for you." },
  { href: "/admission/scholarship", title: "Scholarships", description: "Rewarding merit and supporting students." },
  { href: "/admission/fees", title: "Fee Structure", description: "Detailed fees for all programs." },
  { href: "/admission/policies", title: "Admission Policies", description: "Our official admission guidelines." },
  { href: "/admission/sop", title: "SOP Guidelines", description: "Crafting your Statement of Purpose." },
  { href: "/admission/checklist", title: "Document Checklist", description: "Ensure you have all required documents." },
  { href: "/admission/shift", title: "Shift Schedule", description: "Class schedules for first-year students." },
  { href: "/admission/faq", title: "Admission FAQs", description: "Answers to common questions." },
];

const campusLifeLinks = [
  { href: "/campus-life/facilities", title: "Facilities", description: "State-of-the-art campus facilities." },
  { href: "/campus-life/clubs", title: "Clubs & Societies", description: "Join over 100 student organizations." },
  { href: "/campus-life/events", title: "Events", description: "A vibrant calendar of annual events." },
  { href: "/campus-life/convocation", title: "Convocation", description: "Celebrating academic achievements." },
  { href: "/campus-life/senate", title: "Student Senate", description: "The voice of the student body." },
  { href: "/campus-life/green", title: "Green Initiatives", description: "Our commitment to sustainability." },
  { href: "/campus-life/library", title: "Library", description: "A gateway to knowledge and research." },
  { href: "/campus-life/outreach", title: "Outreach", description: "Our engagement with the community." },
  { href: "/campus-life/women-empowerment", title: "Women Empowerment", description: "Fostering a gender-sensitive campus." },
];

const placementsLinks = [
    { href: "/placements/overview", title: "Overview", description: "Our excellent track record of placements." },
    { href: "/placements/cell", title: "Placement Cell", description: "Bridging students and their future careers." },
    { href: "/placements/policies", title: "Policies", description: "Guidelines for a fair placement process." },
    { href: "/placements/testimonials", title: "Testimonials", description: "Success stories from our students." },
];

const researchLinks = [
    { href: "/research/overview", title: "Research Overview", description: "Our commitment to pushing boundaries." },
    { href: "/research/phd", title: "Ph.D. Admissions", description: "Join our community of scholars." },
    { href: "/research/innovation", title: "Innovation", description: "A vibrant ecosystem of entrepreneurship." },
    { href: "/research/consultancy", title: "Consultancy", description: "Leveraging academic expertise for industry." },
    { href: "/research/process", title: "Research Process", description: "Our structured process for quality research." },
    { href: "/research/publications", title: "Publications", description: "Impactful research from our scholars." },
];

const MobileNav = ({ onSelect }: { onSelect: () => void }) => {
  const pathname = usePathname();
  return (
    <div className="grid gap-6 p-4">
      <Link href="/" className="font-bold" onClick={onSelect}>Home</Link>
      <CollapsibleMenu title="About" basePath="/about" links={aboutLinks} pathname={pathname} onSelect={onSelect} />
      <CollapsibleMenu title="Academics" basePath="/academics" links={academicsLinks} pathname={pathname} onSelect={onSelect} />
      <CollapsibleMenu title="Admission" basePath="/admission" links={admissionLinks} pathname={pathname} onSelect={onSelect} />
      <CollapsibleMenu title="Campus Life" basePath="/campus-life" links={campusLifeLinks} pathname={pathname} onSelect={onSelect} />
      <CollapsibleMenu title="Placements" basePath="/placements" links={placementsLinks} pathname={pathname} onSelect={onSelect} />
      <CollapsibleMenu title="Research" basePath="/research" links={researchLinks} pathname={pathname} onSelect={onSelect} />
      <div className="flex flex-col gap-2 mt-4 border-t pt-4">
        <Button variant="ghost" asChild>
          <Link href="/login" onClick={onSelect}>Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register" onClick={onSelect}>Apply Now</Link>
        </Button>
      </div>
    </div>
  );
};


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground/90">
        <div className="container mx-auto flex h-10 items-center justify-between text-xs font-medium">
            <div className="hidden md:flex items-center gap-4">
                <Link href="/notice" className="hover:text-white transition-colors">NOTICE</Link>
                <Link href="/contact" className="hover:text-white transition-colors">ADMISSION ENQUIRY</Link>
                <Link href="/admission/shift" className="hover:text-white transition-colors">SHIFT SCHEDULE</Link>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/login" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Users className="h-4 w-4" /> Student Login
                </Link>
                 <Link href="/login" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
                    Staff Login
                </Link>
                <button className="hover:text-white transition-colors"><Search className="h-4 w-4" /></button>
                <div className="hidden sm:flex items-center gap-2 bg-background text-foreground p-2 h-full">
                    <Phone className="h-5 w-5 text-primary"/>
                    <div className="text-left">
                        <p className="text-xs text-muted-foreground">Admission Helpline</p>
                        <a href="tel:8423293265" className="font-bold text-primary">8423293265</a>
                    </div>
                </div>
                 <Button size="sm" className="h-full rounded-none bg-accent text-accent-foreground hover:bg-accent/90 hidden sm:block font-bold" asChild>
                    <Link href="/research/phd">PH.D. FORM</Link>
                </Button>
            </div>
        </div>
      </div>
      
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-8 w-auto text-primary" />
          <span className="font-bold font-headline inline-block text-lg">Obsidian Peak</span>
        </Link>
        
         <div className="hidden lg:flex flex-1 items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild active={pathname === '/'}>
                        <Link href="/" className={navigationMenuTriggerStyle()}>
                        Home
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger data-active={pathname.startsWith('/about')}>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[700px] ">
                      {aboutLinks.map((link) => (
                        <ListItem key={link.title} href={link.href} title={link.title}>
                          {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger data-active={pathname.startsWith('/academics')}>Academics</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {academicsLinks.map((link) => (
                        <ListItem key={link.title} href={link.href} title={link.title}>
                          {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger data-active={pathname.startsWith('/admission')}>Admission</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[700px] ">
                      {admissionLinks.map((link) => (
                        <ListItem key={link.title} href={link.href} title={link.title}>
                           {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger data-active={pathname.startsWith('/campus-life')}>Campus Life</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[700px] ">
                      {campusLifeLinks.map((link) => (
                        <ListItem key={link.title} href={link.href} title={link.title}>
                           {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger data-active={pathname.startsWith('/placements')}>Placements</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {placementsLinks.map((link) => (
                        <ListItem key={link.title} href={link.href} title={link.title}>
                           {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger data-active={pathname.startsWith('/research')}>Research</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {researchLinks.map((link) => (
                        <ListItem key={link.title} href={link.href} title={link.title}>
                          {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Apply Now</Link>
            </Button>
          </div>
          <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
              >
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px]">
                <SheetHeader>
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                        <Logo className="h-8 w-auto text-primary" />
                        <span className="font-bold font-headline inline-block text-lg">Obsidian Peak</span>
                    </Link>
                </SheetHeader>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <MobileNav onSelect={() => setIsMenuOpen(false)} />
                </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || ''}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


const CollapsibleMenu = ({ title, basePath, links, pathname, onSelect }: { title: string, basePath: string, links: { href: string, title: string, description?: string }[], pathname: string, onSelect: () => void }) => {
  const isActive = pathname.startsWith(basePath);
  
  return (
    <Collapsible className="flex flex-col text-sm">
      <CollapsibleTrigger asChild>
          <button data-active={isActive} className="flex items-center justify-between w-full font-bold data-[active=true]:text-primary">
            {title}
            <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
          </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-4 mt-2 flex flex-col gap-2 border-l">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground" onClick={onSelect}>
              {link.title}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

    