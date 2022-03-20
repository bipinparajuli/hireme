const Jobs = require("../model/jobs")
const Purposal = require("../model/Purposal")


//posting purposal for job
exports.postPurposal = (req,res,next) => {

    const {description,job_description} =  req.body
 
    console.log(description,job_description);

    Purposal.create({
        description,
        job_description,
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

//get purposal by id
exports.getPurposalById = (req,res,next,id) => {

   
    // console.log(next,id);

    Purposal.findOne({where:{_id:id}}).then(data=>{
        // console.log("DsATA",data)

        if(!data){
           return res.json({success:false,status:404,error:"No Purposal found",messege:["API is not working"]})
    }
req.purposal = data;
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
                messege:["Failed to get purposal by id"]
            }
        )
    )
    
}

exports.updatePurposalStatus = (req,res) => {

    console.log(req.job);

    Purposal.destroy( {where: {
        job_id: req.job._id,
        status: 'pending'
      }})

    Purposal.update({status:"active"},
        {where:{_id:req.purposal._id}}).then(data=>{
          console.log("Update Success",data);
        return res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})

        }).catch(err=>{
          console.log("error",err);
          return res.json({success:false,status:404,error:err,messege:["API is not working"]})

        })  
}

//UPDATE ONGOING PERCENTAGE
exports.updateOngoingPercentage = (req,res) => {

    console.log(req.job);

    Jobs.update({ongoing_percentage:req.body.ongoing_percentage},
        {where:{_id:req.job._id}}).then(data=>{
          console.log("Update Success",data);
        // return res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})

        }).catch(err=>{
          console.log("error",err);
        //   return res.json({success:false,status:404,error:err,messege:["API is not working"]})

        })  

    Purposal.update({ongoing_percentage:req.body.ongoing_percentage},
        {where:{_id:req.purposal._id}}).then(data=>{
          console.log("Update Success",data);
        return res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})

        }).catch(err=>{
          console.log("error",err);
          return res.json({success:false,status:404,error:err,messege:["API is not working"]})

        })  
}