import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import * as Yup from 'yup'
import AppError from "../Errors/AppError";
export default class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string().email().required('email incorreto')
    })

    // if(!(await schema.isValid(request.body))) {
    //   return response.status(400).json({error: "Validation failed"});
    // }

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch(err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({
      email
    })

    if(userExists) {
      throw new AppError('User already exists');
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }

  async show(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return response.json(users);
  }
}
