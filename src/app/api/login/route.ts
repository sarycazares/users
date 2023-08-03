import { User } from "@/models/User"
import createHash, { compareHash } from "@/utils/encrypt/bcrypt"
import { decryptString } from "@/utils/encrypt/crypto"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password } = body

    const cryptoPassword = await decryptString(password, process.env.NEXT_PUBLIC_CRYPTO_KEY)

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    const comparePaswords = await compareHash(cryptoPassword, user?.password as string)

    if (!comparePaswords) {
        console.log('entra aqui')
        const response = {
            error: 0
        }
        return NextResponse.json({ response })
    }
    return NextResponse.json({})
}