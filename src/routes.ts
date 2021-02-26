import { Router } from 'express';

import UserController from './controllers/UserController';
import SurveyController from './controllers/SurveysController';
import SendMailController from './controllers/SendMailController';
import AnswerController from './controllers/AnswerController';
import NpsController from './controllers/NpsController';


const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post('/users', userController.create);
router.get('/users', userController.show);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);
router.put('/surveys/:id', surveyController.update);
router.delete('/surveys/:id', surveyController.delete);

router.post('/sendMail', sendMailController.execute);
router.get('/answers/:value', answerController.execute);
router.get('/nps/:survey_id', npsController.execute);
export default router;
