import express from "express";
import AuthControllers from "../controllers/AuthControllers";
import { Schemas, ValidatorSchema } from "../middlewares/Validator";

const router = express.Router()

router.post('/register', ValidatorSchema(Schemas.user.create), AuthControllers.handleRegister)
router.post('/login', ValidatorSchema(Schemas.user.login), AuthControllers.handleLogin)

export = router