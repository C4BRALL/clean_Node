import { MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return new Promise(resolve => resolve(badRequest(new MissingParamError(field))))
        }
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
