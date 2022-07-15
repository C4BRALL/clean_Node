import { CompareFieldValidation } from "../../../presentation/helpers/validators/compare-field-validation";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
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
