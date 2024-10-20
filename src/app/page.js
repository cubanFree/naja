'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight, Moon, Sun, Users, Zap } from "lucide-react";
import Link from "next/link";
import translate from "@/translate/homePage.json";
import useGlobal from "@/hooks/useGlobal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function Home() {

  const { language, toggleLanguage } = useGlobal();
  const { theme, toggleTheme } = useGlobal();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Guardar tema en localStorage para persistencia
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      toggleTheme(savedTheme);
    }
  }, [toggleTheme]);

  // Aplicar el tema al body
  useEffect(() => {
    document.body.className = theme; // Cambia la clase del body según el tema
    localStorage.setItem('theme', theme); // Guarda el tema en localStorage
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen">

      <header className="px-4 lg:px-0 h-14 flex items-center w-full max-w-7xl mx-auto">
        <Link className="flex items-center justify-center" href="#">
          <span className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/none">Naja</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            {translate.header[language].about}
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            {translate.header[language].login}
          </Link>
          <Button className="flex items-center font-bold text-slate-500 p-3" onClick={toggleLanguage} variant="outline" size="sm">
            {language === 'es' ? 'EN' : 'ES'}
          </Button>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto">
        <section className="w-full flex justify-center py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-title font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {translate.main[language].textPrimary}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {translate.main[language].textSecondary}
                </p>
              </div>
              <div className="space-x-4">
                <Button>{translate.main[language].buttonPrimary}</Button>
                <Button variant="outline">{translate.main[language].buttonSecondary}</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 rounded-md bg-gray-100 dark:bg-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-10 w-10" />
                <h2 className="text-xl font-bold">{translate.main[language].tagPrimary.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {translate.main[language].tagPrimary.description}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Zap className="h-10 w-10" />
                <h2 className="text-xl font-bold">{translate.main[language].tagSecondary.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {translate.main[language].tagSecondary.description}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <ArrowRight className="h-10 w-10" />
                <h2 className="text-xl font-bold">{translate.main[language].tagTertiary.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {translate.main[language].tagTertiary.description}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {translate.main[language].contactTitle}
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {translate.main[language].contactDescription}
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex flex-col space-y-4">
                    <Input
                      className="max-w-lg flex-1"
                      placeholder={language === 'es' ? "Ingresa tu email" : "Enter your email"}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Textarea
                      className="max-w-lg flex-1"
                      placeholder={language === 'es' ? "Tu mensaje" : "Your message"}
                      maxLength={150}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type="submit" disabled={!email || !message || !email.includes('@') || message.length < 10}>
                      {language === 'es' ? 'Enviar' : 'Send'}
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {translate.main[language].contactFooter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full max-w-7xl mx-auto shrink-0 items-center px-4 md:px-0 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">{translate.footer[language].copyright}</p>
        <nav className="sm:ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            {translate.footer[language].terms}
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            {translate.footer[language].privacy}
          </Link>
          <Button className="flex justify-center items-center" onClick={toggleTheme} variant="outline" size="sm">
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </nav>
      </footer>

    </div>
  );
}
