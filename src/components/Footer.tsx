import React from 'react';

import discord from '../images/chate.png';
import twitter from '../images/twiter.png';
import github from '../images/git.png';

const Footer = () => {
  return(
		<footer className="footerdown">
		<div className="globlefooter">
			<div className="footercol">
				<ul>
					<li><a href="https://discord.gg/WvcEAcg9Aj" target="_blank"><img src={discord} title="chat" alt="chat" /></a></li>
					<li><a href="https://twitter.com/0xSmoothly" target="_blank"><img src={twitter} title="Twitter" alt="Twitter" /></a></li>
					<li><a href="https://github.com/Smoothly-Protocol" target="_blank"><img src={github} title="Github" alt="Github" /></a></li>
				</ul>
			</div>
			<div className="footercol">
				<ul>
					<li><a href="https://0xsmoothly.notion.site/0xsmoothly/Frequently-Asked-Questions-54c3d9fe92e5496f8d8252af88f2b40f" target="_blank">FAQ</a></li>
					<li><a href="https://0xsmoothly.notion.site/" target="_blank">Docs</a></li>
					<li><a href="https://0xsmoothly.notion.site/0xsmoothly/How-To-Guide-5b1e7fcf67594d8ba3573cf76682706a" target="_blank">Read Me</a></li>
				</ul>
			</div>
		</div>
		</footer>
  );
}

export default Footer;
