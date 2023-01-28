import React from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import logo from '../images/smoothly_web_text.png';
import discord from '../images/chate.png';
import twitter from '../images/twiter.png';
import github from '../images/git.png';
import notion from '../images/notion.png';

const Landing = () => {
  const { openConnectModal } = useConnectModal();

  return( 
      <div className="fullbodybg">
        {/* Logo and Button */}
        <div className="logostyle">
          <p><img style={{ width: 500 }} src={logo} title="MEV Smoothing Pool" alt="MEV Smoothing Pool" /></p>
          <p className="esbtnwidth">
          <button onClick={openConnectModal} className="entersmoothly" type="button">Enter Smoothly 
          <i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
          </p>
        </div>
        {/* Footer */}
        <div className="splashfooter">
          <div className="splashcol">
            <p><a href="https://discord.gg/WvcEAcg9Aj" target="_blank"><img src={discord} title="discord" alt="discord" /></a></p>
          </div>
          <div className="splashcol">
            <p><a href="https://twitter.com/0xSmoothly" target="_blank"><img src={twitter} title="Twitter" alt="Twitter" /></a></p>
          </div>
          <div className="splashcol">
            <p><a href="https://twitter.com/0xSmoothly" target="_blank"><img src={github} title="Github" alt="Github" /></a></p>
          </div>
          <div className="splashcol">
            <p><a href="https://0xsmoothly.notion.site/" target="_blank"><img src={notion} title="Notion" alt="Notion" /></a></p>
          </div>
        </div>
      </div>
      );
}

export default Landing;
