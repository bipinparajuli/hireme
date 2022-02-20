const {Sequelize, INTEGER, STRING, ENUM, DATE, DATEONLY, NOW, DataTypes, fn} = require("sequelize");

const sequlize = require("../database")

const Jobs = sequlize.define("Jobs",{
    _id:{
        type:INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
   name:{
       type:STRING,
       allowNull:false
   },
   description:{
       type:STRING,
       allowNull:false
   },
   employer_no:{
    type:INTEGER,
    allowNull:false,
    references:{
        model:'Employer',
        key:'_id'
    }
   },
   employee_id:{
       type:INTEGER
   },
   budget:{
       type:INTEGER,
        allowNull:false

   },
   skills:{
    type: Sequelize.JSON  
   }
}, {
    timestamps: false
})

module.exports = Jobs