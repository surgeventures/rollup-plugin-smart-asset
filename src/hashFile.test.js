import { hashFile } from "./hashFile"
import { readFile } from "fs"

jest.mock("fs")

const testContent = "test test test test test test test test"

readFile.mockImplementation((path, callback) => {
  if (path === "test.txt") {
    callback(null, Buffer.from(testContent))
  }
})

describe("hashFile()", () => {
  it("hashes file with truncation", async () => {
    const hash = await hashFile("test.txt", "sha1", "base52", 8)
    expect(hash).toEqual("xaplvNmt")
  })

  test.each([
    ["md5", "base52", "cCZNFrxoIcEFQgDqLxAFamr"],
    ["sha1", "base52", "xaplvNmtLrHPyezKCYcxrKLdmjWY"],
    ["md5", "hex", "417b4510517667e2182d96e57d30b86c"],
    ["sha1", "hex", "021ff3b9604639c993037de23a2335a777cc9156"]
  ])(
    "hashes using %s hash and %s encoding",
    async (hash, encoding, expectedDigest) => {
      const actualDigest = await hashFile("test.txt", hash, encoding)
      expect(actualDigest).toEqual(expectedDigest)
    }
  )
})
