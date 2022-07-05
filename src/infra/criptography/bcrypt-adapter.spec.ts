import bcrypt from "bcrypt";
import { BcrypterAdapter } from "./bcrypt-adapter";

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12;
const makeSut = () : BcrypterAdapter => {
  return new BcrypterAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  })

  it('Should return a hash on success', async () => {
    const sut = makeSut();
    const hashValue = await sut.encrypt('any_value');
    expect(hashValue).toBe('hash');
  })
})