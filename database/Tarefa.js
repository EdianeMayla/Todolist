const Sequelize = require('sequelize');
const connection = require('./database');

const Tarefa = connection.define('tarefas',{
  titulo:{
    type: Sequelize.STRING,
    allowNull: false
  },
});

//Tarefa.sync({force: false}).then(() => {});

module.exports = Tarefa;