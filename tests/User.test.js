// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

use(chaiHttp);
const token = process.env.Test_Token_Secret;
describe('testing getting all users end point', async () => {
  it('when a valid token is provided and page number is bigger it returns status of 400', async () => {
    const res = await request(app).get('/api/v1/user/all-users?page=5').set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(400);
  });
  it('when a valid token is provided and page number is 0 or its null it returns status of 404', async () => {
    const res = await request(app).get('/api/v1/user/all-users?page=0').set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(500);
  });
  it('when a valid token is provided and page number is correct it returns status of 200', async () => {
    const res = await request(app).get('/api/v1/user/all-users?page=1').set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
  });
});
