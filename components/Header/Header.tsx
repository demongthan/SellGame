"use client"

import React, { useState } from 'react'
import Navbar from './Navbar'
import NavbarMobile from './NavbarMobile'

const Header = () => {
  const [showNav, setShowNav]=useState(false);
  const showNavHandler=()=>setShowNav(true);
  const closeNavHandler=()=>setShowNav(false);

  return (
    <div className='overflow-hidden'>
        <NavbarMobile showNav={showNav} closeNav={closeNavHandler}></NavbarMobile>
        <Navbar openNav={showNavHandler}></Navbar> 
    </div>
  )
}

export default Header