import React, { useEffect,useState } from 'react'


// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Purposal/Actions";
import { getUserData } from '../helpers/Session';

const Applications = (props) => {
  console.log(props);
    let user = getUserData();
    const [state,setState]=useState({
      ongoing_percentage:""
    })

      // const {ongoing_percentage} = state


    function updatePercentageHandler(jid,pid){
      console.log(state,jid,pid);
      props.updateOngoingPercentage(jid,pid,state)
    }

    const handleChange=(e)=>{
      console.log(e.target.value);
      setState({ongoing_percentage:e.target.value})
    }

    useEffect(()=>{
props.getPurposalByEmployeeId(user._id)
    },[])
  return (<>
    <div>Applications</div>
    {
        props.mypurposal.map(data=>(
            <>
            <h1>{data.description}</h1>
            <p>{data.status}</p>
            
            <div class="mb-3 xl:w-96">
    <select 
    onChange={handleChange}
    class="form-select form-select-lg mb-3
      appearance-none
      block
      w-full
      px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-lg example">
        <option selected>Update Progress</option>
        <option value="25">25%</option>
        <option value="50">50%</option>
        <option value="100">100%</option>
    </select>
    </div>

    <button onClick={()=>updatePercentageHandler(data.job_id,data._id)}>Update</button>



            </>
        ))
    }
  </>

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Applications);