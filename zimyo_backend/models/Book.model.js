import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    genre: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['Fiction', 'Non-fiction', 'Science', 'Biography', 'Fantasy']]
        }
    },
    publicationYear: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1450, // publication era started in 1450
            max: new Date().getFullYear()
        }
    },
    coverImagePath: {
        type: DataTypes.STRING
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

}, { tableName: 'Book' },
    { timestamps: true });

export default Book;