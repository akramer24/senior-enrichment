import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div id='navbar'>
            <div className='navbar-item'>
                <NavLink to='/campuses' className='navlink'>
                    <span>Campuses</span>
                </NavLink>
            </div>
            <div className='navbar-item'>
                <NavLink to='/students' className='navlink'>
                    <span>Students</span>
                </NavLink>
            </div>
        </div>
    )
}