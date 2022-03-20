import React from 'react'
import Navbar from '../Navbar'
import Footer from '../FooterSmall'
const MainComponent = ({children}) => {
  return (
    <>
    <Navbar />
      {children}
    {/* <Footer /> */}
    </>

  )
}

export default MainComponent