import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

import app from '../index';
import { startMigrations, dropMigrations } from '../config/migrations'

chai.use(chaiHttp);

const userDetails = {
  password: 'boooboo',
  firstName: 'Benny',
  lastName: 'Ogidan',
  email: 'benny.ogidan@hotmail.com',
}




describe('Authentication', () => {
  before(async () => {
    await dropMigrations();
    await startMigrations();

  })
  it(
    'should return a 201 status code when a regular user is created',
    async () => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          ...userDetails
        })
        await ((res) => {
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
        lastName: faker
          .name
          .lastName(),
        password: 'password',
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

  it(
    'should respond with 400 status code if bad username or password',
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
        console.log(res.body, '>>>>>> 200')
        expect(res.body.data.email).to.equal('benny.ogidan@hotmail.com');
        expect(res.status)
          .to
          .equal(200);
        done();
      }).catch((err) => {
        done(err)
      })
  });

  it('should throw a 404 error for Users that do not exist',  (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ email: 'UnknownUser@mail.com', password: 'error' })
      .then((res) => {
        console.log(res.body, '>>>>>> 404')
        expect(res.body.message)
          .to
          .equal('User cannot be ound');
        expect(res.status)
          .to
          .equal(402);
        done();
      })
      .catch((err) => {
        done(err)
      })
  });
  it('should return a 400 error for an invalid password ', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ email: 'Benny', password: '' })
      .then((res) => {
        expect(res.body.message)
          .to
          .equal('Password is too short');
        expect(res.status)
          .to
          .equal(400);
        done();
      })
      .catch((err) => {
        done(err)
      })
  });
  // it(
  //   'should return a 404 error for an Invalid user',
  //   (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/signin')
  //       .set('Accept', 'application/x-www-form-urlencoded')
  //       .send({ username: 'Benny', password: 'nnnnnnn' })
  //       .then((res) => {
  //         expect(res.body.message)
  //           .to
  //           .equal('Benny does not exist, Make sure you are signed up');
  //         expect(res.status)
  //           .to
  //           .equal(404);
  //         done();
  //       });
  //   }
  // );
  // it('should validate that a newly signed up user is unique', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/signup')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({
  //       username: 'testuser',
  //       firstname: 'Benn',
  //       lastname: 'Nyotu',
  //       email: 'ben@gmail.com',
  //       password: 'benny',
  //       passwordConfirmation: 'benny'
  //     })
  //     .then((res) => {
  //       expect(res.status)
  //         .to
  //         .be
  //         .equal(409);
  //       expect(res.body.message).to.equal('This username is already in use');
  //       done();
  //     });
  // });
  // it('should validate that the new user\'s email as unique', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/signup')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({
  //       username: 'Homer',
  //       firstname: 'Homer',
  //       lastname: 'Simpson',
  //       email: 'sample@email.com',
  //       password: 'benny',
  //       passwordConfirmation: 'benny'
  //     })
  //     .then((res) => {
  //       expect(res.status)
  //         .to
  //         .be
  //         .equal(409);
  //       expect(res.body.message).to.equal('This email is already in use');
  //       done();
  //     });
  // });


  // it('should require the username field when signing up', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/signin')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({ username: '', password: 'benny' })
  //     .then((res) => {
  //       expect('Content-Type', /json/);
  //       expect(res.status)
  //         .to
  //         .be
  //         .equal(400);
  //       expect(res.body.message)
  //         .to
  //         .equal('Username is invalid');
  //       done();
  //     });
  // });
  // it(
  //   'should require the password field when a new user\'s signs up',
  //   (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/signin')
  //       .set('Accept', 'application/x-www-form-urlencoded')
  //       .send({ username: 'Benny', password: '' })
  //       .then((res) => {
  //         expect('Content-Type', /json/);
  //         expect(res.status)
  //           .to
  //           .be
  //           .equal(400);
  //         expect(res.body.message)
  //           .to
  //           .equal('Password is too short');
  //         done();
  //       });
  //   }
  // );


});

