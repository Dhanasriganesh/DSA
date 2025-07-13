import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import About from '../pages/About'

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Routers() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    )
}

export default Routers
