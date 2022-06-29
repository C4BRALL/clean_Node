import { HttpResponse } from "../protocols/http"
import { ServerError } from "../errors/server-error"


export const badRequest = (err: Error): HttpResponse => ({
  statusCode: 400,
  body: err
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
