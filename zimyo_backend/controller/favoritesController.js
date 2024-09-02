import { favoriteService } from '../services/favorite.service.js';
import { catchHandler } from '../utils/handlers/catchHandler.js';
import { successHandler } from '../utils/handlers/successHandler.js';
import userService from '../services/user.service.js';
import BookService from '../services/book.service.js';

export const createFavorite = async (req, res) => {
    const { userId, bookId } = req.body;
    
    if (!userId || !bookId) {
        return res.status(400).json({ message: 'User ID and book ID are required' });
    }

    try {

        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const favorite = await favoriteService.createFavorite(req.body);
        return successHandler(
            res,
            'Favorite created successfully',
            favorite
        )
    } catch (error) {
        console.error('Error creating favorite:', error.message);
        return catchHandler(error, res)
    }
}

export const getFavoriteById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const favorite = await favoriteService.getFavoriteById(id);
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        return successHandler(
            res,
            'Favorite fetched successfully',
            favorite
        )
    } catch (error) {
        console.error('Error getting favorite:', error.message);
        return catchHandler(error, res)
    }
}

export const getAllFavorites = async (req, res) => {
    const { userId, bookId } = req.query;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const favorites = await favoriteService.getAllFavorites(req.query);
        return successHandler(
            res,
            'Favorites fetched successfully',
            favorites
        )
    } catch (error) {
        console.error('Error getting favorites:', error.message);
        return catchHandler(error, res)
    }
}

export const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const { userId, bookId } = req.body;
    if (!id || !userId || !bookId) {
        return res.status(400).json({ message: 'ID, user ID, and book ID are required' });
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const favorite = await favoriteService.updateFavorite(id, req.body);
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        return successHandler(
            res,
            'Favorite updated successfully',
            favorite
        )
    } catch (error) {
        console.error('Error updating favorite:', error.message);
        return catchHandler(error, res)
    }
}

export const deleteFavorite = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const favorite = await favoriteService.deleteFavorite(id);
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        return successHandler(
            res,
            'Favorite deleted successfully',
            favorite
        )
    } catch (error) {
        console.error('Error deleting favorite:', error.message);
        return catchHandler(error, res)
    }
}

export const addBookToFavorite = async (req, res) => {
    const { userId, bookId } = req.params;
    if (!userId || !bookId) {
        return res.status(400).json({ message: 'User ID and book ID are required' });
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const favorite = await favoriteService.addBookToFavorite(userId, bookId);
        return successHandler(
            res,
            'Book added to favorite successfully',
            favorite
        )
    } catch (error) {
        console.error('Error adding book to favorite:', error.message);
        return catchHandler(error, res)
    }
}

export const removeBookFromFavorite = async (req, res) => {
    const { userId, bookId } = req.params;
    if (!userId || !bookId) {
        return res.status(400).json({ message: 'User ID and book ID are required' });
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const favorite = await favoriteService.removeBookFromFavorite(userId, bookId);
        return successHandler(
            res,
            'Book removed from favorite successfully',
            favorite
        )
    } catch (error) {
        console.error('Error removing book from favorite:', error.message);
        return catchHandler(error, res);
    }
}