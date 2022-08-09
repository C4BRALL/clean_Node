import { AddAccount } from "../usecases/add-account";
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})