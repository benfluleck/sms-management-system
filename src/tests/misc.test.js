import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);

describe('Miscellaneous Routes', () => {
  it('should return a 404 for Routes not Found', (done) => {
    chai
      .request(app)
      .get('/api/v1/phone')
      .set('Accept', 'application/x-www-form-urlencoded')
      .then((res) => {
        expect(res.status)
          .to
          .equal(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it('should return welcome message when navigating to the index route', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .set('Accept', 'application/x-www-form-urlencoded')
      .then((res) => {
        expect(res.status)
          .to
          .equal(200);
        expect(res.body.message).to.equal('Welcome to the SMS Management endpoints');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
