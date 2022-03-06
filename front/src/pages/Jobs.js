import React, { useEffect } from 'react'

// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Jobs/Actions";
import * as SActions from "./../redux/Purposal/Actions";


import { getUserData } from '../helpers/Session';
import Error from '../components/Error';
import Success from '../components/Success';
import { Link } from 'react-router-dom';



const Jobs = (props) => {

  console.log(props);

    const {jobbyid,isFetching,hasSuccess,hasError} = props
  
    const user =  getUserData()

    
    useEffect(()=>{
        props.getJobById(user._id)
    },[])

    console.log(jobbyid,hasSuccess)
    // deleteJob

    function handleDeleteJob (jId){
        props.deleteJob(user._id,jId)

    }
    if(hasSuccess){
      setTimeout(()=>{
        props.resetStateHandler()
        props.getJobById(user._id)

      },1000)
    }

    if(jobbyid){
      jobbyid.forEach(element => {
        // getPurposalByJobId(element._id)/
      });
    }


  return (
      <>
      {
                        hasError && (
                          <Error message="Error on Deleting" />
                        )
                      }
                      {/* {
                        hasSuccess && (
                          <Success />
                        )
                      } */}
    {
        !jobbyid ? <h1>loading . . . </h1> : jobbyid.length==0?<h1>No Jobs found !!</h1> : jobbyid.map(data=>(
            <div style={{marginBottom:"10%"}} key={data.name} className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                  {data.name}
                </div>
              <p className="text-gray-700 text-base">
                    {data.description}
              </p>
              <p className="text-gray-700 text-base">
                  <span className='font-bold'>No. of Purposal: </span>  {data.no_of_purposal}
                  <Link className='ml-2' to={`/purposal/${data._id}`}>View All</Link>
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button  onClick={()=>handleDeleteJob(data._id)} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <span>{isFetching?"Deleteing...":'Delete'}</span>
               </button>
            </div>
          </div>
        ))
    }
      </>
   
  )
}

const mapStateToProps = (state) => ({
    ...state.Jobs,
    ...state.Purposal
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      ...bindActionCreators({ ...Actions,...SActions }, dispatch),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Jobs);