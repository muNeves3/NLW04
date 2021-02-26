import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../app';

import createConnection from '../database'

describe('SurveyUsers', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })
})
