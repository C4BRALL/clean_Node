import bcrypt from "bcrypt";
import { HashCompare } from "../../../data/protocols/criptography/hash-compare";
import { Hasher } from "../../../data/protocols/criptography/hasher";

export class BcryptAdapter implements Hasher, HashCompare {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async hash(value: string): Promise<string> {
    const hashValue = await bcrypt.hash(value, this.salt)
    return hashValue
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const compareValue = await bcrypt.compare(value, hash)
    return compareValue
  }
}