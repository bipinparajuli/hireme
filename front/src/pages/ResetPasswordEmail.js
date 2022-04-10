import React,{useEffect} from "react";
import {Link,Navigate} from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form,ErrorMessage } from "formik";
import { useNotifications } from '@mantine/notifications';

// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/ResetPassword/Actions";
import Error from "../components/Error";
import Success from "../components/Success";
import { getUserData } from "../helpers/Session";


const LoginValidationSchema = Yup.object().shape({
  u_email: Yup.string().required("Please enter email"),
  // newpassword: Yup.string().required("New password is required"),
});

const user =  getUserData()

 function ResetPasswordEmail(props) {
  const notifications = useNotifications();

  console.log(props);

  const {isFetching,hasError,hasSuccess,errorMessage} = props

  function handleFormSubmit(values){
    console.log(values);
    props.handleResetPasswordEmailRequestAction(values);

  }
  useEffect(()=>{
    if(hasSuccess){
      notifications.showNotification({
        color:"green",
        title: 'Success',
        message: "Send successfully",
      })
      props.resetStateHandler()
  // navigate("/",{replace:true})
      
    }
  
    if(hasError){
      notifications.showNotification({
        color:"red",
        title: 'Error',
        message: "failed",
      })
      setTimeout(()=>{
        props.resetStateHandler()
      },1000)
    }
  },[hasError,hasSuccess])

  return (
    <>
      <main style={{height:"100vh"}}>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url(" + require("../assets/register_bg_2.png").default + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                 
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <strong>Reset Password</strong>
                    </div>
                    <Formik
            enableReinitialize
            initialValues={{
              u_email: "",
            //   newpassword:""
            }}
            onSubmit={handleFormSubmit}
            validationSchema={LoginValidationSchema}
          >
            {(renderProps) => {
              const { values: formValues, touched, errors } = renderProps;
              return (
                <>
                  <Form>
                    {
                      hasError && (
                        <Error message={errorMessage} />
                      )
                    }
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                        Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.u_email}
                          onChange={(e) =>
                            renderProps.setFieldValue("u_email", e.target.value)
                          }
                        />
                      <ErrorMessage name="u_email" render={msg => <div style={{color:"red"}}>{msg}</div>} />
                      </div>

                      {/* <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                        New  Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="New Password"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.newpassword}
                          onChange={(e) =>
                            renderProps.setFieldValue("newpassword", e.target.value)
                          }
                        />
                      <ErrorMessage name="newpassword" render={msg => <div style={{color:"red"}}>{msg}</div>} />

                      </div> */}
                    
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                         {isFetching? "Sending..." : "Send Verification Token" }
                        </button>
                      </div>
                      </Form>
                </>
              );
            }}
          </Formik>
                  </div>
                 
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


const mapStateToProps = (state) => ({
  ...state.Reset,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordEmail);