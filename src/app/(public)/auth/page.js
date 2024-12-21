'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import avatar_default from "@/assets/avatar_default.webp";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyAvatar, setCompanyAvatar] = useState(avatar_default);
    const [isCode, setIsCode] = useState(false);
    const [code, setCode] = useState("");
    const [activeTab, setActiveTab] = useState("login");
    const router = useRouter();

    // Funcion para el Login
    // 1- Verifica que los campos de email y password no esten vacios
    // 2- Envia una solicitud POST a la API con los datos de email y password
    // 3- Si la solicitud es exitosa, crea y guarda el token en la cookie y redirecciona a la pagina de Home
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert('Email and password are required.');
            return;
        }

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            alert(data.message);
            router.replace('/home');

        } catch (error) {
            alert(error)
            console.error(error);
        }
    };

    // Funcion para el Registro
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (email && password && companyName) {
            // Implement registration logic here
            console.log('Registration data:', { email, password, companyName, companyAvatar });
        }
    };

    // Funcion para el Recovery
    const handleRecoverySubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsCode(true);
            // Implement code sending logic here
            console.log('Recovery code sent to:', email);
        }
    };

    // Funcion para el cambio de avatar de Registro
    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setCompanyAvatar(URL.createObjectURL(file));
    };

    // Limpiar los campos al cambiar de tab
    useEffect(() => {
        setEmail("");
        setPassword("");
        setCompanyName("");
        setCompanyAvatar(avatar_default);
        setIsCode(false);
        setCode("");
    }, [activeTab]);

    return (
        <main className="flex flex-1 items-center justify-center w-full max-w-7xl h-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                        <TabsTrigger value="recovery">Recovery</TabsTrigger>
                    </TabsList>

                    {/* LOGIN */}
                    <TabsContent value="login">
                        <CardHeader>
                            <CardTitle>Welcome back!</CardTitle>
                            <CardDescription>Continue your economic experience.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLoginSubmit} className="space-y-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => console.log('Google login')}
                                >
                                    <FcGoogle className="mr-2 h-4 w-4" />
                                    Sign in with Google
                                </Button>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Sign In
                                </Button>
                            </form>
                        </CardContent>
                    </TabsContent>

                    {/* REGISTER */}
                    <TabsContent value="register">
                        <CardHeader>
                            <CardTitle>Create an account</CardTitle>
                            <CardDescription>Join the economic world.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Company name</Label>
                                    <Input
                                        id="company-name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Company avatar (optional)</Label>
                                    <div className="flex items-center space-x-4">
                                        <Input
                                            id="avatar"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="flex-1"
                                        />
                                        <Image
                                            src={companyAvatar}
                                            alt="Avatar"
                                            width={40}
                                            height={40}
                                            className="rounded-full w-10 h-10 object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email-register">Email</Label>
                                    <Input
                                        id="email-register"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password-register">Password</Label>
                                    <Input
                                        id="password-register"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>
                            </form>
                        </CardContent>
                    </TabsContent>

                    {/* RECOVERY */}
                    <TabsContent value="recovery">
                        <CardHeader>
                            <CardTitle>Recover your account</CardTitle>
                            <CardDescription>We`ll send you a code to reset your password.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRecoverySubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email-recovery">Email</Label>
                                    <Input
                                        id="email-recovery"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {isCode && (
                                    <div className="space-y-2">
                                        <Label htmlFor="code">Verification Code</Label>
                                        <Input
                                            id="code"
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            placeholder="Enter your code"
                                            required
                                        />
                                    </div>
                                )}
                                <Button type="submit" className="w-full">
                                    {isCode ? 'Verify Code' : 'Send Recovery Code'}
                                </Button>
                            </form>
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </Card>
        </main>
    );
}