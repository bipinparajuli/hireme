import React from 'react'
import * as Yup from 'yup'
import { Formik, Form,ErrorMessage,FieldArray,Field } from "formik";

// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Jobs/Actions";
import Error from "../components/Error";
import Success from "../components/Success";
import { getUserData } from '../helpers/Session';


const JobValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter job title"),
  description: Yup.string().required("Please enter a password").min(8).max(255),
  budget:Yup.number().required("Budget is required"),
  skills:Yup.array().required("Skills are required")

});

const user =  getUserData()

const PostJob = (props) => {

  const {isFetching,hasError,hasSuccess} = props;

  function handleFormSubmit(values,{resetForm}){
    console.log(values)
    props.handleJobRequestAction(values,user._id)
    resetForm()

  }

  console.log(hasSuccess,hasError);

  return (
    <main class="main bg-white px-6 md:px-16 py-6 mb-10">
    <div class="w-full max-w-xl mx-auto">
    <Formik
            enableReinitialize
            initialValues={{
              name: "",
              description:"",
              budget: "",
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
              const { values: formValues, touched, errors } = renderProps;
              return (
                <>
                  <Form>
        <h1 class="text-2xl mb-2">Post new job</h1>
        {
                        hasError && (
                          <Error message="Job Posting Failed" />
                        )
                      }
                      {
                        hasSuccess && (
                          <Success />
                        )
                      }
        
        <div class="job-info border-b-2 py-2 mb-5">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm mb-2" for="job-title">Title</label>
            <input 
              class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
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

        

          <div class="md:flex md:justify-between">
            <div class="w-full md:w-3/12 mb-4 md:mb-0">
                <label class="block text-gray-700 text-sm mb-2" for="job-type">
                  Job Type
                </label>
                <div class="relative">
                  <select class="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="job-type" name="job-type">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Freelance</option>
                    <option>Contract</option>
                  </select>

                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>

            {/* <div class="w-full md:w-8/12 mb-4 md:mb-0">
              <label for="location" class="block text-gray-700 text-sm mb-2">Location</label>
              <input type="text" class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" id="location" name="location" placeholder="Schwerin" />

              <div>
                <label class="text-gray-600 flex items-center" for="remote">
                  <input class="mr-2 leading-tight" type="checkbox" id="remote" />
                  <span class="text-sm">Work can be done remotely</span>
                </label>
              </div>
            </div> */}
          </div> 

          <div>
            <label for="description" class="block text-gray-700 text-sm mb-2">Description</label>
            <textarea 
            name="description"
            id="description"
            cols=""
            rows=""
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
        
        <div class="payment mb-6">
          
          <h4 class="mb-2">Payment</h4>
          <p class="bg-gray-200 py-3 text-center text-sm">
              <input
              class="appearance-none block bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              value={formValues.budget}
              onChange={(e) =>
                  renderProps.setFieldValue("budget", e.target.value)
                }

              />
        <ErrorMessage name="budget" render={msg => <div style={{color:"red"}}>{msg}</div>} />

          </p>
          
        </div>
        
        
        <div>
          <button class="bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 mb-10 rounded"
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