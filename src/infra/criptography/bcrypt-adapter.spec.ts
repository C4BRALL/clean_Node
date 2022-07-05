import bcrypt from "bcrypt";
import { BcrypterAdapter } from "./bcrypt-adapter";

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct value', async () => {
    const salt = 12;
    const sut = new BcrypterAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  })

  it('Should return a hash on success', async () => {
    const salt = 12;
    const sut = new BcrypterAdapter(salt);
    const hashValue = await sut.encrypt('any_value');
    expect(hashValue).toBe('hash');
  })
})