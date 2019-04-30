const frisby = require('frisby');

const { Joi } = frisby;

it('should return a status of 200 when the flowers are found', () => {
  return frisby
    .get('http://localhost:8000/api/flowers')
    .expect('status', 200);
});

it('should return a status of 200 when the flower is found', () => {
  return frisby
    .get('http://localhost:8000/api/flowers/5')
    .expect('status', 200);
});

it('should return a status of 404 when the flower does not exist', () => {
  return frisby
    .get('http://localhost:8000/api/flowers/-1')
    .expect('status', 404);
});

it('should return the flower name', () => {
  return frisby
    .get('http://localhost:8000/api/flowers/5')
    .expect('json', 'name', 'Rosemary')
});
