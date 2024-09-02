import Book from './Book.model.js';
import User from './User.model.js'
import BorrowRecord from './BorrowRecord.model.js';
import Favorites from './Favorite.model.js';

import { sequelize } from '../config/db.js';

User.hasMany(Book, { as: 'addedBooks', foreignKey: 'addedByUserId' });
Book.belongsTo(User, { as: 'addedByUser', foreignKey: 'addedByUserId' });

User.hasMany(BorrowRecord, { as: 'borrowedBooks', foreignKey: 'borrowerId' });
BorrowRecord.belongsTo(User, { as: 'borrower', foreignKey: 'borrowerId' });

Book.hasMany(BorrowRecord, { as: 'borrowRecords', foreignKey: 'bookId' });
BorrowRecord.belongsTo(Book, { as: 'book', foreignKey: 'bookId' });


User.hasMany(Favorites, { as: 'favoriteBooks', foreignKey: 'userId' });
Favorites.belongsTo(User, { as: 'user', foreignKey: 'userId' });

Book.hasMany(Favorites, { as: 'favoritedByUsers', foreignKey: 'bookId' });
Favorites.belongsTo(Book, { as: 'book', foreignKey: 'bookId' });

export {
    sequelize,
    User,
    Book,
    BorrowRecord,
    Favorites
};
