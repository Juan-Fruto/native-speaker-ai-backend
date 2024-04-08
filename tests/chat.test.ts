jest.useFakeTimers();

import request from 'supertest';
import app from '../src/app';
import { TestHelper } from './testhelper'
beforeAll(async () => {
  console.log(process.env.DB_PASSWORD);
  TestHelper.instance.setupDB();
});

afterAll(async () => {
  TestHelper.instance.teardownTestDB();
});

// success
describe('POST /chat/message_array', () => {
  test('Return an audio file', async () => {
    const response = await request(app)
                            .post('/chat/message_array')
                            .send({
                              payload: [
                                {role: "system", content: "Your name is 'Native Speaker AI'"},
                                {role: "user", content: "Who are you?" }
                              ],
                              language: "english",
                              gender: "male"
                            });
                            
    expect(response.statusCode).toBe(200);
    expect(response.header['content-type']).toBe('audio/mp3');
    expect(response.header['content-disposition']).toBe('attachment; filename=speech_uuid.mp3');
    expect(response.body instanceof Buffer).toBeTruthy();
  }, 20_000);
});

// failure due to bad body format
describe('POST /chat/message_array', () => {
  test('Return an audio file', async () => {
    const response = await request(app)
                            .post('/chat/message_array')
                            .send({
                              payload: 20,
                              language: "eng",
                              gender: "women"
                          });
                            
    expect(response.statusCode).toBe(403);
    expect(response.body).toBe({
      "data": {
        "errors": [
          {
              "type": "field",
              "value": "women",
              "msg": "Invalid geneder format",
              "path": "gender",
              "location": "body"
          },
          {
              "type": "field",
              "value": "eng",
              "msg": "Invalid language format",
              "path": "language",
              "location": "body"
          }
        ]
      }
  });
  }, 20_000);
});