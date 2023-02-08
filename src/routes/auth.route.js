import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router(); //es un middleware para poder gestionar mejor nuestras rutas en nuestro sitio web.
//todo lo que es autenticación estará en este router.

router.post(
  "/register",
  [
    body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body("password", "Mínimo 6 caracteres")
      .trim() //siempre hacer la limpieza primero.
      .isLength({ min: 6 }),
  ],
  validationResultExpress,
  register
);

router.post(
  "/login",
  [
    body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body("password", "Mínimo 6 caracteres")
      .trim() //siempre hacer la limpieza primero.
      .isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

export default router; //con el default podemos nombrar el archivo como queramos.
