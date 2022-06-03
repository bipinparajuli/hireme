import React, { useEffect } from 'react'

// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Action from "./../../redux/Employer/Actions";

const Employer = (props) => {
    useEffect(()=>{
props.getEmployer()
    },[])
    console.log(props);

    const handleDelete = async (id) => {
      
      await  props.deleteEmployer(id)
      props.getEmployer()
  
      }
  return (
    <div style={{height:"100vh"}}>
    <h1 style={{ textAlign: "center" }}>All Employer</h1>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Address
            </th>
            <th scope="col" class="px-6 py-3">
              First Name
            </th>
            <th scope="col" class="px-6 py-3">
            Last Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Delete</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {props.allemployer.map((data) => (
            <>
              <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {data.u_address}
                </th>
                <td class="px-6 py-4">
                    {data.f_name}
                    </td>
                <td class="px-6 py-4">
                    {data.l_name}
                    </td>
                <td class="px-6 py-4">
                  {data.u_email}
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(data._id)}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
   
  </div>
  )
}

const mapStateToProps = (state) => ({
    ...state.Employer,
  
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      ...bindActionCreators({...Action }, dispatch),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
