
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/local-storage-db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PasswordInput } from "@/components/password-input";
import { Loader2 } from "lucide-react";
import { ForgotPasswordDialog } from "@/components/forgot-password-dialog";


function LoginForm({ userType }: { userType: 'student' | 'admin' | 'faculty' }) {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        setTimeout(() => {
            const result = db.verifyPassword(email, password);

            if (result.success && result.userType === userType) {
                 toast({ title: "Login Successful", description: `Welcome back!` });
                 const dashboardPath = 
                    result.userType === 'admin' ? "/admin/dashboard" :
                    result.userType === 'faculty' ? "/faculty/dashboard" :
                    "/student-panel/dashboard";
                router.push(dashboardPath);
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: result.message || `Invalid credentials for ${userType}.`,
                });
            }
            setIsPending(false);
        }, 1000);
    }
    
    return (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor={`${userType}-email-pwd`}>Email Address</Label>
                <Input id={`${userType}-email-pwd`} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor={`${userType}-password`}>Password</Label>
                    <ForgotPasswordDialog />
                </div>
                <PasswordInput id={`${userType}-password`} value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging In...</> : "Log In"}
            </Button>
        </form>
    );
}


export default function LoginPage() {
  const loginIllustration = PlaceHolderImages.find(p => p.id === 'login-illustration');

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
        <div className="relative flex items-center justify-center py-12 lg:py-0">
             <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <Link href="/" className="flex justify-center items-center gap-2 mb-4">
                        <Logo className="h-8 w-8 text-primary"/>
                        <span className="text-xl font-bold font-headline">Obsidian Peak</span>
                    </Link>
                    <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
                    <p className="text-balance text-muted-foreground">
                        Select your role to access your dashboard.
                    </p>
                </div>
                <Tabs defaultValue="student" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="student">Student</TabsTrigger>
                        <TabsTrigger value="faculty">Faculty</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    <TabsContent value="student" className="mt-4"><LoginForm userType="student" /></TabsContent>
                    <TabsContent value="faculty" className="mt-4"><LoginForm userType="faculty" /></TabsContent>
                    <TabsContent value="admin" className="mt-4"><LoginForm userType="admin" /></TabsContent>
                </Tabs>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline font-semibold">
                        Register for admission
                    </Link>
                </div>
            </div>
        </div>
        <div className="hidden bg-muted lg:block">
            {loginIllustration && (
                <Image
                    src={loginIllustration.imageUrl}
                    alt={loginIllustration.description}
                    data-ai-hint={loginIllustration.imageHint}
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            )}
        </div>
    </div>
  )
}
