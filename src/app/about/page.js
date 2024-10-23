'use client'

import { DollarSign, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import useGlobal from "@/hooks/useGlobal";

export default function AboutHome() {

    const { language } = useGlobal();

    const teamMembers = [
        { name: 'Ana García', role: language === 'es' ? 'CEO y Fundadora' : 'CEO & Founder', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Carlos Rodríguez', role: language === 'es' ? 'CTO' : 'CTO', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Laura Martínez', role: language === 'es' ? 'Directora de Operaciones' : 'COO', image: '/placeholder.svg?height=100&width=100' },
    ]

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto">
            <section className="w-full flex justify-center py-40">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h1 className="text-3xl font-title font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            {language === 'es' ? 'Acerca de Naja' : 'About Naja'}
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            {language === 'es'
                                ? 'Transformando la economía colaborativa a través de la innovación y la confianza.'
                                : 'Transforming the collaborative economy through innovation and trust.'}
                        </p>
                    </div>
                </div>
            </section>
            <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 rounded-md bg-gray-100 dark:bg-zinc-800">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <Users className="h-10 w-10 text-primary" />
                            <h2 className="text-xl font-bold hover:underline underline-offset-8">{language === 'es' ? 'Nuestra Misión' : 'Our Mission'}</h2>
                            <p className="text-muted-foreground">
                                {language === 'es'
                                    ? 'Empoderar a las personas para crear y participar en una economía más justa y sostenible.'
                                    : 'Empower people to create and participate in a fairer and more sustainable economy.'}
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <Globe className="h-10 w-10 text-primary" />
                            <h2 className="text-xl font-bold hover:underline underline-offset-8">{language === 'es' ? 'Nuestra Visión' : 'Our Vision'}</h2>
                            <p className="text-muted-foreground">
                                {language === 'es'
                                    ? 'Un mundo donde la colaboración económica trasciende fronteras y crea oportunidades para todos.'
                                    : 'A world where economic collaboration transcends borders and creates opportunities for everyone.'}
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <DollarSign className="h-10 w-10 text-primary" />
                            <h2 className="text-xl font-bold hover:underline underline-offset-8">{language === 'es' ? 'Nuestros Valores' : 'Our Values'}</h2>
                            <p className="text-muted-foreground">
                                {language === 'es'
                                    ? 'Transparencia, innovación, inclusión y empoderamiento económico.'
                                    : 'Transparency, innovation, inclusion, and economic empowerment.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground">
                <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
                        {language === 'es' ? 'Nuestro Equipo' : 'Our Team'}
                    </h2>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <Card key={index}>
                                <CardContent className="flex flex-col items-center space-y-4 p-6">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={100}
                                        height={100}
                                        className="rounded-full"
                                    />
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className="text-muted-foreground">{member.role}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}