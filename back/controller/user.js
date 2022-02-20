const Employer = require("../model/employer")

//getuser by id gives single user with provided id in the param
exports.getUserById = (req,res,next,id) => {

    // if(err)
    // {
    // res.json({success:false,status:404,error:"No user found",messege:["API is not working"]})

    // }

    console.log("IDS",id,next)
    Employer.findOne({where:{_id:1}}).then(data=>{
        console.log("DATA",data)

        if(!data){
           return res.json({success:false,status:404,error:"No user found",messege:["API is not working"]})
    }
req.profile = data;
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
                messege:["Failed to get user by id"]
            }
        )
    )
    
}


