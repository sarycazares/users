const CryptoJS = require("crypto-js")

export function encryptString(str: string, secretKey: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const ciphertext = CryptoJS.AES.encrypt(str, secretKey).toString()
            resolve(ciphertext)
        } catch (error) {
            reject(error)
        }
    })
}

export function decryptString(str: string, secretKey: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const bytes = CryptoJS.AES.decrypt(str, secretKey)
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
            resolve(decryptedData)
        } catch (error) {
            reject(error)
        }
    })
}