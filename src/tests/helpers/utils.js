
import { userDetails } from '../fixtures/userData';


export const loginUser = (agent) => new Promise((resolve) => {
  agent
    .post('/api/v1/auth/signup')
    .send({ ...userDetails })
    .then(() => {
      agent
        .post('/api/v1/auth/signin')
        .send({
          email: userDetails.email,
          password: userDetails.password,
        })
        .then(() => {
          resolve();
        })
    })
})

export default loginUser;
