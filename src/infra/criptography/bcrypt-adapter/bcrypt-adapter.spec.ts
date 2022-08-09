import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  },

  async compare(): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('Should call hash with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  })

  it('Should return a valid hash on success', async () => {
    const sut = makeSut();
    const hashValue = await sut.hash('any_value');
    expect(hashValue).toBe('hash');
  })

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const hashValue = sut.hash('any_value');
    await expect(hashValue).rejects.toThrow();
  })

  it('Should call compare with correct value', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  })

  it('Should return a valid compare on success', async () => {
    const sut = makeSut();
    const compareValue = await sut.compare('any_value', 'any_hash');
    expect(compareValue).toBe(true);
  })

  it('Should return false when compare fails', async () => {
    const sut = makeSut();
   jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      return new Promise(resolve => resolve(false))
    })
    const isValid = await sut.compare('any_value', 'any_hash');
    expect(isValid).toBe(false);
  })

  it('Should throw if compare throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const compareValue = sut.compare('any_value', 'any_hash');
    await expect(compareValue).rejects.toThrow();
  })
})