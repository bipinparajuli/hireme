const { isSignedIn, isAuthenticate } = require("../controller/auth")
const { createJobs,getJobs, findJobById,getJobById,deleteJobs,getPhoto, updateJob } = require("../controller/jobs")
const { postPurposal, getPuposalByJob, getPuposalByEmployee, getPurposalById, updatePurposalStatus, updateOngoingPercentage } = require("../controller/purposal")
const {getUserById, getEmployeeById} = require("../controller/user")

const router = require("express").Router()



router.param("uId",getUserById)

router.param("jId",findJobById)

router.param("eId",getEmployeeById)

router.param("pId",getPurposalById)



router.post("/postpurposal/:eId/:jId",isSignedIn,postPurposal,updateJob)


router.get("/getpurposalbyjob/:jId",getPuposalByJob)

router.post("/updatepurposalstatus/:jId/:pId",updatePurposalStatus)

router.post("/updateongoingpercentage/:jId/:pId",updateOngoingPercentage)

router.get("/getpurposalbyemployee/:uId",getPuposalByEmployee)





module.exports = router