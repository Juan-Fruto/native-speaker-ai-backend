import request from 'supertest'; 
import app from '../src/app';

describe('GET /', () => {
  test('Return greetins', async () => {
    const response = await request(app).get('/').send();
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('hi from controllers');
  });
});

describe('GET /about', () => {
  test('Return the proyect information', async () => {
    const response = await request(app).get('/about').send();
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('This is the API of the Speak Native AI project');
  });
});

// describe('GET /test', () => {
//   it('should respond with JSON containing a message', async () => {
//     const response = await request(app).get('/test');

//     // Verifica el código de estado y el formato del cuerpo de la respuesta
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ "message": "nsai_db" });

//   });
// });
