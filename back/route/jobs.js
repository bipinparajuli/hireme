const { isSignedIn, isAuthenticate } = require("../controller/auth")
const { createJobs,getJobs, findJobById,getJobById,deleteJobs } = require("../controller/jobs")
const {getUserById} = require("../controller/user")

const router = require("express").Router()



router.param("uId",getUserById)

router.param("jId",findJobById)


router.post("/createjob/:uId",isSignedIn,createJobs)

router.get("/getjob/:uId",getJobById)

router.get("/getjobs",getJobs)

router.delete("/deletejob/:uId/:jId",deleteJobs)



module.exports = router