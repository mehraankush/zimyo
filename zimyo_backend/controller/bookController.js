import { catchHandler } from '../utils/handlers/catchHandler.js';
import { successHandler } from '../utils/handlers/successHandler.js';
import BookService from '../services/book.service.js';

export const createBook = async (req, res) => {
    try {
        const { title, author } = req.body
        const { filename: coverImagePath } = req.file

        if (!title || !author || !coverImagePath) {
            throw new Error('Title and author, coverImagePath are required');
        }
        const requiredData = { ...req.body, coverImagePath };

        const newBook = await BookService.createBook(requiredData);

        return successHandler(
            res,
            'Book created successfully',
            newBook
        )
    } catch (error) {
        console.error('Error creating book:', error.message);
        return catchHandler(error, res);
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await BookService.getAllBooks();

        return successHandler(
            res,
            'Books fetched successfully',
            books
        )
    } catch (error) {
        console.error('Error getting book:', error.message);
        return catchHandler(error, res);
    }
}


export const getBookById = async (req, res) => {
    try {
        const { id } = req.params
        const book = await BookService.getBookById(id);

        return successHandler(
            res,
            'Book fetched successfully',
            book
        )
    } catch (error) {
        console.error('Error getting book:', error.message);
        return catchHandler(error, res);
    }
}


export const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const { title, author } = req.body
        const { filename: coverImagePath } = req.file

        if (!title || !author || !coverImagePath) {
            throw new Error('Title and author, coverImagePath are required');
        }
        const requiredData = { ...req.body, coverImagePath };

        const updatedBook = await BookService.updateBook(id, requiredData);

        return successHandler(
            res,
            'Book updated successfully',
            updatedBook
        )
    } catch (error) {
        console.error('Error updating book:', error.message);
        return catchHandler(error, res);
    }
}


export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await BookService.deleteBook(id);

        return successHandler(
            res,
            'Book deleted successfully',
            deletedBook
        )
    } catch (error) {
        console.error('Error deleting book:', error.message);
        return catchHandler(error, res);
    }
}
