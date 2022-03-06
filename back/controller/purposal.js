const Purposal = require("../model/Purposal")


//posting purposal for job
exports.postPurposal = (req,res,next) => {

    const {description} =  req.body
 
    Purposal.create({
        description,
        employee_no:req.profile._id,
        job_id:req.job._id,
        applied_by:req.profile.u_name
      }).then(data=>{
        // console.log(data,req.profile)  
        res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})
        next()
      }).catch(err=>{
        console.log(err)
      return res.status(402).json({success:false,status:402,error:"Posting purposal failed",messege:["API is not working"]})
  
      })

}

exports.getPuposalByJob = (req,res) => {
    Purposal.findAll({where:{job_id:req.job._id}}).then(data=>{
        console.log("DATA",data);
        if(!data){
           return res.json({success:false,status:404,error:"No Jobs found",messege:["API is not working"]})
      }
      return  res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})

    
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

exports.getPuposalByEmployee = (req,res) => {
    Purposal.findAll({where:{employee_no:req.profile._id}}).then(data=>{
        if(!data){
           return res.json({success:false,status:404,error:"No Jobs found",messege:["API is not working"]})
      }
      return  res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})

    
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