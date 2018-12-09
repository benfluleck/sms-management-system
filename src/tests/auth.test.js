import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

import app from '../index';
import { userDetails } from './fixtures/userData';

chai.use(chaiHttp);

describe('Authentication', () => {
  it(
    'should return a 201 status code when a regular user is created',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          ...userDetails
        })
        .then((res) => {
          expect(res.status)
            .to
            .equal(201);
          expect(res.body).to.be.a('object');
          done();
        }).catch((err) => {
          done(err)
        })
    }
  );
  it('should throw a validation error for invalid user data', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        firstName: faker
          .name
          .firstName(),
        lastName: faker
          .name
          .lastName(),
        password: 'password',
        email: ''
      })
      .then((res) => {
        expect(res.body.message).to.equal('Please provide a valid email address');
        expect(res.status)
          .to
          .equal(400);
        done();
      }).catch((err) => {
        done(err)
      })
  });
  it('should throw a validation error for invalid user data', (done) => {
    const email = 'nenemail.com';
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        firstName: faker
          .name
          .firstName(),
        lastName: 'Martins',
        password: 'password',
        phoneNumber: '06790334545',
        email
      })
      .then((res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('This email address you have provided is invalid');
        expect(res.status)
          .to
          .equal(422);
        done();
      }).catch((err) => {
        done(err)
      })
  });
  it('should respond with 400 status code if bad username or password',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          password: faker
            .internet
            .password()
        })
        .then((res) => {
          expect(res.body.message).to.equal('Please provide a valid email address');
          expect(res.status)
            .to
            .equal(400);
          done();
        }).catch((err) => {
          done(err)
        })
    }
  );
  it('should return 200 when a regular user signs in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ email: userDetails.email, password: userDetails.password })
      .then((res) => {
        expect(res.body.message).to.equal('Welcome Benny');
        expect(res.status)
          .to
          .equal(200);
        done();
      }).catch((err) => {
        done(err)
      })
  });

  it('should throw a 404 error for Users that do not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ email: 'UnknownUser@mail.com', password: 'error' })
      .then((res) => {
        expect(res.body.message)
          .to
          .equal('This user does not exist');
        expect(res.status)
          .to
          .equal(404);
        done();
      })
      .catch((err) => {
        done(err)
      })
  });
  it('should return a 400 error for an invalid password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ email: 'Benny', password: '' })
      .then((res) => {
        expect(res.body.message)
          .to
          .equal('Please enter a valid password');
        expect(res.status)
          .to
          .equal(400);
        done();
      })
      .catch((err) => {
        done(err)
      })
  });
  it('should return a 404 error for an Invalid password',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ email: 'benny.ogidan@hotmail.com', password: 'nnnnnnn' })
        .then((res) => {
          expect(res.status)
            .to
            .equal(401);
          expect(res.body.status)
            .to
            .equal('error');
          expect(res.body.message).to.equal('Wrong Credentials')
          done();
        });
    }
  );
  it('should check for unique emails', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        firstName: 'Benn',
        lastName: 'Nyotu',
        email: 'benny.ogidan@hotmail.com',
        password: 'benny',
        phoneNumber: '08103345567'
      })
      .then((res) => {
        expect(res.status)
          .to
          .be
          .equal(409);
        expect(res.body.message).to.equal('This email is already in use');
        done();
      });
  });
});

