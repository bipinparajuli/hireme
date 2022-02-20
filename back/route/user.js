const express = require('express');

const { isSignedIn,isAdmin,isAuthenticate} = require('../controller/auth');

const router = express.Router();

const {getUserById,getAllUser,createUser,updateUser,deleteUser,getSingleUserByid,getUserByName} = require("../controller/user")

router.param("userid",getUserById);

router.param("username",getUserByName);

router.get("/user/getAllUser",getAllUser);

router.get("/user/getUser/:userid",isSignedIn,getSingleUserByid);

router.post("/user/createuser/:username",isSignedIn,isAuthenticate ,isAdmin,createUser);

router.put("/user/updateuser/:username/:userid",isSignedIn,isAuthenticate,isAdmin,updateUser)

router.delete("/user/deleteuser/:username/:userid",isSignedIn,isAuthenticate,isAdmin,deleteUser)

module.exports = router