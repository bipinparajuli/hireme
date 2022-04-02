import React,{useEffect} from "react";
import {Link,useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form,ErrorMessage } from "formik";
import { Loader } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { FaEye } from 'react-icons/fa';


// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Login/Actions";

import loginsvg from '../assets/login.png'
import Error from "../components/Error";
import Success from "../components/Success";


const LoginValidationSchema = Yup.object().shape({
  u_email: Yup.string().required("Please enter username or email"),
  u_password: Yup.string().required("Please enter a password").min(8).max(255),
});


 function Login(props) {
  let navigate = useNavigate();
  const notifications = useNotifications();
  const [hidepassword, setHidepassword] = React.useState({
    password: "",
    showPassword: false,
  });

  const { showPassword } = hidepassword;


  console.log(props);

  const {isFetching,hasError,hasSuccess,errorMessage} = props

  function handleFormSubmit(values){
    console.log(values);
    props.handleLoginRequestAction(values);

  }

  useEffect(()=>{
    if(hasSuccess){
      notifications.showNotification({
        color:"green",
        title: 'Success',
        message: "Login successfully",
      })
      props.resetStateHandler()
  navigate("/",{replace:true})
      
    }
  
    if(hasError){
      notifications.showNotification({
        color:"red",
        title: 'Error',
        message: "Login failed",
      })
      setTimeout(()=>{
        props.resetStateHandler()
      },1000)
    }
  },[hasError,hasSuccess])



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
              <div style={{}} className="flex px-4">
                <div style={{backgroundColor:"#E0CFB1"}}>
                  <img  src={loginsvg} />
                </div>
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-300 border-0">
                 
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
                        <div
                        style={{display:"flex"}}
                        >

                        <input
                            type={hidepassword.showPassword ? "text" : "password"}
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.u_password}
                          onChange={(e) =>
                            renderProps.setFieldValue("u_password", e.target.value)
                          }
                        />
                          <FaEye
                          onClick={()=>setHidepassword({...hidepassword,showPassword:!showPassword})}
                            class="eye fa-solid fa-eye-slash"
                            style={{position:"relative",right:"40"}}
                            />
                        </div>

  {/* </i> */}

                      <ErrorMessage name="u_password" render={msg => <div style={{color:"red"}}>{msg}</div>} />

                      </div>
                      <div className="flex justify-center">
                        <div 
                          style={{marginRight:"20px"}}
                         className="form-check form-check-inline">
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
                          <label className="form-check-label inline-block text-gray-800"
                           htmlFor="inlineRadio1">Employer</label>
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
                          <label className="form-check-label inline-block text-gray-800"
                           htmlFor="inlineRadio2">Employee</label>
                        </div>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease",backgroundColor:"#B6E2E1" }}

                        >
                         {isFetching? 
                         <Loader
                         style={{position:"relative",left:"200px"}}
                         />
                         : "Sign in" }
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