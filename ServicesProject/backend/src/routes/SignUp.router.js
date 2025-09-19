// import {SignUp} from '../controllers/signUp.controller.js';
// import express from 'express';

// const router=express.Router()

// router.route("/").post(
//     SignUp)

// export default router


import {SignUp} from "../controllers/signUp.controller.js"
import express from 'express'
const router=express.Router()
router.route("/").post(SignUp)
export default router

