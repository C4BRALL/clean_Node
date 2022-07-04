import { DbAddAccount } from "./db-add-account"

describe('DbAddAccount Usecase', () => {
  it('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_passphrase'))
      }
    }
    const encryperStub = new EncrypterStub()
    const sut = new DbAddAccount(encryperStub)
    const encryptSpy = jest.spyOn(encryperStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com', 
      password: 'valid_passphrase'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_passphrase')
  })
})
