import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ImageHelper from '../helpers/ImageHelper'
import { getUserData } from '../helpers/Session'
import { useNotifications } from '@mantine/notifications';
import { Badge } from '@mantine/core';


//  For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Purposal/Actions";


import Error from "../components/Error";
import Success from "../components/Success";


 const Card = ({name,description,skills,budget,jId,handlePurposalRequestAction,isFetching,hasError,hasSuccess,resetStateHandler}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [value, setValue] = React.useState({
    description:"",
    job_description:""
  });
  const notifications = useNotifications();


 const user = getUserData()

 


function handlePuropsalSubmit(name){
   if(value.description.length < 10){
     alert("Minimum 10 character")
   }else{
    handlePurposalRequestAction(value,user._id,jId);

   }
 }

//  useEffect(()=>{
//   setValue({...value,job_description:name})

//  },[name])
console.log(hasSuccess);

useMemo(()=>{
  console.log(hasSuccess);
  if(hasSuccess === true){
     resetStateHandler()
     notifications.showNotification({
      color:"green",
      title: 'Success',
      message: "Applied successfully",
    })
     setTimeout(()=>{
     setShowModal(false)

     },1500)
    //  alert("Post success")
     
    }
    
    if(hasError === false){
      console.log(hasError);
      alert("Posting failure")
      notifications.showNotification({
        color:"red",
        title: 'Error',
        message: "Failed to apply",
      })
     setShowModal(false)
      resetStateHandler()
    
    }

},[hasSuccess,hasError])


// setShowModal(false)

  
  return (
    <div style={{marginBottom:"10%"}} className="max-w-sm rounded overflow-hidden shadow-lg">
      
      <ImageHelper
        jobId={jId}
      />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{name}</div>
      <p style={{color:"gray"}} className="text-base">
            {description}
      </p>
      <p style={{marginLeft:"70%",marginTop:"10%"}} className="font-bold text-base">
          Budget: <strong className='text-gray-700 text-base'>{budget}</strong>
      </p>

    </div>
    <div className="px-6 pt-4 pb-2">
      {
      JSON.parse(skills).map(skill=>(
          // <span key={skill} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{skill.skill}</span>
          <Badge 
          key={skill}
          variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
            {skill.skill}
            </Badge>
       ))
}

     
{ user !== undefined ? user.role == "Employee" ?
      <button
        className={`bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
        style={{ transition: "all .15s ease",backgroundColor:"#B6E2E1",marginLeft:"12px" }}
        type="button"
        onClick={() => setShowModal(true)}
        
      >
        Apply
      </button>:null:null

}
      {showModal ? (
        <>
          <div
            
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div 
        style={{ transition: "all .15s ease",backgroundColor:"#B6E2E1" }}
            
            className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div style={{minWidth:"350px"}}  className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ??
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <textarea
                          required
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="you can talk about your past exerience and how this job match you"
    onChange={e=>setValue({description:e.target.value,job_description:name})}
                          />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>handlePuropsalSubmit(name)}
                  >
                    
      {hasSuccess? 'Success':hasError ? "Error" : isFetching?' Posting . . . ': 'Submit'}

                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    
    </div>

  </div>
  )
}
const mapStateToProps = (state) => ({
  ...state.Purposal,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

  {/* <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <Link to="/applyjob">Apply Now</Link>
      </button> */}