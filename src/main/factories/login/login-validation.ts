import { EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidatorAdapter } from "../../../utils/email-validator";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredField = ['email', 'password']
  for (const field of requiredField) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
