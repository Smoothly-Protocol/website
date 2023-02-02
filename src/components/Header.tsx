import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import sun from '../images/sun.png';
import logoNew from "../images/web_logo_cropped.png";

const Header = () => {
  const toggleBg = () => {
    let b: HTMLElement = document.getElementById("bgcolorchange");
    if(b.className === "") {
      b.className = "black-background";
			document.body.style.backgroundColor = "black";

    } else {
      b.className = "";
			document.body.style.backgroundColor = "white";

    }
  }

	const [isOpen, setIsOpen] = useState<boolean>(false);

  return (  
		<header className="nav-bar">
			<div className="mobile-menu">
				<div id="hamburger" onClick={() => setIsOpen(!isOpen)}>
					<i className={`fa fa-bars fa-2x ${isOpen ? 'open' : ''}`}></i>
				</div>
				<div className="mobile-container" style={{opacity: (isOpen ? '1' : '0')}}>
					<ul className="nav" role="tablist" onClick={() => setIsOpen(!isOpen)}>
						<li><a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Register Validator</a></li>
						<li><a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Check Balance</a></li>
						<li><a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Claim Rewards</a></li>
						<li><a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Exit Pool</a></li>
						<li><a className="nav-link" data-toggle="tab" href="#tabs-5" role="tab">Pool Stats</a></li>
					</ul>
				</div>
				<div className="non-menu-buttons">
						<ConnectButton/>
					</div>
			</div>
			<div className="globleheader">
				<div className="headercol d-flex align-baseline">
					<img src={logoNew} className="header-logo" title="Smoothly MEV Smoothing Pool" alt="Smoothly MEV Smoothing Pool" />
					<div className="menubar ml-4">
						<ul className="nav" role="tablist">
							<li><a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Register Validator</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Check Balance</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Claim Rewards</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Exit Pool</a></li>
              <li><a className="nav-link" data-toggle="tab" href="#tabs-5" role="tab">Pool Stats</a></li>
						</ul>
					</div>
				</div>
				{/* <div className="headercol">
					<div className="menubar">
						<ul className="nav" role="tablist">
							<li><a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Register Validator</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Check Balance</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Claim Rewards</a></li>
							<li><a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Exit Pool</a></li>
              <li><a className="nav-link" data-toggle="tab" href="#tabs-5" role="tab">Pool Stats</a></li>
						</ul>
					</div>
				</div> */}
				<div className="headercol">
					<ul className="inventory-items">
						<li><button id="sellButton" onClick={toggleBg}><i className="fa fa-moon-o" aria-hidden="true"></i><img src={sun} className="darkmode"/></button></li>
						<ConnectButton/>
					</ul>
				</div>
			</div>
		</header>
  );
}

export default Header;
