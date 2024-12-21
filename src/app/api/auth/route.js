import { createToken } from "@/lib/auth";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


// POST utilizando SSO (Single Sign-On) con JWT
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
            passwordHash: "$2a$10$yMiwP/GDti21RNuTa9TbM.uNGRzHfL.Kuok37qOaVGpaGrm7TtG/6",
        };

        // Verificar si el usuario existe
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
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