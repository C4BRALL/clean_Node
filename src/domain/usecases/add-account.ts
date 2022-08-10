import { AccountModel } from "../models/account"

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }
  export type Result = boolean
}