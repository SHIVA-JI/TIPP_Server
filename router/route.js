import { Router } from "express";
const router=Router();


/**Import controllers */
import * as controller from '../controller/controller.js'
import register from "../users/Register.js";
import LogIn from "../users/LogIn.js";




/**Question Routes API */
// router.get('/questions',controller.getQuestions)
// router.post('/questions',controller.insertQuestions)


router.route('/questions')
.get(controller.getQuestions)
.post(controller.insertQuestions)
.delete(controller.deleteQuestions)

router.route('/result')
.get(controller.getResult)
.post(controller.postResult)
.delete(controller.deleteResult)


router.route('/Register')
.post(register)

router.route('/LogIn')
.post(LogIn)



export default router; 