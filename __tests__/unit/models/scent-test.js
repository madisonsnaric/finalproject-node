const { expect } = require('chai');
const Scent = require('./../../../models/scent');

describe('scent', () => {
  describe('scent', () => {

    it('should fail validation when scent is not alpha', async () => {
      try {
        let scent = new Scent({ scent: '888' });
        await scent.validate();
      } catch(error) {
        expect(error.errors[0].message).to.equal('Scent must only contain letters');
      }
    });

    it('should pass validation when scent is alpha', async () => {
      try {
        let scent = new Scent({ scent: 'Fresh' });
        await scent.validate();
      } catch(error) {
        expect(error.errors[0].message).to.equal('Scent must only contain letters');
      }
    });

    it('should be at least 3 characters', async() => {
      try {
        let scent = new Scent({scent: 'a' });
        await scent.validate();
      } catch(error) {
        expect(error.errors[0].message).to.equal('Scent must be between 3 and 20 characters');
      }
    });

    it('should be less than 20 characters', async() => {
      try {
        let scent = new Scent({scent: 'ajsakfdjklsajdlkfjasklfjdkslajfk' });
        await scent.validate();
      } catch(error) {
        expect(error.errors[0].message).to.equal('Scent must be between 3 and 20 characters');
      }
    });
  });
});
