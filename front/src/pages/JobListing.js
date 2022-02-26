import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from "./../redux/Jobs/Actions";
import { Card } from '../components/Card';

const JobListing = (props) => {

  const {jobs} = props;

  const {getAllJobs} = props;
  
  useEffect( async()=>{

  await getAllJobs()

  },[])


  console.log("SECOND",jobs)

  return (
    <>
    {
    console.log("SECOND",jobs),!jobs ? <h1>loading . . . </h1> : jobs.length==0?<h1>No Jobs found !!</h1> : jobs.map(data=>{
        return(
          <Card 
            key={data.u_id}
            name={data.name}
            description={data.description}
            skills={data.skills}
            budget={data.budget}
          />
        )
      })
    }
  </>
 
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

export default connect(mapStateToProps,mapDispatchToProps)(JobListing);