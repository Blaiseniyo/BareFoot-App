import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';
import userRoutes from './userRoutes'
import travelRequestsRoutes from './travelRequestRoutes'

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/user/', userRoutes)
routes.use('/', landingPage);
routes.use('/', travelRequestsRoutes)

export default routes;
