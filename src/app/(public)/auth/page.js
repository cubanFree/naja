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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react";
import { CheckCircle } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyAvatar, setCompanyAvatar] = useState({ avatar_preview: null, avatar_file: null });
    const [isCode, setIsCode] = useState(false);
    const [code, setCode] = useState("");
    const [updatePassword, setUpdatePassword] = useState(false);
    const [recoveryPassword, setRecoveryPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);

    // Funcion para el Login con Google
    const actionGoogleSignIn = async (e) => {
        e.preventDefault();

        const supabase = createClientComponentClient();

        try {
            // Iniciar sesión
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
                },
            });

            // Verificar si se pudo iniciar sesión
            if (error) throw error;

        } catch (error) {
            alert('*** Error en el server (Google) ***\n', error.message);
        }
    }

    // Funcion para el Login con Credenciales
    const actionSignInWithPassword = async (e) => {
        e.preventDefault();

        try {
            setLoadingLogin(true);

            const response = await fetch("/api/auth/credentials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '[-] Error en el servidor (Credentials)');
            }

            const data = await response.json();

            if (data.success) {
                window.location.href = "/home";
            }

        } catch (error) {
            alert(error.message);

        } finally {
            setLoadingLogin(false);
        }
    }

    // Funcion para el Registro
    const actionRegisterSubmit = async (e) => {
        e.preventDefault();

        if (email && password && companyName) {

            const formData = new FormData()
            formData.append('email', email)
            formData.append('password', password)
            formData.append('companyName', companyName)

            if (companyAvatar?.avatar_file) formData.append('companyAvatar', companyAvatar.avatar_file)

            try {
                setLoadingRegister(true);

                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    body: formData
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || '[-] Error en el servidor (Register)');
                }

                const data = await response.json();

                if (data.success) {
                    alert("[+] Registrado con exito. Verifique su correo para activar la cuenta.");
                }

            } catch (error) {
                alert(error.message);
            } finally {
                setLoadingRegister(false);
            }

        } else {
            alert('*** Email, contraseña y nombre de la Empresa son requeridos ***');
        }
    };

    // Funcion para el Recovery
    const actionRecoverySubmit = async (e) => {
        e.preventDefault();

        if (!email) return alert('*** Email es requerido ***');

        const supabase = createClientComponentClient();

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email)

            if (error) throw error

            alert('Se ha enviado un codigo a tu email.');
            setIsCode(true);

        } catch (error) {
            alert('*** Error en el servidor (Recovery) ***\n', error.message);
        }
    };

    // Funcion para verificar el codigo
    const actionCodeSubmit = async (e) => {
        e.preventDefault();

        const supabase = createClientComponentClient();

        if (!code) return alert('*** Codigo es requerido ***');

        try {
            // Verificar codigo
            const { error: errorCode } = await supabase.auth.verifyOtp({
                email: email,
                token: code,
                type: 'recovery',
            })

            if (errorCode) throw errorCode

            alert('Codigo verificado con exito.');
            setUpdatePassword(true);

        } catch (error) {
            console.log(error)
            alert('*** Error en el servidor (Code) ***\n', error.message);
        }
    };

    // Funcion para el cambio de contraseña
    const actionUpdatePassword = async (e) => {
        e.preventDefault();

        if (!updatePassword) return alert('*** La nueva contraseña es requerida ***');

        const supabase = createClientComponentClient();

        try {
            // Actualizar contraseña
            const { error } = await supabase.auth.updateUser({
                password: recoveryPassword,
            });

            if (error) throw error;

            alert('Contraseña actualizada con exito.');

        } catch (error) {
            alert('*** Error en el servidor (UpdatePassword) ***\n', error.message);
        }
    };

    // Funcion para el cambio de avatar de Registro
    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setCompanyAvatar({ avatar_preview: URL.createObjectURL(file), avatar_file: file });
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
                            <form onSubmit={actionSignInWithPassword} className="space-y-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={actionGoogleSignIn}
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
                                <Button
                                    type="submit"
                                    disabled={!email || !password || loadingLogin}
                                    className="w-full flex justify-center items-center gap-2"
                                >
                                    {loadingLogin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                            <form onSubmit={actionRegisterSubmit} className="space-y-4">
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
                                            src={companyAvatar?.avatar_preview || avatar_default}
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
                                <Button
                                    type="submit"
                                    disabled={!email || !password || !companyName || loadingRegister}
                                    className="w-full flex justify-center items-center gap-2"
                                >
                                    {loadingRegister ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Create Account
                                </Button>
                            </form>
                        </CardContent>
                    </TabsContent>

                    {/* RECOVERY */}
                    <TabsContent value="recovery">
                        <CardHeader>
                            <CardTitle>Recover your account</CardTitle>
                            <CardDescription>We`ll send you a email to reset your password.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="space-y-4"
                                onSubmit={
                                    updatePassword
                                        ? actionUpdatePassword
                                        : isCode
                                            ? actionCodeSubmit
                                            : actionRecoverySubmit
                                }
                            >
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
                                        <Label
                                            htmlFor="code"
                                            className="w-full flex items-center justify-between"
                                        >
                                            Verification Code
                                            {updatePassword && <CheckCircle size={14} className="text-green-500" />}
                                        </Label>
                                        <Input
                                            id="code"
                                            type="text"
                                            value={code}
                                            disabled={isCode && updatePassword}
                                            onChange={(e) => setCode(e.target.value)}
                                            placeholder="Enter your code"
                                            required
                                        />
                                    </div>
                                )}
                                {updatePassword && (
                                    <div className="space-y-2">
                                        <Label htmlFor="reset-password">New password</Label>
                                        <Input
                                            id="reset-password"
                                            type="password"
                                            value={recoveryPassword}
                                            onChange={(e) => setRecoveryPassword(e.target.value)}
                                            placeholder="type your new password"
                                            required
                                        />
                                    </div>
                                )}
                                <Button type="submit" className="w-full">
                                    {updatePassword
                                        ? 'Update Password'
                                        : isCode
                                            ? 'Verify Code'
                                            : 'Send Recovery Code'
                                    }
                                </Button>
                            </form>
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </Card>
        </main>
    );
}