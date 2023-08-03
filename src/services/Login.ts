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
        const response = await axios.post('/api/login', datalogin)

        if (response.status == 200) return response.data
        else if (response.data.response.error == 0) {
            throw new Error('No es la contraseña correcta')
        } else {
            throw new Error('Hubo un error')
        }


    } catch (error: any) {
        throw new Error(error.message)
    }
}