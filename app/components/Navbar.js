import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div id='navbar'>
            <div className='navbar-item'>
                <NavLink to='/frats' className='navlink'>
                    <span>Frats</span>
                </NavLink>
            </div>
            <div className='navbar-item'>
                <NavLink to='/brothers' className='navlink'>
                    <span>Brothers</span>
                </NavLink>
            </div>
        </div>
    )
}