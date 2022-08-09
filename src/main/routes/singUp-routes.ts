import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeSingUpController } from "../factories/signUp/signUp";

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSingUpController()))
}
