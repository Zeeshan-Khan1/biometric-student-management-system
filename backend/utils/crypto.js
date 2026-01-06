import crypto from "crypto"

const algorithm = "aes-256-gcm"
const ivLength = 16

// Read key at call time so it works correctly with dotenv injection
const getKey = () => {
  const key = process.env.FP_ENCRYPTION_KEY
  if (!key) {
    throw new Error("FP_ENCRYPTION_KEY is not set")
  }
  return key
}

export const encryptTemplate = (plain) => {
  const key = getKey()
  const iv = crypto.randomBytes(ivLength)
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "base64"), iv)
  let encrypted = cipher.update(plain, "utf8", "base64")
  encrypted += cipher.final("base64")
  const tag = cipher.getAuthTag()
  return `${iv.toString("base64")}:${encrypted}:${tag.toString("base64")}`
}

export const decryptTemplate = (payload) => {
  const key = getKey()
  const [ivB64, encrypted, tagB64] = payload.split(":")
  const iv = Buffer.from(ivB64, "base64")
  const tag = Buffer.from(tagB64, "base64")
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "base64"), iv)
  decipher.setAuthTag(tag)
  let decrypted = decipher.update(encrypted, "base64", "utf8")
  decrypted += decipher.final("utf8")
  return decrypted
}

