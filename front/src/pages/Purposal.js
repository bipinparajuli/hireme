import React, { useEffect } from 'react'
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
import { Link, useParams } from 'react-router-dom';


const Purposal = ({getPurposalByJobId,pruposalbyjobid,updatePurposalStatus,hasSuccess,hasError,isFetching,payNow}) => {
    const{id}= useParams()
    const notifications = useNotifications();

    function updatePurposalHandler (pid){
      updatePurposalStatus(id,pid)

    }

    function payNowHandler(eid,jid,pid){
      payNow(eid,jid,pid)

    }

    useEffect(()=>{
      if(hasSuccess){
        notifications.showNotification({
          color:"green",
          title: 'Success',
          message: "Accepted successfully",
        })
      getPurposalByJobId(id)

      }
      if(hasError){
        notifications.showNotification({
          color:"red",
          title: 'Error',
          message: "Failed to accept",
        })
      }
    },[hasError,hasSuccess])
  

    useEffect(()=>{
        getPurposalByJobId(id)
    },[])
console.log(pruposalbyjobid);
    return (
        <>
    <div>    
      <h2 className='text-center my-10'>Popular Jobs for you</h2>
    </div>
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Applied by</th>
            <th>Purposal description</th>
            <th>Status</th>
            {/* <th>Phone</th> */}
            <th />
          </tr>
        </thead>
        <tbody>
        {
        pruposalbyjobid.map(purposal=>(
          <tr key={purposal.name}>
      <td>
        <Group spacing="sm">
        <Link to={`/profile/${purposal.employee_no}`}>

          <Avatar size={30} src={"https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"} radius={30} />
          </Link>

          <Text size="sm" weight={500}>
            {purposal.applied_by}
          </Text>
        </Group>
      </td>

      <td>
      <Text size="sm" weight={500}>
             {purposal.description}

          </Text>
      </td>

      <td>
      {purposal.status == 'active'? purposal.ongoing_percentage == null ?
      <Badge>
Active
      </Badge>:
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${purposal.ongoing_percentage}%`}}>{purposal.ongoing_percentage}</div>
  </div>:
    isFetching? <Loader /> :  <button
     className='bg-slate-900 text-white py-2 px-3 mb-10 rounded text-center'
     style={{ transition: "all .15s ease",backgroundColor:"#B6E2E1" }}
    onClick={()=>updatePurposalHandler(purposal._id)}> Accept Purposal</button>

    }
    {
    purposal.status == 'completed'? <>Completed</> : purposal.ongoing_percentage == "100" ? <button 
    className='bg-slate-900' 
    onClick={()=>payNowHandler(purposal.employee_no,purposal.job_id,purposal._id)} 
    style={{ transition: "all .15s ease",backgroundColor:"#B6E2E1" }}
    
    >Pay Now</button> : null
    }
      </td>
      </tr>
//             <div class="flex justify-center my-10">
//   <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
//     <div class="w-48 h-48 relative mb-4">
//     <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
//       <span class="hidden group-hover:table-cell text-white font-bold align-middle">KR</span>
    
//     </div>
//   </div>
//     <div class="p-6 flex flex-col justify-start">
//     <Link to={`/profile/${purposal.employee_no}`}>

//       <h5 class="text-gray-900 text-xl font-medium mb-2">{purposal.applied_by}</h5>
//             </Link>
//       <p class="text-gray-700 text-base mb-4">
//             {purposal.description}
//       </p>
//       <p class="text-gray-600 text-xs">Last updated 3 mins ago</p>
//       {purposal.status == 'active'?
//   <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
//     <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${purposal.ongoing_percentage}%`}}>{purposal.ongoing_percentage}</div>
//   </div>:
//     isFetching? <Loader /> :  <button className='bg-slate-900 text-white py-2 px-3 mb-10 rounded text-center' onClick={()=>updatePurposalHandler(purposal._id)}> Accept Purposal</button>

//     }
//     {
//       purposal.ongoing_percentage == "100" ? <button className='bg-slate-900'>Pay Now</button> : null
//     }
//     </div>
//   </div>
// </div>
        ))
    }
        </tbody>
      </Table>
    </ScrollArea>
   
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