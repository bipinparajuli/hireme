import React, { useEffect } from 'react'

// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Purposal/Actions";
import { Link, useParams } from 'react-router-dom';


const Purposal = ({getPurposalByJobId,pruposalbyjobid,updatePurposalStatus}) => {
    const{id}= useParams()

    function updatePurposalHandler (pid){
      updatePurposalStatus(id,pid)
    }
    
    useEffect(()=>{
        getPurposalByJobId(id)
    },[])
console.log(pruposalbyjobid);
    return (
        <>
    <div>Purposal</div>
    {
        pruposalbyjobid.map(purposal=>(
            <div class="flex justify-center">
  <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
    <div class="w-48 h-48 relative mb-4">
    <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
      <span class="hidden group-hover:table-cell text-white font-bold align-middle">KR</span>
    <Link to={`/profile/${purposal.employee_no}`}>
      <img src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png" alt="lovely avatar" class="object-cover object-center w-full h-full visible group-hover:hidden" />
      </Link>
    
    </div>
  </div>
    <div class="p-6 flex flex-col justify-start">
    <Link to={`/profile/${purposal.employee_no}`}>

      <h5 class="text-gray-900 text-xl font-medium mb-2">{purposal.applied_by}</h5>
            </Link>
      <p class="text-gray-700 text-base mb-4">
            {purposal.description}
      </p>
      <p class="text-gray-600 text-xs">Last updated 3 mins ago</p>
      {purposal.status == 'active'?
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${purposal.ongoing_percentage}%`}}>{purposal.ongoing_percentage}</div>
  </div>:
      <button className='bg-slate-900 text-white py-2 px-3 mb-10 rounded text-center' onClick={()=>updatePurposalHandler(purposal._id)}> Accept Purposal</button>

    }
    {
      purposal.ongoing_percentage == "100" ? <button className='bg-slate-900'>Pay Now</button> : null
    }
    </div>
  </div>
</div>
        ))
    }
        </>

  )
}

const mapStateToProps = (state) => ({
    ...state.Purposal
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      ...bindActionCreators({ ...Actions}, dispatch),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Purposal);