'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap } from "lucide-react";
import translate from "@/translate/homePage.json";
import useGlobal from "@/hooks/useGlobal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {

  const { language } = useGlobal();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const cards = [
    { title: translate.main[language].tagPrimary.title, description: translate.main[language].tagPrimary.description, icon: <Users className="h-10 w-10" /> },
    { title: translate.main[language].tagSecondary.title, description: translate.main[language].tagSecondary.description, icon: <Zap className="h-10 w-10" /> },
    { title: translate.main[language].tagTertiary.title, description: translate.main[language].tagTertiary.description, icon: <ArrowRight className="h-10 w-10" /> }
  ];

  return (
    <main className="flex-1 w-full">
      <section className="w-full max-w-7xl mx-auto flex justify-center py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-title font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {translate.main[language].textPrimary}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                {translate.main[language].textSecondary}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button>{translate.main[language].buttonPrimary}</Button>
              <Button variant="outline">{translate.main[language].buttonSecondary}</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-zinc-800">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <div key={index} className="flex flex-col items-center space-y-4 text-center p-6 bg-white dark:bg-zinc-700 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="text-4xl">{card.icon}</div>
                <h2 className="text-xl font-bold">{card.title}</h2>
                <p className="text-gray-500 dark:text-gray-300">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                {translate.main[language].contactTitle}
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {translate.main[language].contactDescription}
              </p>
            </div>
            <form className="w-full max-w-sm space-y-4">
              <Input
                className="w-full px-3 py-2 text-sm"
                placeholder={language === 'es' ? "Ingresa tu email" : "Enter your email"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
              />
              <Textarea
                className="w-full"
                placeholder={language === 'es' ? "Tu mensaje" : "Your message"}
                maxLength={150}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={!email || !message || !email.includes('@') || message.length < 10}
              >
                {language === 'es' ? 'Enviar' : 'Send'}
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {translate.main[language].contactFooter}
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
