import * as jose from 'jose';

const secret = new TextEncoder().encode(
    process.env.ACCESS_TOKEN_SECRET
)
export async function signUser(user: any) {
    const alg = 'HS256'

    const token = await new jose.SignJWT(user)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret)

    return token;
}

export async function authUser(token: string) {
    const { payload, protectedHeader } = await jose.jwtVerify(token, secret)
    // console.log("protectedHeader: ", protectedHeader)
    // console.log("payload: ", payload)
    return payload;
}