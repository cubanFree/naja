'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap } from "lucide-react";
import translate from "@/translate/homePage.json";
import useGlobal from "@/hooks/useGlobal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function Home() {

  const { language } = useGlobal();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
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
  );
}
