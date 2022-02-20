const Jobs = require("../model/jobs")


//finding job by id through parameter
exports.findJobById = (req,res,next,id) => {
  console.log(id);
  Jobs.findOne({where:{_id:id}}).then(data=>{
    if(!data){
        res.json({success:false,status:404,error:"No Jobs found",messege:["API is not working"]})
  }
  req.job = data;
  // console.log("ID",data)
  next();

  })
  .catch(
      err=>
      res.json
    (
        {
            success:false,
            status:400,
            error:err,
            messege:["Failed to get job by id"]
        }
    )
)

}

//creating job
exports.createJobs = (req,res)=>{

  const {name,description,budget,skills} = req.body;

  console.log(req.profile)
    Jobs.create({
      name,
      description,
      budget,
      skills,
      employer_no:req.profile._id
    }).then(data=>{
      // console.log(data,req.profile)  
    return  res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})

    }).catch(err=>{
      console.log(err)
    return res.status(402).json({success:false,status:402,error:"Failed to create job",messege:["API is not working"]})

    })

}

//find jobs created by ecmployer
exports.getJobById = (req,res) => {
    Jobs.findAll({where:{employer_no:req.profile._id}}).then(data=>{
        res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})

    })
      .catch(err=>{
        console.log(err)
    res.status(402).json({success:false,status:402,error:"No jobs present in db",messege:["API is not working"]})

      })
}

//find all jobs 
exports.getJobs = (req,res) => {
  Jobs.findAll().then(data=>{
    res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})

  }).catch(err=>{
    console.log(err)
    res.status(402).json({success:false,status:402,error:"No jobs present in db",messege:["API is not working"]})

  })
}


//delete job by empid
exports.deleteJobs = (req,res) => {

  if(req.profile._id == req.job.employer_no )
  {
    Jobs.destroy({where:{_id:req.job._id}})
    .then(data=>{
        res.status(200).json({success:true,status:200,data:data,messege:["Deleted successfully"],})
    })
    .catch(
        err =>   
                     res.status(400).json({success:false,status:400,error: err,messege:["Failed in deleting job"]})
  
    )
  }else{
  return  res.status(400).json({success:false,status:400,error: [],messege:["Permission denied!"]})

  }


 

}