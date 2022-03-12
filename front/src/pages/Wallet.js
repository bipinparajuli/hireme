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

const BraintreeCheckout = (props) => {
  console.log(props);

  const userId = getUserData()._id;
  const token = getUserData().token;
  const [info, setInfo] = useState({
    clientToken: null,
    instance: {},
    loading: false,
    success: false,
    err: "",
  });


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
    console.log(info.instance);
    info.instance.requestPaymentMethod().then((data) => {
      const paymentData = {
        paymentMethodNonce: data.nonce,
        amount: 10,
      };
      props.processPayment(paymentData,userId )
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
  }, []);

  return (
    <div>
      {props.clientToken ? (
        <div class="flex mb-4">
        <div class="w-1/2 bg-gray-400 h-12">
            <h3>Your Available Coins</h3>
        </div>
        <div class="w-1/2 bg-gray-500 h-12">
        <div>
          <DropIn
            options={{ authorization: props.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 mb-10 rounded" onClick={onPurchase}>
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BraintreeCheckout);