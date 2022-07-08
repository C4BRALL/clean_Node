import { Router } from "express";

export default (router: Router): void => {
  router.post('/singUp', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
