import createHash from "@/utils/encrypt/bcrypt"
import { decryptString } from "@/utils/encrypt/crypto"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    console.log('entra al servicio')
    const body = await req.json()
    const { email, password } = body

    const cryptoPassword = await decryptString(password, process.env.NEXT_PUBLIC_CRYPTO_KEY)
    const bcryptPassword = await createHash(cryptoPassword)

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    console.log(user)

    return NextResponse.json({})
}