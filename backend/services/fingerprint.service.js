import crypto from "crypto"
import { decryptTemplate } from "../utils/crypto.js"

// Simulate fingerprint hashing for storage/compare
export const hashFingerprint = (raw) => {
  return crypto.createHash("sha256").update(raw).digest("hex")
}

// Simulated matching logic
export const isFingerprintMatch = (storedEncrypted, incomingRaw) => {
  const storedRaw = decryptTemplate(storedEncrypted)
  const storedHash = hashFingerprint(storedRaw)
  const incomingHash = hashFingerprint(incomingRaw)
  return storedHash === incomingHash
}

