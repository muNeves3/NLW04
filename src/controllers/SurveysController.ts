import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveysRepository from "../repositories/SurveysRepository";
import * as Yup from 'yup';
import AppError from "../Errors/AppError";
export default class SurveysController {
  async create(request: Request, response: Response) {
    const {title, description} = request.body;

    const schema = Yup.object().shape({
      title: Yup.string().required('Título é obrigatório'),
      description: Yup.string().required('descrição obrigatória')
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch(err) {
      throw new AppError(err);
    }

    const surveyRepository = getCustomRepository(SurveysRepository);

    const survey = surveyRepository.create({
      title,
      description
    });

    await surveyRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveyRepository.find();

    return response.json(surveys);
  }

  async update(request: Request, response: Response) {
    const {title, description} = request.body;
    const { id } = request.params;

    const schema = Yup.object().shape({
      title: Yup.string().required('Título é obrigatório'),
      description: Yup.string().required('descrição obrigatória')
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch(err) {
      throw new AppError(err);
    }

    const surveyRepository = getCustomRepository(SurveysRepository);

    const survey = surveyRepository.update(id, {title, description });

    return response.status(201).json(survey);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveyUnexistent = await surveyRepository.findOne({ where: { id } });

    await surveyRepository.delete({ id });

    return response.json({ message: 'Survey deleted' });
  }
}
