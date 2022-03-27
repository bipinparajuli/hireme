const Employee = require("../model/employee")
const Employer = require("../model/employer")

const bcrypt = require("bcrypt")

const {validationResult} = require('express-validator');

const jwt = require("jsonwebtoken")

const expressJWT = require("express-jwt");
const { matchPassword } = require("../utils/utils");
const { sendVerificationEmail } = require("../utils/commonFunction");


exports.signup = async (req,res) => {

    console.log(req.body)
const {u_name,u_email,u_password,u_role,u_address,skills,u_about,f_name,l_name,phone} = req.body
const baseurl = req.protocol + "://" + req.get("host");


const existingEmployee = await Employee.findOne({where:{u_email:u_email}})
const existingEmployer = await Employer.findOne({where:{u_email:u_email}})

console.log(existingEmployee,existingEmployer);

if(existingEmployee || existingEmployer)
{
    res.status(400).json({success:false,status:400,error:"Email already in use",messege:["API is not working"]})
}
else{
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({
            status:400,success:false,error:error.array()[0].msg,messege:["API is not working"]
        })
    }

    bcrypt.hash(u_password,17,(err,hash)=>{
if(err)
{
    res.json({success:false,status:404,error:err,messege:["Failed in hasing password"]})
}

    if(u_role == "Employee"){
        Employee.create(
            {
                u_name:u_name,
                u_email:u_email,
                u_password:hash,
                u_address,
                skills,
                u_about,
                f_name,
                l_name,
                phone

            }) .then( data => 
                {
                    data.u_password=undefined
                    sendVerificationEmail(data.u_email,baseurl,data._id,u_role)
                    res.json({success:true,status:200,data:data,messege:["API is working"]})
    
                }
                )
            .catch(data=> res.status(400).json({success:false,status:400,error:data,messege:["Signup failed"]}))
           
    }else{
        Employer.create(
            {
                u_name:u_name,
                u_email:u_email,
                u_password:hash,f_name,
                l_name,
                phone

            }).then( data => 
                {
                    data.u_password=undefined
                    sendVerificationEmail(data.u_email,baseurl,data._id,u_role)
                    res.json({success:true,status:200,data:data,messege:["API is working"]})
    
                }
                )
            .catch(data=> res.status(400).json({success:false,status:400,error:data,messege:["Signup failed"]}))
    
    }

            
    })

}

}

exports.signin = async (req,res)=>{

    const {u_email,u_password,u_role} = req.body

    const errors = await validationResult(req)

    console.log(errors);

    if(!errors.isEmpty())
    {
       return res.status(400).json({
        success:false,status:400,error:errors.array()[0].msg,messege:["API is not working"]
        })
    }
    let user;
    if(u_role == "Employer"){
         user =await Employer.findOne({where:{u_email:u_email}})

    }else{
    user =await Employee.findOne({where:{u_email:u_email}})
    }
   

    if(user){

        if(user.status !== "active"){
            return res.json({
              success:false,
              error: "Please verify you email"
            });
      
          }

        bcrypt.compare(u_password,user.u_password,(err,result)=>{
                            if(err || !result)
                            {
                               return res.json({success:false,status:403,error:"Password don't match",messege:["Password don't match"]})
                            }
            
                            const token = jwt.sign({name:user.u_name},process.env.SECRET)
                            
                            res.cookie("token",token)
            
                            const {u_name,u_email,_id,u_role,coin} =user
            
                           return res.send({success:true,status:200,data:{u_name,u_email,_id,u_role,coin,token},messege:["Successfully signin"]})
                        })

    }else{
       return res.status(403).json({
        success:false,
        status:403,
        error:"No matching found on db",
        messege:["API is not working"]})
    }

}

exports.isSignedIn = expressJWT({
    secret:process.env.SECRET,
    userProperty:"auth",
    algorithms:['sha1', 'RS256', 'HS256']
})

exports.signOut = (req,res) => {
res.clearCookie("token");
res.json({messege:"Signout successfully"})
}

