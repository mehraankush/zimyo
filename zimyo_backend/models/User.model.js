import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, { tableName: 'User' },
    {
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    },
    { timestamps: true });

export default User;