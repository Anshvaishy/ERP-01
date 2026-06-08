import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RegisterForm } from "@/components/forms/register-form"; // Assuming a generic register form can be adapted

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-md">
             <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline">Alumni Registration</CardTitle>
                <CardDescription>Join our alumni network to stay connected.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* We can create a specific alumni registration form later */}
                <p className="text-center text-muted-foreground">The Alumni registration portal is under development. Please check back later.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
