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

    <h2 className='text-center'>Popular Jobs for you</h2>
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
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