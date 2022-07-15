import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeSingUpController } from "../factories/signUp/singUp";

export default (router: Router): void => {
  router.post('/singUp', adaptRoute(makeSingUpController()))
}
