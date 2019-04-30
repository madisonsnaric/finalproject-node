const frisby = require('frisby');

const { Joi } = frisby;

it('should return a status of 200 when the scents are found', () => {
  return frisby
    .get('http://localhost:8000/api/scents')
    .expect('status', 200);
});

it('should return a status of 200 when the scent is found', () => {
  return frisby
    .get('http://localhost:8000/api/scents/2')
    .expect('status', 200);
});

it('should return a status of 404 when the scent does not exist', () => {
  return frisby
    .get('http://localhost:8000/api/scents/-1')
    .expect('status', 404);
});

it('should return the scent', () => {
  return frisby
    .get('http://localhost:8000/api/scents/5')
    .expect('json', 'scent', 'Spicy')
});

it('should create a new scent', () => {
  return frisby
    .post('http://localhost:8000/api/scents', {
      scent: 'Fruity'
    })
    .expect('status', 200)
    .expect('json', 'scent', 'Fruity')
    .expect('jsonTypes', 'id', Joi.number().required());
});

it('should return a status of 422 when validation fails while creating a new scent', () => {
  return frisby
    .post('http://localhost:8000/api/scents/3', {
      scent: '000',
    })
    .expect('status', 422)
});

it('should return a status of 200 when the scent is updated successfully', () => {
  return frisby
    .patch('http://localhost:8000/api/scents/3')
    .expect('status', 200);
});

it('should return a status of 422 when validation fails while updating a scent', () => {
  return frisby
    .patch('http://localhost:8000/api/scents/4', {
      scent: '',
    })
    .expect('status', 422)
});
