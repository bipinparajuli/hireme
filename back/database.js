
const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("test","root","",{
    dialect:"mysql",
    host: 'localhost',
    username: 'root',
    database:"test",
    password: ''
})
console.log("test");
module.exports = sequelize