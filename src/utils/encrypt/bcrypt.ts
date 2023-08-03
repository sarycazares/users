const bcrypt = require('bcrypt')

export default function createHash(str: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(str, salt)
            resolve(password)
        } catch (error) {
            reject(error)
        }
    })
}

export function compareHash(str: string, hash: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await bcrypt.compare(str, hash)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}