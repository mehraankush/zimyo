import  { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('book_sharing_db', 'user', 'userpassword', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('All tables have been synced!');
    })
    .catch((error) => {
        console.error('Unable to sync the database:', error);
    });