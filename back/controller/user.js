const Employer = require("../model/employer")
const Employee = require("../model/employee")

//getuser by id gives single user with provided id in the param
exports.getUserById = (req,res,next,id) => {

    // if(err)
    // {
    // res.json({success:false,status:404,error:"No user found",messege:["API is not working"]})

    // }
    console.log(next,id);

    Employer.findOne({where:{_id:id}}).then(data=>{
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

// get employer
exports.getEmployerById = (req,res,next,id) => {

    // if(err)
    // {
    // res.json({success:false,status:404,error:"No user found",messege:["API is not working"]})

    // }

    Employer.findOne({where:{_id:id}}).then(data=>{
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

//
exports.getEmployeeById = (req,res,next,id) => {

    // if(err)
    // {
    // res.json({success:false,status:404,error:"No user found",messege:["API is not working"]})

    // }

    Employee.findOne({where:{_id:id}}).then(data=>{
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

exports.updateEmployee = (req,res) => {

    console.log(req.profile.u_remarks);

    const {u_remarks} = req.body
    console.log(u_remarks);
    let new_remarks;
    if(req.profile.u_remarks==null){
         new_remarks = [u_remarks]

    }else{
     new_remarks = ([u_remarks,...req.profile.u_remarks])

    }


    Employee.update(
        { u_remarks: new_remarks },
        { where: { _id: req.profile._id } },
    ).then(data=>{
       return res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})
        
    }).catch(err=>{
        console.log(err);
    })
}

exports.updateEmployerCoin = (req,res) => {
    req.body.coin = 10
    console.log("COIN",req.body);

    
    Employer.update(
        { coin: req.body.coin + parseInt(req.profile.coin) },
        { where: { _id: req.profile._id } },
    ).then(data=>{
        console.log("Successfully updated");
    //    return res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})
        
    }).catch(err=>{
        console.log(err);
    })
}
