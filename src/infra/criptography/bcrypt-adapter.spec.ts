import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  })

  it('Should return a hash on success', async () => {
    const sut = makeSut();
    const hashValue = await sut.hash('any_value');
    expect(hashValue).toBe('hash');
  })

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash') as unknown as jest.Mock<
      ReturnType<(key: Error) => Promise<Error>>,
      Parameters<(key: Error) => Promise<Error>>
    >
    hashSpy.mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const hashValue = sut.hash('any_value');
    await expect(hashValue).rejects.toThrow();
  })
})