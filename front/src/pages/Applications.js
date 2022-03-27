import React, { useEffect,useState } from 'react'

import { useNotifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';

// For redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./../redux/Purposal/Actions";
import { getUserData } from '../helpers/Session';

const Applications = (props) => {
  const notifications = useNotifications();

  // console.log(props);
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
      if(props.hasSuccess){
        notifications.showNotification({
          color:"green",
          title: 'Success',
          message: "Updated successfully",
        })
        props.resetStateHandler()
      }
      if(props.hasError){
        notifications.showNotification({
          color:"red",
          title: 'Error',
          message: props.errorMessage,
        })
        props.resetStateHandler()

      }
    },[props.hasError,props.hasSuccess])

    useEffect(()=>{
props.getPurposalByEmployeeId(user._id)
    },[])
  return (<>
    <h1 className='text-center'> Your Applications Status</h1>
    {/* <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"> */}
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Job title</th>
            <th>Purposal description</th>
            <th>Status</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>
    {
        props.mypurposal.map(data=>(
            <>
          <tr>
<td>
<Text size="sm" weight={500}>
{data.job_description}
</Text>
</td>

<td>
<Text size="sm" weight={500}>
{data.description}
</Text>
</td>

<td>
{data.status?
            
            <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">{data.status}</span>
         : ""
          }
</td>
   
        
            
            <td>
   {data.status == "active" ?<>  <select 
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
    {
      props.isFetching !== true?
    <button className='bg-slate-900 text-white py-2 px-3 mb-10 rounded text-center' onClick={()=>updatePercentageHandler(data.job_id,data._id)}>Update</button>
:<Loader />
    }

    </>
    : null}
    </td>
    </tr>

    {/* <button className='bg-slate-900 text-white py-2 px-3 mb-10 rounded text-center' onClick={()=>updatePercentageHandler(data.job_id,data._id)}>Update</button> */}


            </>
        ))
    }
    </tbody>
    </Table>
    </ScrollArea>
    {/* </div> */}
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