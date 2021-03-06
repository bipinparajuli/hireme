const express = require("express");

const {check} = require("express-validator");
const { signup,signin,changePassword, requestPasswordReset } = require("../controller/auth");
const { isSignedIn, isAuthenticate,verifyUserEmail } = require("../controller/auth");
const { getUserById, getEmployeeById, getEmployerById } = require("../controller/user");

const router = express.Router();

router.param("uId",getUserById);
router.param("employeeId",getEmployeeById);
router.param("employerId",getEmployerById);



router.post("/signup",
[
    check("u_email","Please provide valid email").isEmail(),

    check("u_password","Password should be minimum 8 character").isLength({min:8})
],
signup
)

router.post("/signin",
[
    check("u_email","Please provide valid email").isEmail(),

    check("u_password","Password should be minimum 8 character").isLength({min:8})
],
signin
)

//reset password


router.post("/change-password/:uid",isSignedIn,changePassword)
router.post('/request-password-reset',requestPasswordReset)

router.get("/verification/employee-account/:employeeId",verifyUserEmail);
router.get("/verification/employer-account/:employerId",verifyUserEmail);



module.exports = router