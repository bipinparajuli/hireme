import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Badge } from '@mantine/core';
import * as Actions from "./../redux/Jobs/Actions";
import Card  from '../components/Card';
import Landing from '../components/Landing';

const JobListing = (props) => {

  const [popular,setPopular] = useState("all")
  const [state,setState] = useState({
    currentPage: 1, //Holds the value for the current page
    postsPerPage: 1 //Holds the value for the number of posts per page. You can adjust to suit your needs

  })

  const {currentPage,postsPerPage} = state

  


  const {jobs} = props;

  const {getAllJobs} = props;
  
  useEffect( async()=>{

  await getAllJobs()

  },[])

  //Get currentPosts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);
  console.log(jobs,currentPosts);

  //Implement page numbers
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(jobs.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //Set current page
  const setPage = (pageNum) => {
    setState({currentPage: pageNum})
  }

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
    !jobs ? <h1>loading . . . </h1> : jobs.length==0?<h1>No Jobs found !!</h1> : currentPosts.map(data=>{
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
          <>
          <Card 
            key={data._id}
            name={data.name}
            description={data.description}
            skills={data.skills}
            budget={data.budget}
            jId={data._id}
          />
 
          </>

        )
      }
        
      })
    }
    {/* <div className="w-full flex justify-around">
          {
            pageNumbers.map((pageNum, index) => (
              <span key={index} className={pageNum === currentPage ? "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full bg-blue-500 text-white" : "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full"} onClick={() => {setPage(pageNum)}}>
                {pageNum}
              </span>
            ))
          }
        </div> */}
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