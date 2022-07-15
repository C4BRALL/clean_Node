import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
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
