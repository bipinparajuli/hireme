import React from "react";
import {Link,Navigate} from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form,ErrorMessage } from "formik";

// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Login/Actions";


import Error from "../components/Error";
import Success from "../components/Success";


const LoginValidationSchema = Yup.object().shape({
  u_email: Yup.string().required("Please enter username or email"),
  u_password: Yup.string().required("Please enter a password").min(8).max(255),
});


 function Login(props) {

  console.log(props);

  const {isFetching,hasError,hasSuccess,errorMessage} = props

  function handleFormSubmit(values){
    console.log(values);
    props.handleLoginRequestAction(values);

  }
  if(hasSuccess){
    return (
      <Navigate to="/" />
    )
  }

  if(hasError){
    setTimeout(()=>{
      props.resetStateHandler()
    },1000)
  }

  console.log(isFetching);

  return (
    <>
      <main>
        <section className="absolute w-full h-full ">
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
                  {/* <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../assets/github.svg").default}
                        />
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../assets/google.svg").default}
                        />
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div> */}
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <strong>Sign in</strong>
                    </div>
                    <Formik
            enableReinitialize
            initialValues={{
              u_email: "",
              u_role:"",
              u_password: "",
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

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.u_password}
                          onChange={(e) =>
                            renderProps.setFieldValue("u_password", e.target.value)
                          }
                        />
                      <ErrorMessage name="u_password" render={msg => <div style={{color:"red"}}>{msg}</div>} />

                      </div>
                      <div className="flex justify-center">
                        <div className="form-check form-check-inline">
                          <input 
                          className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                           type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                           value="Employer"
                           onChange={(e) =>
                            renderProps.setFieldValue("u_role", e.target.value)
                          }

                            />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Employer</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                           className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                           type="radio" 
                           name="inlineRadioOptions" 
                           id="inlineRadio2" 
                           value="Employee"
                           onChange={(e) =>
                            renderProps.setFieldValue("u_role", e.target.value)
                          }
                           
                           />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio20">Employee</label>
                        </div>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                         {isFetching? "Signing . . ." : "Sign in" }
                        </button>
                      </div>
                      </Form>
                </>
              );
            }}
          </Formik>
          <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <Link
                      to="/resetpassword"
                      // onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small style={{color:"red"}} >Forgot password?</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link
                      to="/register"
                      // onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small  style={{color:"red"}}>Create new account</small>
                    </Link>
                  </div>
                </div>
        
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
  ...state.Login,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);