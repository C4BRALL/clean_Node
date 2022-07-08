import request from "supertest";
import app from "../config/app";

describe('Cors Middleware', () => {
  it('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test_cors')
      .expect('acces-control-allow-origin', '*')
  })
})
