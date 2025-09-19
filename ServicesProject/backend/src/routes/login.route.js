// import {Login} from '../controllers/login.controller.js';
// import express from 'express';

// const router=express.Router()

// router.route("/").post(
//     Login)

// export default router


import {Login} from "../controllers/login2.controller.js"
import express from "express"

const router=express.Router()
router.route("/").post(Login)
export default router