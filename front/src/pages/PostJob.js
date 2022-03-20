import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form,ErrorMessage,FieldArray,Field } from "formik";
import { useNotifications } from '@mantine/notifications';

// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Jobs/Actions";
import Error from "../components/Error";
import Success from "../components/Success";
import { getUserData } from '../helpers/Session';


const JobValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter job title"),
  description: Yup.string().required("Please enter a description").min(8).max(255),
  budget:Yup.number().required("Budget is required"),
  skills:Yup.array().required("Skills are required")

});

const user =  getUserData()

const PostJob = (props) => {
  const notifications = useNotifications();

  const {isFetching,hasError,hasSuccess} = props;

  function handleFormSubmit(values,{resetForm}){
    console.log(values);
    let formData = new FormData()
    for (let value in values) {
      if(value == "skills" ){
        console.log(JSON.stringify(values[value]));
        formData.append(value,JSON.stringify(values[value]));
      }else{
      formData.append(value, values[value]);
      }
    }
    props.handleJobRequestAction(formData,user._id)
    resetForm()

  }

  useEffect(()=>{
    if(hasSuccess){
      props.resetStateHandler()
      notifications.showNotification({
        color:"green",
        title: 'Success',
        message: "Job posted successfully",
      })
    }
    if(hasError){
      notifications.showNotification({
        color:"red",
        title: 'Error',
        message: props.errorMessage,
      })
      props.resetStateHandler()
      // return <Error message="Failed to post job" />
    }

  },[hasError,hasSuccess])

  console.log(hasSuccess,hasError);

  return (
    <main className="main bg-white px-6 md:px-12 py-6 mb-10">
    <div style={{display:"flex",justifyContent:"center"}} className="w-full max-w-xl mx-auto px-6 border border-current">
    <Formik
            enableReinitialize
            initialValues={{
              name: "",
              description:"",
              budget: "",
              file:null,
              skills: [
                {
                  // skill: "",
                }
              ]
            }}
            onSubmit={handleFormSubmit}
            validationSchema={JobValidationSchema}
          >
            {(renderProps) => {
              const { values: formValues, touched, errors,setFieldValue } = renderProps;
              return (
                <>
                  <Form encType='multipart/form-data'>
        <h1 className="text-2xl mb-2 text-center">Post new job</h1>
        
        
        <div className="job-info border-b-2 py-2 mb-5">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" for="job-title">Title</label>
            <input 
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              type="text"
              id="job-title"
              name="job-title"
              placeholder="Frontend Developer Needed"
              autofocus
              value={formValues.name}
              onChange={(e) =>
                            renderProps.setFieldValue("name", e.target.value)
                        }
               />
        <ErrorMessage name="name" render={msg => <div style={{color:"red"}}>{msg}</div>} />

          </div>

        

          <div className="flex justify-center mt-8">
    <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
        <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">File Upload</label>
            <div className="flex items-center justify-center w-full">
                <label
                    className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Attach a file</p>
                    </div>
                    <input 
                    name="file"
                    id='file'
                    type="file"
                    accept='image/*'
                    className="opacity-0"
                    onChange={(event)=>{
                      setFieldValue("file", event.currentTarget.files[0]);

                    }}
                    
                      />
                </label>
            </div>
        </div>
        
    </div>
</div> 

          <div>
            <label for="description" className="block text-gray-700 text-sm mb-2">Description</label>
            <textarea 
            name="description"
            id="description"
            cols="34"
            rows="2"
            value={formValues.description}
            onChange={(e) =>
                renderProps.setFieldValue("description", e.target.value)
              }
            >

            </textarea>
        <ErrorMessage name="description" render={msg => <div style={{color:"red"}}>{msg}</div>} />

          </div>

        </div>
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
                      variant="outlined"
                      fullWidth
                      label="skill"
                      placeholder="eg. react, angular"
                      name={`skills.${index}.skill`}
                    />
                   
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove an item from the list
                    >
                      -
                    </button>
                    <button
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
        
        <div className="payment mb-6">
          
          <h4 className="mb-2">Payment</h4>
          <p className="bg-gray-200 py-3 text-center text-sm">
              <input
              className="appearance-none block bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              value={formValues.budget}
              onChange={(e) =>
                  renderProps.setFieldValue("budget", e.target.value)
                }

              />
        <ErrorMessage name="budget" render={msg => <div style={{color:"red"}}>{msg}</div>} />

          </p>
          
        </div>
        
        
        <div className='flex justify-center'>
          <button className="bg-slate-900 text-white py-2 px-3 mb-10 rounded text-center"
           type="submit">
            {isFetching?"Posting ..." :"Post job"}
             </button>
        </div>
      </Form>
    </>
              )
            }
            }
            </Formik>
    </div>
   </main>
  )
}

const mapStateToProps = (state) => ({
  ...state.Jobs,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostJob);
