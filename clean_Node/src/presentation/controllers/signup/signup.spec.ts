import { EmailValidator, AddAccount, AddAccountModel, AccountModel } from "./signup-protocols"
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { SignUpController } from "./signUp"

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_passphrase'
      }
      return fakeAccount;
    }
  }
  return new AddAccountStub();
}

// const makeEmailValidatorWithError = (): EmailValidator => {
//   class EmailValidatorStub implements EmailValidator {
//     isValid(email: string): boolean {
//       throw new Error();
//     }
//   }
//   return new EmailValidatorStub();
// }

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)

  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('Sign Up Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'passphrase',
        passwordConfirmation: 'passphrase'
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if no email is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'passphrase',
        passwordConfirmation: 'passphrase'
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('email'));
  });

  it('Should return 400 if no password is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'passphrase'
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('password'));
  });

  it('Should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'passphrase'

      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  it('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'passphrase',
        passwordConfirmation: 'passphrase'
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new InvalidParamError('email'));
  });

  it('Should return 400 if password confirmation fails', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'passphrase',
        passwordConfirmation: 'invalid_passphrase'

      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'passphrase',
        passwordConfirmation: 'passphrase'
      }
    }
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'passphrase',
        passwordConfirmation: 'passphrase'
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse?.body).toEqual(new ServerError());
  });

  it('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'passphrase',
        passwordConfirmation: 'passphrase'
      }
    }
    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'passphrase'
    });
  });

  it('Should return 500 if AddAccount throws', () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'passphrase',
        passwordConfirmation: 'passphrase'
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse?.body).toEqual(new ServerError());
  });

  it('Should return 200 if valid data is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_passphrase',
        passwordConfirmation: 'valid_passphrase'
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse?.statusCode).toBe(200);
    expect(httpResponse?.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_passphrase'
    });
  });
});
