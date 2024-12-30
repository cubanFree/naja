'use server'

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export async function verifyToken(token) {

    const secret = new TextEncoder().encode(process.env.KEY_SECRET)
    try {
        const { payload } = await jwtVerify(token, secret)
        return { data: payload }

    } catch (error) {
        return { error: '[-] Token no valido.' }
    }
}

export async function createToken(payload) {

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(process.env.KEY_SECRET))

    return { data: token }
}

export async function logOut() {
    try {
        const listElem = ["token", "session_token", "oauth_state"];
        listElem.forEach(item => cookies().delete(item));

    } catch (error) {
        console.error('[-] Error al cerrar sesión:', error);
    }
}

export async function changeEmailById(email) {
    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        console.error('[-] Error al cambiar el email a id:', error);
        return { error: '[-] Error al cambiar el email a id' };
    }
}