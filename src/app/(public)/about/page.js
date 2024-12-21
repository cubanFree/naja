'use client'

import { DollarSign, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import useGlobal from "@/hooks/useGlobal";
import translate from "@/translate/aboutPage.json";
import avatar_default from "@/assets/avatar_default.webp";

export default function AboutHome() {

    const { language } = useGlobal();

    const teamMembers = [
        { name: translate.main[language].ourTeam.ceo.full_name, role: translate.main[language].ourTeam.ceo.role, image: null },
        { name: translate.main[language].ourTeam.cto.full_name, role: translate.main[language].ourTeam.cto.role, image: null },
        { name: translate.main[language].ourTeam.coo.full_name, role: translate.main[language].ourTeam.coo.role, image: null }
    ]

    const cards = [
        { title: translate.main[language].tagPrimary.title, description: translate.main[language].tagPrimary.description, icon: <Users className="h-10 w-10" /> },
        { title: translate.main[language].tagSecondary.title, description: translate.main[language].tagSecondary.description, icon: <DollarSign className="h-10 w-10" /> },
        { title: translate.main[language].tagTertiary.title, description: translate.main[language].tagTertiary.description, icon: <Globe className="h-10 w-10" /> }
    ]

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto">
            <section className="w-full flex justify-center py-40">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h1 className="text-3xl font-title font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            {translate.main[language].textPrimary}
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            {translate.main[language].textSecondary}
                        </p>
                    </div>
                </div>
            </section>
            <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 rounded-md bg-gray-100 dark:bg-zinc-800">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card, index) => (
                            <div key={index} className="flex flex-col items-center space-y-4 text-center">
                                {card.icon}
                                <h2 className="text-xl font-bold hover:underline underline-offset-8 cursor-pointer">{card.title}</h2>
                                <p className="text-muted-foreground">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground">
                <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
                        {translate.main[language].ourTeam.title}
                    </h2>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <Card key={index}>
                                <CardContent className="flex flex-col items-center space-y-4 p-6">
                                    <Image
                                        src={member.image || avatar_default}
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