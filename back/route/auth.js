const express = require("express");

const {check} = require("express-validator");
const { signup,signin,changePassword } = require("../controller/auth");
const { isSignedIn, isAuthenticate } = require("../controller/auth");
const { getUserById } = require("../controller/user");

const router = express.Router();

router.param("uId",getUserById);


router.post("/signup",
[
    check("u_email","Please provide valid email").isEmail(),

    check("password","Password should be minimum 8 character").isLength({min:8})
],
signup
)

router.post("/signin",
[
    check("u_email","Please provide valid email").isEmail(),

    check("password","Password should be minimum 8 character").isLength({min:8})
],
signin
)

//reset password

router.post("/change-password/:uId",isSignedIn,changePassword)


module.exports = router