import isEmail from "validator/lib/isEmail";
import { EmailValidator } from "../presentation/protocols/email-validator";

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return isEmail(email)
  }
}
