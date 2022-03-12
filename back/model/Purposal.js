const {Sequelize, INTEGER, STRING, ENUM, DATE, DATEONLY, NOW, DataTypes, fn} = require("sequelize");

const sequlize = require("../database")

const Purposal = sequlize.define("Purposal",{
    _id:{
        type:INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
   description:{
       type:STRING,
       allowNull:false
   },
   employee_no:{
    type:INTEGER,
    // allowNull:false,
    // references:{
    //     model:'Employer',
    //     key:'_id'
    // }
   },
   job_id:{
       type:INTEGER
   },
   applied_by:{
       type:STRING
   },
   status:{
       type:STRING
   },
   ongoing_percentage:{
    type:INTEGER
   },
   job_description:{
       type:STRING
   }

  
   
}, {
    timestamps: true
})

module.exports = Purposal