import React from 'react';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import sun from '../images/sun.png';
import logoNew from "../images/logonew.png";

const Header = () => {
  const toggleBg = () => {
    let b: HTMLElement = document.getElementById("bgcolorchange");
    if(b.className === "") {
      b.className = "black-background";
    } else {
      b.className = "";
    }
  }

  return (  
		<header>
			<div className="globleheader">
				<div className="headercol">
					<img src={logoNew} title="Smoothly MEV Smoothing Pool" alt="Smoothly MEV Smoothing Pool" />
				</div>
				<div className="headercol">
					<div className="menubar">
						<ul className="nav" role="tablist">
							<li><a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Register Validator</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Check Balance</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Claim Rewards</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Exit Pool</a></li>
              <li><a className="nav-link" data-toggle="tab" href="#tabs-5" role="tab">Pool Stats</a></li>
						</ul>
					</div>
				</div>
				<div className="headercol">
					<ul className="inventory-items">
						<li><button id="sellButton" onClick={toggleBg}><i className="fa fa-moon-o" aria-hidden="true"></i><img src={sun} className="darkmode"/></button></li>
						<ConnectButton/>
						{/*<li><a href="#" className="uniqbtn">Connect a Wallet</a></li>*/}
					</ul>
				</div>
			</div>
		</header>
  );
}

export default Header;
