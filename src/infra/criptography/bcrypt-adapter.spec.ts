import bcrypt from "bcrypt";
import { BcrypterAdapter } from "./bcrypt-adapter";

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct value', async () => {
    const salt = 12;
    const sut = new BcrypterAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  })

})