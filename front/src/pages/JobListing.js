import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from "./../redux/Jobs/Actions";
import Card  from '../components/Card';
import Landing from '../components/Landing';

const JobListing = (props) => {

  const {jobs} = props;

  const {getAllJobs} = props;
  
  useEffect( async()=>{

  await getAllJobs()

  },[])



  return (
    <>
    <Landing />
    <div style={{marginBottom:"10%"}}>

    <h2>Popular Jobs for you</h2>
    {
    !jobs ? <h1>loading . . . </h1> : jobs.length==0?<h1>No Jobs found !!</h1> : jobs.map(data=>{
      console.log(data._id);
        return(
          <Card 
            key={data._id}
            name={data.name}
            description={data.description}
            skills={data.skills}
            budget={data.budget}
            jId={data._id}
          />
        )
      })
    }
    </div>

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