import express from "express";
import { infoUser, login, register } from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";
const router = express.Router(); //es un middleware para poder gestionar mejor nuestras rutas en nuestro sitio web.
//todo lo que es autenticación estará en este router.

router.post("/register", bodyLoginValidator, register);
router.post("/login", bodyRegisterValidator, login);
router.patch("/protected", requireToken, infoUser);
router.get("/protected", requireToken, infoUser);

export default router; //con el default podemos nombrar el archivo como queramos.
