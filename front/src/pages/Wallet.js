import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
// import { getToken, processPayment } from "./helper/braintreeHelper";
// import { getOrderTotal, createOrder } from "./helper/OrderHelper";
import { getUserData } from "../helpers/Session";
// import { emptyCart } from "./helper/CartHelper";
import { Modal, Button, Group } from '@mantine/core';


// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Wallet/Actions";
import * as Action from "./../redux/Employer/Actions";


const BraintreeCheckout = (props) => {
  console.log(props);

  const userId = getUserData()._id;
  const userRole = getUserData().role;
  const token = getUserData().token;
  const coins = getUserData().coin;
  const [opened, setOpened] = useState(false);
  const [info, setInfo] = useState({
    clientToken: null,
    instance: {},
    loading: false,
    success: false,
    err: "",
    coin:""
  });

  const {coin} = info 


  const getClientToken = (userId, token) => {
    props.getBraintreeToken(userId)
    // getToken(userId, token).then((info) => {
    //   if (info.err) {
    //     setInfo({ ...info, err: info.err });
    //   } else {
    //     const clientToken = info.clientToken;
    //     setInfo({ clientToken });
    //   }
    // });
  };

  const onPurchase = () => {
    console.log(coin);
    let amounts = coin * 10
    console.log(amounts);
    info.instance.requestPaymentMethod().then((data) => {
      const paymentData = {
        paymentMethodNonce: data.nonce,
        amount:amounts ,
        coin:coin
      };
      props.processPayment(paymentData,userId)
        .then((response) => {
          // const orderData = {
          //   products: products,
          //   transaction_id: response.transaction.id,
          //   amount: response.transaction.amount,
          //   user: userId,
          // };
          // createOrder(userId, token, orderData)
          //   .then((data) => {
          //     if (data.err) {
          //       setInfo({
          //         ...info,
          //         loading: false,
          //         success: false,
          //         err: data.err,
          //       });
          //     } else {
          //       // emptyCart(reload);
          //     }
          //   })
          //   .catch((err) => console.log(err));
        })
        .catch((err) => {
          // setInfo({ ...info, loading: false, success: false, err: err });
        });
    });
  };

  useEffect(() => {
    getClientToken(userId, token);

    if(userRole == "Employer"){
    props.getEmployerById(userId)
    }else{
    props.getEmployeeById(userId)

    }
  }, []);

  useEffect(() => {
console.log(props);
  }, [props]);




  return (
    <>
    <section style={{height:"100vh"}} id="hero" className="flex h-full items-center">
          <div className="flex flex-col flex-1 ">
            
            <p className="text-neutral-grayish-blue text-xs lg:text-base leading-5 mb-7">
              Available Balance
            </p>
            <h1 className="text-4xl lg:text-5xl text-primary-dark-blue pb-5">
              Next generation digital banking
            </h1>
  

          </div>

          <div className="flex-1" >
          <div class="max-w-sm bg-gradient-to-r from-indigo-500 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Your Balance</p>

        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.employer.coin}</h5>
        </a>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Make Payment!"
      >
        {/* Modal content */}
        <DropIn
            options={{ authorization: props.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
           <button className="bg-slate-900 text-white py-2 px-3 mb-10 rounded" onClick={onPurchase}>
           Buy
           </button>
      </Modal>
      {/* <Group position="center"> */}
        {/* <Button >Open Modal</Button> */}
      {/* </Group> */}
        <a  href="#" onClick={() => setOpened(true)} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Pay now
            <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
       
    </div>
</div>
          </div>
    </section>
    </>
    // <div>
    //   {props.clientToken ? (
    //     <div class="flex mb-4">
    //     <div class="w-1/2 bg-gray-400 h-12">
    //         <h3>Your Available Coins</h3>
    //         <p>{props.employer.coin}</p>
    //         <h4>Enter the no of coin you want to buy</h4>
    //         <p>1 coin == 10 usd</p>
    //         <input
    //           className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
    //         onChange={e=>setInfo({...info,coin:e.target.value})}
            
    //         />
    //     </div>
    //     <div class="w-1/2 bg-gray-500 h-12">
    //     <div>
    //       <DropIn
    //         options={{ authorization: props.clientToken }}
    //         onInstance={(instance) => (info.instance = instance)}
    //       />
    //       <button className="bg-slate-900 text-white py-2 px-3 mb-10 rounded" onClick={onPurchase}>
    //         Buy
    //       </button>
    //     </div>
    //     </div>
    //   </div>
        
    //   ) : (
    //       <h1>Loading . . .</h1>
    //     // <Spinner animation="border" variant="success" />
    //   )}
    // </div>
  );
};
const mapStateToProps = (state) => ({
  ...state.Wallet,
  ...state.Employer,

});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions,...Action }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BraintreeCheckout);