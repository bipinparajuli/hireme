const {Sequelize, INTEGER, STRING, ENUM, DATE, DATEONLY, NOW, DataTypes, fn} = require("sequelize");

const sequlize = require("../database")

const Employee = sequlize.define("Employee",{
    _id:{
        type:INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    // u_fname:{
    //     type:STRING
    //     ,
    //     allowNull:false
    // },
    // u_lname:{
    //     type:STRING
    //     ,
    //     allowNull:false
    // },
    u_name:{
        type:STRING,
        allowNull:false
    },
    u_password:
    {
        type:STRING,
        allowNull:false
    }
    // ,
    // u_status:{
    //     type:ENUM("Registered","Unregistered"),
    //     defaultValue:"Registered"
    // },
    // u_lastlogin:{
    //     type: Sequelize.DATE, 
    //     defaultValue: Sequelize.NOW,
    //     allowNull:false
    // },
    
    ,u_role:{
        type:ENUM("Admin","Employer","Employee"),
        defaultValue:"Employee"
    
    },
    u_email:{
        type:STRING,
        allowNull:false
    },
    // u_contact:{
    //     type:STRING,
    //     // allowNull:false
    // },
    u_remarks:{
        type:STRING,
        // allowNull:false
    },
    // u_isadded:{
    //     type: Sequelize.DATE, 
    //     defaultValue: Sequelize.NOW,
    //     // allowNull:false
    // },
    u_image:{
        type:STRING
    },
    // u_isupdated:{
    //     type:DATE
    // },
    // u_isdeactivated:{
    //     type:INTEGER,
    //     defaultValue:"1"
    
    // },
    // u_isdeleted:{
    //     type:INTEGER,
    //     defaultValue:"1"

    // }
}, {
    timestamps: false
})

module.exports = Employee