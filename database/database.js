const Sequelize = require('sequelize');

const connection = new Sequelize('todolist', 'root', '123456',{
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection;