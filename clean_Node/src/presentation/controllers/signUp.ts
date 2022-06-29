import { InvalidParamError } from "../errors/invalidParamError"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest } from "../helpers/http-helper"
import { Controller } from "../protocols/Controller"
import { EmailValidator } from "../protocols/email-validator"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignUpController implements Controller{
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: any) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}