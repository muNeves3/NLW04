import { Router } from 'express';

import UserController from './controllers/UserController';
import SurveyController from './controllers/SurveysController';


const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();


router.post('/users', userController.create);
router.get('/users', userController.show);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);


export default router;
