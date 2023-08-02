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