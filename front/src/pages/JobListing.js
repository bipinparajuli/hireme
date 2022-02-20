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




  return (
    <>
    {
    !jobs ? <h1>loading . . . </h1> :  jobs.map(data=>{
        return(
          <Card 
            key={data.u_id}
            name={data.name}
            description={data.description}
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