export class InvalidParamError extends Error {
  constructor (paramName: String) {
    super(`Invalid Param: ${paramName}`);
    this.name = 'InvalidParamError'
  } 
}
