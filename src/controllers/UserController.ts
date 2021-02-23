import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

export default class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      email
    })

    if(userExists) {
      return response.status(400).json({error: 'Email already in use'})
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return response.json(user);
  }

  async show(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(users);
  }
}
