import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidatorAdapter } from "../../../utils/email-validator";

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
  for (const field of requiredField) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
