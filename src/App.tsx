import React, {useEffect, useState} from 'react';
import logo from './images/logo.jpg';
import discord from './images/chate.png';
import twitter from './images/twiter.png';
import github from './images/git.png';

const App = () => {
  return( 
      <body className="fullbodybg">
        {/* Logo and Button */}
        <div className="logostyle">
          <p><img src={logo} title="MEV Smoothing Pool" alt="MEV Smoothing Pool" /></p>
          <p className="esbtnwidth"><a href="home.html" className="entersmoothly">Enter Smoothly <i className="fa fa-angle-right" aria-hidden="true"></i></a></p>
        </div>
        {/* Footer */}
        <div className="splashfooter">
          <div className="splashcol">
            <p><a href="#"><img src={discord} title="discord" alt="discord" /></a></p>
            <p><a href="#">FAQ</a></p>
          </div>
          <div className="splashcol">
            <p><a href="#"><img src={twitter} title="Twitter" alt="Twitter" /></a></p>
            <p><a href="#">Docs</a></p>
          </div>
          <div className="splashcol">
            <p><a href="#"><img src={github} title="Github" alt="Github" /></a></p>
            <p><a href="#">Read Me</a></p>
          </div>
        </div>
      </body>
      );
}

export default App;
