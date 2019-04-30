const { expect } = require('chai');
const Flower = require('./../../../models/flower');

describe('flower', () => {
  describe('name', () => {

    it('should fail validation when name is not alpha', async () => {
      try {
        let flower = new Flower({ name: '888' });
        await flower.validate();
      } catch(error) {
        expect(error.errors[0].message).to.equal('Name must only contain letters');
      }
    });

    it('should pass validation when name is alpha', async () => {
      try {
        let flower = new Flower({ name: 'Dandelion' });
        await flower.validate();
      } catch(error) {
        expect(error.errors[0].message).to.equal('Name must only contain letters');
      }
    });
  });
});
