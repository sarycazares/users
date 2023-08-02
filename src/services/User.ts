import { User } from '@/models/User'
import { encryptString } from '@/utils/encrypt/crypto'
import axios from 'axios'

export const createUser = async (data: User) => {
    try {

        const hashPassword = await encryptString(data.password, process.env.NEXT_PUBLIC_CRYPTO_KEY)
        const dataUser = {
            ...data,
            password: hashPassword
        }

        const response = await axios.post('/api/user', dataUser)
        return response.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateUser = async (data: User) => {
    try {
        const response = await axios.put('/api/user', data)
        return response.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get('/api/user')
        return response.data.users
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getUser = async (id: number) => {
    try {
        const response = await axios.get('/api/user')
        const bread = response.data.find((user: User) => {
            return user.id === id
        })

        if (!bread) {
            throw new Error('Usuario no encontrado')
        }

        return bread
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await axios.delete('/api/user', { data: { id } })
        return response.data

    } catch (error: any) {
        throw new Error(error.message)
    }
}
