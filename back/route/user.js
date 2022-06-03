const express = require('express');

const { isSignedIn,isAdmin,isAuthenticate} = require('../controller/auth');

const router = express.Router();

const {deleteEmployee,deleteEmployer,getUserById,getAllUser,createUser,updateUser,deleteUser,getSingleUserByid,getUserByName, getEmployeeById, updateEmployee, getEmployerById, getEmployee, getEmployer} = require("../controller/user")


router.param("employeeid",getEmployeeById);
router.param("employerid",getEmployerById);

// router.param("username",getUserByName);

// router.get("/user/getAllUser",getAllUser);

router.get("/getEmployee/:employeeid",isSignedIn,(req,res)=>{
    if (req.profile){
        req.profile.u_password = undefined
        req.profile.u_email = undefined
        req.profile.status = undefined


    return  res.status(200).json({success:true,status:200,data:req.profile,messege:["API is working"]})

    }else{

        return  res.status(402).json({success:false,status:402,error:"Not found",messege:["API is not working"]})
    }


});

router.get("/getEmployer/:employerid",isSignedIn,(req,res)=>{
    if (req.profile){
        req.profile.u_password = undefined
        req.profile.u_email = undefined
        req.profile.status = undefined


    return  res.status(200).json({success:true,status:200,data:req.profile,messege:["API is working"]})

    }else{

        return  res.status(402).json({success:false,status:402,error:"Not found",messege:["API is not working"]})
    }


});

router.get("/getemployee",getEmployee)
router.get("/getemployer",getEmployer)


router.put("/updateEmployee/:employeeid",isSignedIn,updateEmployee)


// router.post("/user/createuser/:username",isSignedIn,isAuthenticate ,isAdmin,createUser);

// router.put("/user/updateuser/:username/:userid",isSignedIn,isAuthenticate,isAdmin,updateUser)

router.delete("/deleteemployee/:employeeid",deleteEmployee)
router.delete("/deleteemployer/:employerid",deleteEmployer)


module.exports = router