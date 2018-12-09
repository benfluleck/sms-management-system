import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import loginUser from './helpers/utils';


chai.use(chaiHttp);

const agent = chai.request.agent(app);


describe('Messages', () => {
  describe('<POST> Send Message', () => {
    let recipientId;
    let senderId;
    const id = '47309137-2d37-47bf-ac17-5fad0123a1a3';
    const badId = '45456566-67688-7bf-ac17';

    it('should return a 201 status code when a regular user is created', (done) => {
      loginUser(agent)
        .then(() => {
          agent
            .get('/api/v1/contacts')
            .set('Accept', 'application/x-www-form-urlencoded')
            .then((res) => {
              recipientId = res.body.data[ 0 ].id;
              senderId = res.body.data[ 1 ].id;

              agent
                .post(`/api/v1/contacts/${senderId}/messages`)
                .set('Accept', 'application/x-www-form-urlencoded')
                .send({
                  messageContents: 'This is a test',
                  recipientId: recipientId,
                })
                .then((response) => {

                  expect(response.body.data.messageContents).to.equal('This is a test');
                  expect(response.body.message).to.equal('Message Sent Successfully');
                  done();
                });
            })
            .catch((err) => {
              done(err);
            });
        });
    });
    it('should return a 403 error for an invalid Contact id', (done) => {
      loginUser(agent)
        .then(() => {

          agent
            .post(`/api/v1/contacts/${badId}/messages`)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              messageContents: 'This is a test',
              recipientId: recipientId,
            })
            .then((response) => {
              expect(response.body.message).to.equal('This Contact Id is invalid');
              expect(response.body.status).to.equal('error');
              done();
            })
            .catch((err) => {
              done(err);
            });

        });
    });
    it('should return a 403 error for an invalid Recipient id', (done) => {
      loginUser(agent)
        .then(() => {

          agent
            .post(`/api/v1/contacts/${senderId}/messages`)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              messageContents: 'This is a test',
              recipientId: badId,
            })
            .then((response) => {
              expect(response.body.message).to.equal('This Recipient Id is invalid');
              expect(response.body.status).to.equal('error');
              done();
            })
            .catch((err) => {
              done(err);
            });

        });
    });
    it('should return a 404 error for an missing Contact id', (done) => {
      loginUser(agent)
        .then(() => {

          agent
            .post(`/api/v1/contacts/${id}/messages`)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              messageContents: 'This is a test',
              recipientId: recipientId,
            })
            .then((response) => {
              expect(response.body.message).to.equal('This Contact Id does not exist');
              expect(response.status).to.equal(404);
              expect(response.body.status).to.equal('error');
              done();
            })
            .catch((err) => {
              done(err);
            });

        });
    });
    it('should return a 404 error for an non-existent Recipient id', (done) => {
      loginUser(agent)
        .then(() => {

          agent
            .post(`/api/v1/contacts/${senderId}/messages`)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              messageContents: 'This is a test',
              recipientId: id,
            })
            .then((response) => {
              expect(response.body.message).to.equal('This Recipient Id does not exist');
              expect(response.status).to.equal(404);
              expect(response.body.status).to.equal('error');
              done();
            })
            .catch((err) => {
              done(err);
            });

        });
    });
    describe('<GET> Messages', () => {
      it('should return all messages sent by the contact', (done) => {
        loginUser(agent)
          .then(() => {
            agent
              .post(`/api/v1/contacts/${senderId}/messages`)
              .set('Accept', 'application/x-www-form-urlencoded')
              .send({
                messageContents: 'This is a test',
                recipientId: recipientId,
              })
              .then(() => {
                agent
                  .get(`/api/v1/contacts/${senderId}/messages`)
                  .then((response) => {
                    expect(response.body.data.length).to.equal(2);
                    expect(response.body.message).to.equal('Messages Succesfully Retrieved');
                    done();
                  });
              })
              .catch((err) => {
                done(err);
              });
          });
      });
      it('should return a 404 error for an invalid Contact id', (done) => {
        loginUser(agent)
          .then(() => {

            agent
              .get(`/api/v1/contacts/${id}/messages`)
              .set('Accept', 'application/x-www-form-urlencoded')
              .then((response) => {
                expect(response.body.message).to.equal('This Contact Id does not exist');
                expect(response.body.status).to.equal('error');
                done();
              })
              .catch((err) => {
                done(err);
              });
          });
      });
      it('should return all messages sent by the contact', (done) => {
        loginUser(agent)
          .then(() => {
            agent
              .get(`/api/v1/contacts/${senderId}/messages`)
              .query({ status: 'sent' })
              .then((response) => {
                expect(response.body.data.length).to.equal(2);
                expect(response.body.message).to.equal('Messages Succesfully Retrieved');
                done();
              });
          })
          .catch((err) => {
            done(err);
          });
      });
      it('should return all messages received ', (done) => {
        loginUser(agent)
          .then(() => {
            agent
              .get('/api/v1/messages')
              .then((response) => {
                expect(response.body.data.length).to.equal(2);
                expect(response.body.message).to.equal('Messages Succesfully Retrieved');
                done();
              });
          })
          .catch((err) => {
            done(err);
          });
      });
    });
    describe('<DELETE> Messages', () => {
      let messageId;

      it('should return a 202 status code for a succesufully deleted message', (done) => {
        loginUser(agent)
          .then(() => {
            agent
              .get('/api/v1/messages')

              .then((res) => {
                messageId = res.body.data[ 0 ].id;
                agent
                  .del(`/api/v1/messages/${messageId}`)
                  .then((response) => {
                    expect(response.status).to.equal(202);
                    expect(response.body.message).to.equal('Message Successfully Deleted');
                    done();
                  });
              })
              .catch((err) => {
                done(err);
              });
          });
      });
      it('should return a 404 error when trying to deleted an already deleted message', (done) => {
        loginUser(agent);
        agent
          .del(`/api/v1/messages/${messageId}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .then((response) => {
            expect(response.status)
              .to
              .equal(404);
            expect(response.body.status).to.equal('error');
            expect(response.body.message).to.equal('This Message does not exist');

            done();
          })
          .catch((err) => {
            done(err);
          });
      });

    });
  });
});
