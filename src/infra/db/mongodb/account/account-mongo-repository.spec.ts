import { Collection, ObjectId } from "mongodb"
import { MongoHelper } from "../helpers/mongo-helper"
import { AccountMongoRepository } from "./account-mongo-repository"
import { faker } from '@faker-js/faker'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  it('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add ({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passphrase'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_passphrase')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passphrase'
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_passphrase')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    const result = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passphrase',
    })
    const fakeAccount = await accountCollection.findOne({ _id: new ObjectId(result.insertedId.toString()) })    
    expect(fakeAccount.accessToken).toBeFalsy()
    const accessToken = faker.datatype.uuid()
    await sut.updateAccessToken(fakeAccount._id.toString(), accessToken)
    const account = await accountCollection.findOne({ _id: fakeAccount._id })
    expect(account).toBeTruthy()
    expect(account.access_token).toBe(accessToken)
  })
})