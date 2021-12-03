import { createHash as createNodeHash } from "crypto"

import { createHash } from "./createHash"

jest.mock("crypto")

describe("createHash()", () => {
  it("supports custom hashes", () => {
    const hashFunc = jest.fn()
    const hash = createHash(hashFunc)
    expect(hash).toBeInstanceOf(hashFunc)
  })

  it("supports crypto hashes", () => {
    const Hasher = jest.fn()
    createNodeHash.mockImplementationOnce(() => {
      return new Hasher()
    })
    const hash = createHash("sha1")
    expect(createNodeHash).toBeCalledWith("sha1")
    expect(hash).toBeInstanceOf(Hasher)
  })
})
