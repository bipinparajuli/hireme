const braintree = require("braintree");
const Employee = require("../model/employee");

const { handleError } = require("../utils/handleResponse");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) return handleError(res, 500, "Payment Gateway Error!");
    else return res.send({success:true,status:200,data:response,messege:["Token generated success"]})

  });
};

exports.processPayment = (req, res,next) => {
  const nonceFromTheClient = req.body.paymentMethodNonce;
  const amount = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) return handleError(res, 500, "Payment Gateway Error!");
      else{
        res.json(result);
        next()
      }  
    }
  );
};

exports.payNow = (req,res,next) =>{
  console.log(req.profile.coin,req.job.budget);
  Employee.update(
    { coin: parseInt(req.profile.coin) + req.job.budget },
    { where: { _id: req.profile._id } },
).then(data=>{
  req.payment = true
    console.log("Successfully updated",req.payment);
    next();
  //  return res.status(200).json({success:true,status:200,data:data,messege:["API is working"]})
    
}).catch(err=>{
    console.log(err);
})
}