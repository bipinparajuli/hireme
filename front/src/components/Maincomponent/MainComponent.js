import React from 'react'
import Navbar from '../Navbar'
import Footer from '../FooterSmall'
const MainComponent = ({children}) => {
  return (
    <>
    <Navbar />
    <div>
      {children}
    </div>
    <Footer />
    </>
  )
}

export default MainComponent