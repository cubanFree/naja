import { createToken } from "@/lib/auth";
import argon2 from "argon2";
import { NextResponse } from "next/server";

// POST utilizando Auth estandard con JWT
export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Validación de campos
        if (!email?.trim() || !password?.trim()) {
            return NextResponse.json(
                { message: '[-] Email and password are required' },
                { status: 400 }
            );
        }

        // En un caso real, esto vendría de tu base de datos
        const user = {
            id: 1,
            email: "ejemplo@exp.com",
            passwordHash: "$argon2id$v=19$m=65536,t=3,p=1$v0aiAuGwKiLUqQ+lXy5M4A$2ylUlbifJyCK+9x+Z64NtKSEzeYUHBfGU0bt4ODdg+M",
        };

        // Verificar si el usuario existe
        const isValidPassword = await argon2.verify(user.passwordHash, password);
        if (email !== user.email || !isValidPassword) {
            return NextResponse.json(
                { message: '[-] Invalid credentials' },
                { status: 401 }
            );
        }

        // Crear token
        const { data: token } = await createToken({
            id: user.id,
            email: user.email
        });

        // Verificar si el token fue generado
        if (!token.trim()) {
            return NextResponse.json(
                { message: '[-] Error generating token' },
                { status: 500 }
            );
        }

        // Crear respuesta con cookie
        const response = NextResponse.json(
            { message: '[+] Login successful' },
            { status: 200 }
        );

        // Configurar cookie de manera segura
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 3600 // 1 dia
        });

        return response;

    } catch (error) {
        console.error('[!] Login error:', error);

        return NextResponse.json(
            { message: '[!] Internal server error' },
            { status: 500 }
        );
    }
}