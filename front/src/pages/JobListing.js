import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Badge } from '@mantine/core';
import * as Actions from "./../redux/Jobs/Actions";
import Card  from '../components/Card';
import Landing from '../components/Landing';

const JobListing = (props) => {

  const [popular,setPopular] = useState("all")

  const {jobs} = props;

  const {getAllJobs} = props;
  
  useEffect( async()=>{

  await getAllJobs()

  },[])



  return (
    <>
    <Landing />
    <div style={{marginBottom:"10%"}}>

    <h2 className='text-center text-3xl font-bold leading-tight'>Popular Jobs for you</h2>
<div
style={{display:"flex",justifyContent:"center",gap:"10px",marginTop:"5%"}}
>

<span>Popular</span>
<Badge 
    onClick={()=>setPopular("all")}
    variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>All</Badge>

    <Badge 
    onClick={()=>setPopular("web development")}
    variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Web Development</Badge>
    <Badge
    onClick={()=>setPopular("electronics")}
    variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Electronics</Badge>
    <Badge
    onClick={()=>setPopular("plumber")}
    variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Plumber</Badge>
    <Badge
    onClick={()=>setPopular("carpenter")}
    variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Carpenter</Badge>
    <Badge 
    onClick={()=>setPopular("cleaner")}
    variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Cleaner</Badge>
</div>

    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    {
    !jobs ? <h1>loading . . . </h1> : jobs.length==0?<h1>No Jobs found !!</h1> : jobs.map(data=>{
      if(popular.length > 0 && JSON.parse(data.skills)[0].skill == popular){

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
      // }
      }
      else if(popular == "all"){
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
      }
        
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