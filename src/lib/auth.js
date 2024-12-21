import { jwtVerify, SignJWT } from "jose";

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