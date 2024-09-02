import { Book } from '../models/index.js'

class BookService {
    constructor() {
        this.bookModel = Book;
    }

    async createBook(data) {
        return this.bookModel.create(data);
    }

    async getBookById(id) {
        return this.bookModel.findByPk(id);
    }

    async getAllBooks(filter) {
        return this.bookModel.findAll({ where: filter });
    }

    async updateBook(id, data) {
        const book = await this.bookModel.findByPk(id);
        if (book) {
            return book.update(data);
        }
        return null;
    }

    async deleteBook(id) {
        const deleted = await this.bookModel.destroy({ where: { id } });
        return deleted > 0;
    }

    async addBookToUser(bookId, userId) {
        const book = await this.getBookById(bookId);
        if (book) {
            await book.setUser(userId);
        }
    }

    async removeBookFromUser(bookId) {
        const book = await this.getBookById(bookId);
        if (book) {
            await book.setUser(null);
        }
    }
}

export default new BookService();
