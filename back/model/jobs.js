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
    // allowNull:false,
    // references:{
    //     model:'Employer',
    //     key:'_id'
    // }
   },
   employee_id:{
       type:INTEGER
   },
   budget:{
       type:INTEGER,
        allowNull:false

   },
   ongoing_percentage:{
    type:INTEGER
   },
   no_of_purposal:{
    type:INTEGER,
    defaultValue:0
   },
   skills:{
    type: Sequelize.JSON  
   },
   file:{
    type:Sequelize.BLOB('long'),
   },
}, {
    timestamps: true
})

module.exports = Jobs