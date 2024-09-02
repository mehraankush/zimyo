import express from 'express';
const router = express.Router();

import {
    createBook,
    getAllBooks
} from '../controller/bookController.js';
import upload from '../middleware/multerFileUploader.js';


router.post('/share', upload.single('coverImagePath'), createBook);
router.get('/', getAllBooks);
router.get('/:id');
router.put('/');

export default router