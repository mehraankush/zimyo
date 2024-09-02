import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    bookId: {
        type: DataTypes.UUID,
        references: {
            model: 'Book',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, { timestamps: true });

export default Favorite;