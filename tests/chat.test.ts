import request from 'supertest'; 
import app from '../src/app';

// success
describe('POST /chat/message', () => {
  test('Return an audio file', async () => {
    const response = await request(app)
                            .post('/chat/message')
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

// failure due to bad payload format
describe('POST /chat/message', () => {
  test('Return an audio file', async () => {
    const response = await request(app)
                            .post('/chat/message')
                            .send({
                              payload: 20,
                              language: "english",
                              gender: "female"
                          });
                            
    expect(response.statusCode).toBe(403);
    expect(response.body).toBe({
      "data": {
          "errors": [
              {
                  "type": "field",
                  "value": 20,
                  "msg": "Invalid payload format",
                  "path": "payload",
                  "location": "body"
              }
          ]
      }
  });
  }, 20_000);
});