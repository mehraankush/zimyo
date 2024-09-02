import express from 'express';
const router = express.Router();

import userRoute from './user.routes.js'
import bookRoute from './book.routes.js'

router.use('/auth', userRoute);
router.use('/book', bookRoute)

export default router