exports.isAdmin = (req,res,next) => {

    if(!req.profile.u_role == "Admin")
    {
        res.status(401).json({success:false,success:401,error:"Acess denied",messege:["API is not working"]})
    }
    next();

}
exports.isSuperAdmin = (req,res,next) => {

    if(!req.profile.u_role == "Superadmin")
    {
        res.status(401).json({success:false,success:401,error:"Acess denied",messege:["API is not working"]})
    }
    next();

}
exports.isUser = (req,res,next) => {

    if(!req.profile.u_role == "User")
    {
        res.status(401).json({success:false,success:401,error:"Acess denied",messege:["API is not working"]})
    }
    next();

}

exports.isAuthenticate = (req,res,next) => {

    console.log("AUTH",req.auth,req.profile)

    const check = req.profile && req.auth && req.profile.u_name == req.auth.name

    if(!check)
    {
        res.status(401).json({success:false,status:401,error:"Not an authenticate user",messege:["API is not working"]})

    }

    next();
}

//CHANGE PASSWORD
exports.changePassword = async (req,res) => {

    const {password,newpassword} =  req.body
    console.log(req.profile)

    const result = await matchPassword(password,req.profile.u_password) 

    console.log(result);
    if(result){
        const hash = await bcrypt.hash(newpassword,17)

    if(req.profile.u_role == "Employee"){
        Employee.update({u_password:hash},
            {where:{_id:req.profile._id}}
            
            )
        .then(data=>{
            return res.send({success:true,status:200,data:{data},messege:["Password updated successfully"]})

        }).catch(error=>{
           return res.status(401).json({success:false,success:401,error:"Error on updating password",messege:["API is not working"]})

        })
    }else{
        Employer.update({u_password:hash},
            {where:{_id:req.profile._id}}
            
            )
        .then(data=>{
            return res.send({success:true,status:200,data:{data},messege:["Password updated successfully"]})

        }).catch(error=>{
            console.log("ERROR",error);
           return res.status(401).json({success:false,success:401,error:"Error on updating password",messege:["API is not working"]})

        })
    }
    }else{
       
        return res.status(400).json({
            success:false,status:400,error:"Password don't match",messege:["API is not working"]
            })
    }

    

    
}


exports.verifyUserEmail=  async (req, res) => {
    try {
      console.log("HI",req.profile);

    let user;

      if(req.profile.u_role == "Employer"){
       user = await Employer.findOne({where:{_id:req.profile._id}});

       if (!user) {
        res.sendStatus(401);
    } else {
        await Employer.update(
            { status: "active" },
            { where: { u_email: user.u_email } },
        )
        // await Code.deleteMany({ email: user.email });

        let redirectPath;

        if (process.env.NODE_ENV == "production") {
            redirectPath = `${req.protocol}://${req.get(
                "host"
            )}account/verified`;
        } else {
          redirectPath = `http://localhost:3000/login`;
            // redirectPath = `http://127.0.0.1:8080/account/verified`;
        }

        res.redirect(redirectPath);
    }

      }else{
       user = await Employee.findOne({where:{_id:req.profile._id}});

       if (!user) {
        res.sendStatus(401);
    } else {
        await Employee.update(
            { status: "active" },
            { where: { u_email: user.u_email } },
        );
        // await Code.deleteMany({ email: user.email });

        let redirectPath;

        if (process.env.NODE_ENV == "production") {
            redirectPath = `${req.protocol}://${req.get(
                "host"
            )}account/verified`;
        } else {
          redirectPath = `http://localhost:3000/user/${user._id}`;
            // redirectPath = `http://127.0.0.1:8080/account/verified`;
        }

        res.redirect(redirectPath);
    }

      }

        // const response = await Code.findOne({
        //     email: user.email,
        //     code: req.params.secretCode,
        // });
       
    } catch (err) {
        console.log(
            "Error on /api/auth/verification/verify-account: ",
            err
        );
        res.sendStatus(500);
    }
}
