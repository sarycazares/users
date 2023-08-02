import { LoginUser } from "@/models/Login"
import { encryptString } from "@/utils/encrypt/crypto"
import axios from "axios"

export const loginUser = async (data: LoginUser) => {
    try {
        const hashPassword = await encryptString(data.password, process.env.NEXT_PUBLIC_CRYPTO_KEY)
        const datalogin = {
            ...data,
            password: hashPassword
        }

        console.log('entra aqui')
        const response = await axios.post('/api/login', datalogin)
        return response.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}