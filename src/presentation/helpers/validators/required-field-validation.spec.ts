import { MissingParamError } from "../../errors"
import { RequiredFieldValidation } from "./required-field-validation"

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('any_field')
}

describe('Required Field Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  // it('Should not return if validation succeeds', () => {
  //   const sut = makeSut()
  //   const error = sut.validate({ field: 'any' })
  //   expect(error).toBeFalsy()
  // })
})
