import request from "supertest";
import app from "../config/app";

describe('SingUp Routes', () => {
  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/singUp')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_passphrase',
        passwordConfirmation: 'any_passphrase'
      })
      .expect(200)
  })
})
