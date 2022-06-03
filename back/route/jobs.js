const { isSignedIn, isAuthenticate } = require("../controller/auth")
const { payNow } = require("../controller/braintree")
const { createJobs,getJobs, findJobById,getJobById,deleteJobs,getPhoto, searchJob } = require("../controller/jobs")
const { getPurposalById, updatePurposalStatus } = require("../controller/purposal")
const {getUserById, getEmployeeById} = require("../controller/user")

const router = require("express").Router()

router.param("employeeId",getEmployeeById)

router.param("uId",getUserById)

router.param("jId",findJobById)


router.param("pId",getPurposalById)



router.post("/createjob/:uId",isSignedIn,createJobs)

router.post("/paynow/:employeeId/:jId/:pId",isSignedIn,payNow,updatePurposalStatus)

router.get("/getjob/:uId",getJobById)

router.get("/getjobs",getJobs)

router.post("/searchjob",searchJob)


router.get("/getphoto/:jId",getPhoto)

router.delete("/deletejob/:uId/:jId",deleteJobs)



module.exports = router