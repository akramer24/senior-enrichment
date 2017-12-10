import React, { Component } from 'react';

export default function Home() {
    return (
        <div id='home'>
            <iframe className='home-video' width="560" height="315" src="https://www.youtube.com/embed/iKS0GVvoE9I" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
            <iframe className='home-video' width="560" height="315" src="https://www.youtube.com/embed/q7vtWB4owdE" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
            <iframe className='home-video' width="560" height="315" src="https://www.youtube.com/embed/_nGSvkJjc9c" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
        </div>
    )
}