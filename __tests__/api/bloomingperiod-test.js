const frisby = require('frisby');

const { Joi } = frisby;

it('should return a 204 when deleting a blooming period that exists', () => {
  return frisby
    .del('http://localhost:8000/api/bloomingperiods/9')
    .expect('status', 204);
});

it('should return a 404 when deleting a blooming period that does not exist', () => {
  return frisby
    .del('http://localhost:8000/api/bloomingperiods/-1')
    .expect('status', 404);
});

it('should create a new blooming period', () => {
  return frisby
    .post('http://localhost:8000/api/bloomingperiods', {
      bloomingperiod: 'May'
    })
    .expect('status', 200)
    .expect('json', 'bloomingperiod', 'May')
    .expect('jsonTypes', 'id', Joi.number().required());
});
