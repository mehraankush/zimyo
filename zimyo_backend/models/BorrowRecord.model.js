import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const BorrowingRecord = sequelize.define('BorrowingRecord', {
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
    },
    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returnDate: {
        type: DataTypes.DATE
    },
    isReturned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    { timestamps: true }
);

export default BorrowingRecord;