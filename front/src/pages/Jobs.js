import React, { useEffect } from 'react'
import { useNotifications } from '@mantine/notifications';
import { Link } from 'react-router-dom';


// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Jobs/Actions";
import * as SActions from "./../redux/Purposal/Actions";


import { getUserData } from '../helpers/Session';
import Error from '../components/Error';
import Success from '../components/Success';
import ImageHelper from '../helpers/ImageHelper';



const Jobs = (props) => {
  const notifications = useNotifications();


    const {jobbyid,isFetching,hasSuccess,hasError} = props
    console.log(props,isFetching);
  
    const user =  getUserData()

    
    useEffect(()=>{
        props.getJobById(user._id)
    },[])

    // deleteJob

    function handleDeleteJob (jId){
        props.deleteJob(user._id,jId)

    }
    useEffect(()=>{
      console.log(hasSuccess);
      if(hasSuccess){
        notifications.showNotification({
          color:"green",
          title: 'Success',
          message: "Deleted successfully",
        })
        setTimeout(()=>{
          props.resetStateHandler()
          props.getJobById(user._id)
  
        },1000)
      }
    },[hasSuccess])
  

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

                      <div 
                      style={{display:"flex",
                      flexDirection:"column",
                      justifyContent:"center",
                      alignItems:"center",
                      height:"300px",
                      background: "linear-gradient(105.8deg, rgba(255, 243, 229, 0.64) 6.37%, rgba(255, 243, 229, 0.64) 11.01%, rgba(182, 226, 225, 0.71) 96.5%)"
                    }}
                      >
                          <h1 className="my-4 text-4xl font-bold leading-tight">
                            My Projects                          
                          </h1>
                         <p style={{width:"400px"}} className="tracking-loose">
                            View your job advertisement here with the number of applicants. Also delete the unwanted jobs. 
                          </p>

                      </div>
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

    {
        !jobbyid ? <h1>loading . . . </h1> : jobbyid.length==0?<h1>No Jobs found !!</h1> : jobbyid.map(data=>(
            <div style={{marginBottom:"10%"}} key={data.name} className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <ImageHelper 
                  jobId={data._id}
              />
              <div className="font-bold text-xl mb-2">
                  {data.name}
                </div>
              <p className="text-gray-700 text-base">
                    {data.description}
              </p>
              <p className="text-gray-700 text-base">
                  <span className='font-bold'>No. of Purposal: </span>  {data.no_of_purposal}
                  <button  
              style={{ transition: "all .15s ease",backgroundColor:"#B6E2E1" }}
              class="bg-gray-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >

                  <Link className='ml-2' to={`/purposal/${data._id}`}>View All</Link>
                  </button>

              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button  
              style={{ transition: "all .15s ease",backgroundColor:"#B6E2E1" }}
              onClick={()=>handleDeleteJob(data._id)} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <span>{isFetching?"Deleteing...":'Delete'}</span>
               </button>
              
            </div>
          </div>
        ))
    }
    </div>
      </>
   
  )
}

const mapStateToProps = (state) => ({
    ...state.Jobs,
    // ...state.Purposal
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      ...bindActionCreators({ ...Actions,...SActions }, dispatch),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Jobs);