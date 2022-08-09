import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeLoginController } from "../factories/login/login-factory";
import { makeSingUpController } from "../factories/signUp/signUp";

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSingUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
