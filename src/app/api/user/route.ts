import createHash from '@/utils/encrypt/bcrypt'
import { decryptString } from '@/utils/encrypt/crypto'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
    const users = await prisma.user.findMany()

    return NextResponse.json({ users })
}

export async function POST(req: Request) {
    const body = await req.json()
    const { name, email, password } = body

    const cryptoPassword = await decryptString(password, process.env.NEXT_PUBLIC_CRYPTO_KEY)
    const bcryptPassword = await createHash(cryptoPassword)

    const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password: bcryptPassword
        },
    })

    return NextResponse.json({ createUser })
}

export async function PUT(req: Request) {
    const body = await req.json()
    const { id, name, email, password } = body
    const updateUser = await prisma.user.update({
        where: { id },
        data: {
            name,
            email,
            password
        },
    })

    return NextResponse.json({ updateUser })
}

export async function DELETE(req: Request) {
    const body = await req.json()
    const { id } = body
    const deletedUser = await prisma.user.delete({
        where: { id },
    })

    return NextResponse.json({ deletedUser })
}