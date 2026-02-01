import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as serviceController from '../controllers/serviceController';

const router = Router();

// User routes
router.post('/users/register', userController.registerUser);
router.get('/users/:id', userController.getUser);
router.get('/workers', userController.getWorkers);

// Service routes
router.post('/services', serviceController.createService);
router.get('/services/:id', serviceController.getService);
router.get('/services', serviceController.getServices);

export default router;