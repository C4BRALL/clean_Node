import { HttpResponse } from "../protocols/http"
import { ServerError } from "../errors/server-error"
import { UnauthorizedError } from "../errors/unauthorized-error"


export const badRequest = (err: Error): HttpResponse => ({
  statusCode: 400,
  body: err
})

export const serverError = (err: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(err.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})
