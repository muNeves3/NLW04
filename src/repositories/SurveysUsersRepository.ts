import { EntityRepository, Repository } from "typeorm";
import SurveyUser from '../models/SurveysUsers';

@EntityRepository(SurveyUser)
export default class SurveysUsers extends Repository<SurveyUser>{}
