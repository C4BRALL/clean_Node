import jwt from 'jsonwebtoken';
import { JwtAdapter } from './JwtAdapter';

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secretKey')
}

describe('Jwt Adapter', () => {
  it('Shoul call sign with correct values', () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({id: 'any_id'}, 'secretKey')
  })
})