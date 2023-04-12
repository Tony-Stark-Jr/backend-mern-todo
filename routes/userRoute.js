import express from 'express';
import { getAllUsers, register, login, getMyProfile, logout } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', getAllUsers);

router.post('/new', register);
router.post('/login', login);

router.get('/logout', isAuthenticated, logout);

// router.route('/userid/:id').get(getMyProfile);

router.get('/me', isAuthenticated, getMyProfile)

export default router;