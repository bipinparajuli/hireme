//SEND VERIFICATION EMAIL
const nodemailer = require("nodemailer");

const emailService = require("../utils/nodemailer");


exports.sendVerificationEmail =  async (email,baseurl,id,u_role) => {
    
        try {
            // const user = req.profile;
               
                const data = {
                    from: process.env.EMAIL_USERNAME,
                    to: email,
                    subject: "Your Activation Link for YOUR APP",
                    text: `Please use the following link to activate your account on YOUR APP: ${baseurl}/auth/verification/${u_role =="Employee"?"employee":"employer"}-account/${id}`,
                    html: `<p>Please use the following link to activate your account on YOUR APP: <strong><a href="${baseurl}/api/verification/${u_role =="Employee"?"employee":"employer"}-account/${id}" target="_blank">link</a></strong></p>`,
                   };
               
                
               await emailService.sendMail(data, function(err, data) {
                    if(err) {
                        console.log(err,'Error Occurs');
                    } else {
                        console.log('Email sent successfully');
                    }
                });
  
        } catch (err) {
            console.log("Error on /api/auth/get-activation-email: ", err);
        }
    }
  
  // #route:  GET /verification/verify-account
  // #desc:   Verify user's email address
  // #access: Public
  
  exports.verifyUserEmail=  async (req, res) => {
        try {
          console.log(req.profile);
  
          const user = await User.findById(req.profile._id);
            // const response = await Code.findOne({
            //     email: user.email,
            //     code: req.params.secretCode,
            // });
            if (!user) {
                res.sendStatus(401);
            } else {
                await User.updateOne(
                    { email: user.email },
                    { status: "active" }
                );
                // await Code.deleteMany({ email: user.email });
  
                let redirectPath;
  
                if (process.env.NODE_ENV == "production") {
                    redirectPath = `${req.protocol}://${req.get(
                        "host"
                    )}account/verified`;
                } else {
                    redirectPath = `http://127.0.0.1:8080/account/verified`;
                }
  
                res.redirect(redirectPath);
            }
        } catch (err) {
            console.log(
                "Error on /api/auth/verification/verify-account: ",
                err
            );
            res.sendStatus(500);
        }
    }

  
    exports.sendMail = async mailOptions => {
        console.log(mailOptions);
        try {
            const { messageId } = await emailService.sendMail({
                from: process.env.EMAIL_USERNAME,
                ...mailOptions,
            })
            console.info(`Mail sent: ${messageId}`)
        } catch (error) {
            console.error(error)
        }
    }