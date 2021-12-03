import { createHash as createNodeHash } from "crypto"

/**
 * Creates Hash-like hasher instance using hash name or Hash-like class.
 */
export function createHash(hash) {
  if (typeof hash === "function") {
    const Hash = hash
    return new Hash()
  }
  return createNodeHash(hash)
}
