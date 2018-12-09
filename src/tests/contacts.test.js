import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import loginUser from './helpers/utils';
import { userDetails } from './fixtures/userData';

chai.use(chaiHttp);

const agent = chai.request.agent(app);


describe('Contacts', () => {
  describe('<POST> Add Contact', () => {

    it('should return a 201 status code when a new contact is added', (done) => {
      loginUser(agent)
        .then(() => {
          agent
            .post('/api/v1/contacts')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              firstName: 'Benny',
              phoneNumber: '08033323907'
            })
            .then((res) => {
              expect(res.status)
                .to
                .equal(201);
              expect(res.body).to.be.a('object');
              expect(res.body.message).to.equal('Contact Created Successfully');
              done();
            })
            .catch((err) => {
              done(err);
            });

        });
    });
    it('should return a 400 status code when an invalid phone number is entered', (done) => {
      loginUser(agent)
        .then(() => {
          agent
            .post('/api/v1/contacts')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              firstName: 'Benny',
              phoneNumber: '080'
            })
            .then((res) => {
              expect(res.status)
                .to
                .equal(400);
              expect(res.body.status).to.equal('error');
              expect(res.body.message).to.equal('The phone number entered is invalid');
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
    });
    it('should return a 409 status code when a number already in the database is supplied', (done) => {
      loginUser(agent)
        .then(() => {
          agent
            .post('/api/v1/contacts')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              firstName: 'Benny',
              phoneNumber: userDetails.phoneNumber
            })
            .then(() => {
              agent
                .post('/api/v1/contacts')
                .set('Accept', 'application/x-www-form-urlencoded')
                .send({
                  firstName: 'Ben',
                  phoneNumber: userDetails.phoneNumber
                })
                .then((res) => {
                  expect(res.status)
                    .to
                    .equal(409);
                  expect(res.body.status).to.equal('error');
                  expect(res.body.message).to.equal('A contact with this number already exists');
                  done();
                })
                .catch((err) => {
                  done(err);
                });

            });

        });
    });
  });
  describe('<GET> All Contacts', () => {
    it('should return a list of Contacts', (done) => {
      loginUser(agent)
        .then(() => {
          agent
            .post('/api/v1/contacts')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              firstName: 'Benny',
              phoneNumber: '08033535456'
            })
            .then(() => {
              agent
                .get('/api/v1/contacts')
                .set('Accept', 'application/x-www-form-urlencoded')
                .then((res) => {
                  expect(res.body.data.length).to.equal(3);
                  expect(res.body.message).to.equal('Contact list generated Successfully');
                  done();
                });
            })
            .catch((err) => {
              done(err);
            });
        });

    });
  });
  describe('<PUT> Update Contacts', () => {
    it('should update a contact', (done) => {
      loginUser(agent)
        .then(() => {
          agent
            .get('/api/v1/contacts')
            .set('Accept', 'application/x-www-form-urlencoded')
            .then((res) => {
              const id = res.body.data[ 0 ].id;

              agent
                .put(`/api/v1/contacts/${id}`)
                .set('Accept', 'application/x-www-form-urlencoded')
                .send({
                  firstName: 'Test',
                  phoneNumber: '080336454545',
                  lastName: 'Last'
                })
                .then((response) => {
                  expect(response.body.data.firstName).to.equal('Test');
                  expect(response.body.data.lastName).to.equal('Last');
                  expect(response.body.message).to.equal('Contact Successfully Updated');
                  done();
                });
            })
            .catch((err) => {
              done(err);
            });
        });
    });
    it('should return a 403 status error for an invalid id', (done) => {
      loginUser(agent)
        .then(() => {
          const id = 'ererer-121212-4454545-55656';

          agent
            .put(`/api/v1/contacts/${id}`)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              firstName: 'Test',
              phoneNumber: '080336454545',
              lastName: 'Last'
            })
            .then((res) => {
              expect(res.status)
                .to
                .equal(403);
              expect(res.body.status).to.equal('error');
              expect(res.body.message).to.equal('This Contact Id is invalid');
              done();
            });
        })
        .catch((err) => {
          done(err);
        });

    });
    it('should return a 404 status error for an valid id that doesn\'t exist in the database', (done) => {
      loginUser(agent)
        .then(() => {
          const id = '47309137-2d37-47bf-ac17-5fad0123a1a3';

          agent
            .put(`/api/v1/contacts/${id}`)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              firstName: 'Test',
              phoneNumber: '080336454545',
              lastName: 'Last'
            })
            .then((res) => {
              expect(res.status)
                .to
                .equal(404);
              expect(res.body.status).to.equal('error');
              expect(res.body.message).to.equal('This Contact Id does not exist');
              done();
            });
        })
        .catch((err) => {
          done(err);
        });

    });
  });
  describe('<DELETE> Delete Contact', () => {
    let deletedId;

    it('should delete a contact', (done) => {
      loginUser(agent)
        .then(() => {
          agent
            .get('/api/v1/contacts')
            .set('Accept', 'application/x-www-form-urlencoded')
            .then((res) => {
              deletedId = res.body.data[ 0 ].id;

              agent
                .del(`/api/v1/contacts/${deletedId}`)
                .set('Accept', 'application/x-www-form-urlencoded')
                .then((response) => {
                  expect(response.status)
                    .to
                    .equal(202);
                  expect(response.body.status).to.equal('success');
                  expect(response.body.message).to.equal('Contact Successfully Deleted');

                  done();
                });
            })
            .catch((err) => {
              done(err);
            });
        });
    });
    it('should return a 404 status error when trying to deleted an already deleted contact', (done) => {
      loginUser(agent);
      agent
        .del(`/api/v1/contacts/${deletedId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .then((response) => {
          expect(response.status)
            .to
            .equal(404);
          expect(response.body.status).to.equal('error');
          expect(response.body.message).to.equal('This Contact Id does not exist');

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

  });

});

