import { Router } from 'express';

import UserController from './controllers/UserController';
import SurveyController from './controllers/SurveysController';
import SendMailController from './controllers/SendMailController';


const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.get('/users', userController.show);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);
router.post('/sendMail', sendMailController.execute)

export default router;
