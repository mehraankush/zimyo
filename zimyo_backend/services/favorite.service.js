import FavoriteModel from '../models/index.js';

class FavoriteService {
    constructor() {
        this.favoriteModel = new FavoriteModel();
    }

    async createFavorite(data) {
        return this.favoriteModel.create(data);
    }

    async getFavoriteById(id) {
        return this.favoriteModel.findById(id);
    }

    async getAllFavorites(filter) {
        return this.favoriteModel.findAll(filter);
    }

    async updateFavorite(id, data) {
        return this.favoriteModel.updateById(id, data);
    }

    async deleteFavorite(id) {
        return this.favoriteModel.deleteById(id);
    }

    async addBookToFavorite(userId, bookId) {
        return this.favoriteModel.addBook(userId, bookId);
    }

    async removeBookFromFavorite(userId, bookId) {
        return this.favoriteModel.removeBook(userId, bookId);
    }
}

export const favoriteService = new FavoriteService();