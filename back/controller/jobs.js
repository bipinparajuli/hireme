const Jobs = require("../model/jobs")
const formidable = require("formidable")
const fs = require("fs");
const Employer = require("../model/employer");


//finding job by id through parameter
exports.findJobById = (req,res,next,id) => {
  // console.log("JOBID",id);
  Jobs.findOne({where:{_id:id}}).then(data=>{
    if(!data){
        res.json({success:false,status:404,error:"No Jobs found",messege:["API is not working"]})
  }
  req.job = data;
  console.log("JOBS",req.job)
  next();

  })
  .catch(
      err=>{
        console.log(err);
        res.json
        (
            {
                success:false,
                status:400,
                error:err,
                messege:["Failed to get job by id"]
            }
        )
      }
    
)

}

//creating job
exports.createJobs = async (req,res)=>{
  const form = new formidable.IncomingForm()
  // form.keepExtensions = true;


await form.parse(req, (err, fields, files) => {


    
  if (err) return res.status(400).json({success:false,status:400,error:"Cannot Process Image",messege:["API is not working"]})

    // console.log("FILEDS",fields);


    const { name, description, budget,skills } = fields;
    // console.log(JSON.stringify(skills));

    // console.log(JSON.parse(skills));



    if (!name || !description || !budget || !skills )
    return res.status(400).json({success:false,status:400,error:"Please include all fields",messege:["API is not working"]})

    if (files.file) {

      if (files.file.size > 2097152)
        return res.status(402).json({success:false,status:402,error:"Image is too big",messege:["API is not working"]})



      let data = fs.readFileSync(files.file.filepath);
      // job.file.contentType = files.file.type;
      // console.log("FILE",files.file.size);
      if(req.profile.coin < budget){

        return res.status(402).json({success:false,status:402,error:"Insufficient coin",messege:["API is not working"]})

      }
      Employer.update({coin:req.profile.coin - budget},
        {where:{_id:req.profile._id}}).then(data=>{
          console.log("Update Success",data);
        }).catch(err=>{
          console.log("error",err);
        })  

      Jobs.create({
            name,
            description,
            budget,
            skills:skills,
            employer_no:req.profile._id,
            file:data
          }).then(data=>{
            // console.log(data,req.profile)  
          return  res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})
      
          }).catch(err=>{
            console.log(err)
          return res.status(402).json({success:false,status:402,error:"Failed to create job",messege:["API is not working"]})
      
          })

    }


   
  });
  
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

//get photo
exports.getPhoto = (req,res,next) => {
  if (req.job.file) {
    // res.set("Content-Type", req.product.photo.contentType);
    console.log("JOB");
    return res.send(req.job.file);
  }
  next();
}

//update no_of_purposal

exports.updateJob = (req,res) => {
  console.log(req.job);
  Jobs.update({no_of_purposal:req.job.no_of_purposal+1},
    {where:{_id:req.job._id}}).then(data=>{
      console.log("Update Success",data);
    }).catch(err=>{
      console.log("error",err);
    })  
}