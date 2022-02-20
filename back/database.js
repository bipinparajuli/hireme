
const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("hireme","root","",{
    dialect:"mysql",
    host: 'localhost',
    username: 'root',
    database:"hireme",
    password: ''
})

module.exports = sequelize