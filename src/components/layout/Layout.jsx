import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routers from '../routers/Routers'
import Footer from '../footer/Footer'
import Header from '../header/Header'
function Layout() {
  return (
    <Router>
        <Header/>
        <Routers/>
        <Footer/>
    </Router>
  )
}

export default Layout
