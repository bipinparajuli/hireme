import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
// import { getToken, processPayment } from "./helper/braintreeHelper";
// import { getOrderTotal, createOrder } from "./helper/OrderHelper";
import { getUserData } from "../helpers/Session";
// import { emptyCart } from "./helper/CartHelper";


// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Wallet/Actions";
import * as Action from "./../redux/Employer/Actions";


const BraintreeCheckout = (props) => {
  console.log(props);

  const userId = getUserData()._id;
  const token = getUserData().token;
  const coins = getUserData().coin;

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
    props.getEmployerById(userId)
  }, []);

  useEffect(() => {
console.log(props);
  }, [props]);
  return (
    <div>
      {props.clientToken ? (
        <div class="flex mb-4">
        <div class="w-1/2 bg-gray-400 h-12">
            <h3>Your Available Coins</h3>
            <p>{props.employer.coin}</p>
            <h4>Enter the no of coin you want to buy</h4>
            <p>1 coin == 10 usd</p>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
            onChange={e=>setInfo({...info,coin:e.target.value})}
            
            />
        </div>
        <div class="w-1/2 bg-gray-500 h-12">
        <div>
          <DropIn
            options={{ authorization: props.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className="bg-slate-900 text-white py-2 px-3 mb-10 rounded" onClick={onPurchase}>
            Buy
          </button>
        </div>
        </div>
      </div>
        
      ) : (
          <h1>Loading . . .</h1>
        // <Spinner animation="border" variant="success" />
      )}
    </div>
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