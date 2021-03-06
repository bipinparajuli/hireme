import React from "react";
import * as Yup from 'yup'
import { Formik, Form,ErrorMessage,FieldArray,Field } from "formik";
import { useNotifications } from '@mantine/notifications';
import { FaEye } from 'react-icons/fa';
import { Loader } from '@mantine/core';


// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Register/Actions";

import loginsvg from '../assets/login.png'

import Error from "../components/Error";
import Success from "../components/Success";


const LoginValidationSchema = Yup.object().shape({
  u_name: Yup.string().required("Please enter username"),
  u_email: Yup.string().required("Please enter email"),
  u_password: Yup.string().required("Please enter a password").min(8).max(255),
  u_address: Yup.string().required("Please enter address"),
  f_name: Yup.string().required("Please enter first name"),
  l_name: Yup.string().required("Please enter last name"),
  phone: Yup.number().required("Please enter phone number"),

});


 function Register(props) {
   console.log(props)
  const notifications = useNotifications();


   const {isFetching,hasSuccess,hasError,errorMessage,resetRegisterStateHandler} = props

  function handleFormSubmit(values,{resetForm}){
    console.log(values);
    props.handleRegisterRequestAction(values);
    resetForm()

  }

  if(hasSuccess){
    notifications.showNotification({
      color:"red",
      title: 'Success',
      message: "Registered Successs",
    })
    setTimeout(()=>{
      resetRegisterStateHandler()
    },1000)
  }
  const [hidepassword, setHidepassword] = React.useState({
    password: "",
    showPassword: false,
  });

  const {showPassword} = hidepassword

  return (
    <>
      {/* <main > */}
        <section className="mb-6 w-full">
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
            <div className="flex content-center items-center justify-center h-full mt-4">
              <div style={{width:"70%"}} className="flex px-4">

              <div style={{backgroundColor:"#E0CFB1",display:"flex",alignItems:"center"}}>
                  <img  src={loginsvg} alt="" />
                </div>

                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-300 border-0">
                 
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      {
                        hasError && (
                          <Error message={errorMessage} />
                        )
                      }
                      {
                        hasSuccess && (
                          <Success />
                        )
                      }
                      <strong>Sign Up</strong>
                    </div>
                    <Formik
            enableReinitialize
            initialValues={{
              u_name:"",
              f_name:"",
              l_name:"",
              phone:"",
              u_email: "",
              u_role:"",
              u_password: "",
              u_address:"",
              skills: [
                {
                  // skill: "",
                }
              ]
            }}
            onSubmit={handleFormSubmit}
            validationSchema={LoginValidationSchema}
          >
            {(renderProps) => {
              const { values: formValues, touched, errors } = renderProps;
              return (
                <>
                  <Form>
                  <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="User name"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.u_name}
                          onChange={(e) =>
                            renderProps.setFieldValue("u_name", e.target.value)
                          }
                        />
                      <ErrorMessage name="u_name" render={msg => <div style={{color:"red"}}>{msg}</div>} />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Firstname
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="First Name"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.f_name}
                          onChange={(e) =>
                            renderProps.setFieldValue("f_name", e.target.value)
                          }
                        />
                      <ErrorMessage name="f_name" render={msg => <div style={{color:"red"}}>{msg}</div>} />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Lastname
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Last name"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.l_name}
                          onChange={(e) =>
                            renderProps.setFieldValue("l_name", e.target.value)
                          }
                        />
                      <ErrorMessage name="l_name" render={msg => <div style={{color:"red"}}>{msg}</div>} />
                      </div>

                          {/* address */}
                          <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="eg: Kathmandu Nepal"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.u_address}
                          onChange={(e) =>
                            renderProps.setFieldValue("u_address", e.target.value)
                          }
                        />
                      <ErrorMessage name="u_address" render={msg => <div style={{color:"red"}}>{msg}</div>} />
                      </div>

                           {/* phone */}
                           <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="98********"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.phone}
                          onChange={(e) =>
                            renderProps.setFieldValue("phone", e.target.value)
                          }
                        />
                      <ErrorMessage name="phone" render={msg => <div style={{color:"red"}}>{msg}</div>} />
                      </div>
                      

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
                      <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                      <div className="relative w-full mb-3 flex">
                       
                        <input
                          type={showPassword ? "text" : "password"}
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
                            style={{position:"relative",right:"40",top:"15"}}
                            />
                      <ErrorMessage name="u_password" render={msg => <div style={{color:"red"}}>{msg}</div>} />

                      </div>

                      {
                       formValues.u_role =="Employee"?(
                              <>
                              <h6>Add Skills</h6>
        <FieldArray
          name="skills"
          render={(arrayHelpers) => (
            <div>
              {formValues.skills && formValues.skills.length > 0 ? (
                formValues.skills.map((item, index) => (
                  <div key={index}>
                    <Field
                      // component={TextField}
                      // className="mb-4 mr-2 border"
                      className="border-5 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      variant="outlined"
                      fullWidth
                      label="skill"
                      placeholder="eg. react, angular"
                      name={`skills.${index}.skill`}
                    />
                   
                    <button
                    className="mr-4"
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove an item from the list
                    >
                      -
                    </button>
                    <button
                    className="ml-4"
                      type="button"
                      onClick={() =>
                        arrayHelpers.insert(index, { skill: "" })
                      } // insert an empty item at a position
                    >
                      +
                    </button>
                  </div>
                ))
              ) : (
                <button
                  type="button"
                  onClick={() => arrayHelpers.push({ skill: "" })}
                >
                  {/* show this when user has removed all items from the list */}
                  Add item
                </button>
              )}
            </div>
          )}
        />

            <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Describe Yourself
                        </label>
                        <textarea
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="talk about past experience here"
                          style={{ transition: "all .15s ease" }}
                          value={formValues.u_about}
                          onChange={(e) =>
                            renderProps.setFieldValue("u_about", e.target.value)
                          }
                        />
                      <ErrorMessage name="u_about" render={msg => <div style={{color:"red"}}>{msg}</div>} />
                      </div>


                              </>
                        ):
                        null
                      }
                      <div className="flex justify-center">
                        <div className="form-check form-check-inline mr-4">
                          <input 
                          className="form-check-input form-check-input rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                           className="form-check-input form-check-input rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                          style={{ transition: "all .15s ease",backgroundColor:"#B6E2E1" }}
                        >
                          {isFetching?
                           <Loader
                           style={{position:"relative",left:"200px"}}
                           /> 
                          
                          : "Sign Up"}
                        </button>
                      </div>
                      </Form>
                </>
              );
            }}
          </Formik>
                  </div>
                </div>
                {/* <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      {/* </main> */}
    </>
  );
}


const mapStateToProps = (state) => ({
  ...state.Register,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);