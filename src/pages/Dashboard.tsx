import React from 'react';
import { useAccount } from 'wagmi'

import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div id="bgcolorchange">
			<Header />
				<div className="tab-content maincontent">
					<div className="tab-pane active" id="tabs-1" role="tabpanel">
						<h2>Your Validator</h2>
					<div className="mcrow">
						<table>
							<thead>
								<tr>
								<th>&nbsp;</th>
								<th>&nbsp;</th>
								<th>Status</th>
								<th>&nbsp;</th>
							</tr>
							</thead>
							<tbody>
								<tr>
									<td><span>Registered</span></td>
									<td>Oxab14..........</td>
									<td>Awaiting Activation</td>
									<td><form><input type="checkbox"/></form></td>
								</tr>
								<tr>
									<td><span>Validators</span></td>
									<td>Oxch97..........</td>
									<td>Activated</td>
									<td><form><input type="checkbox"/></form></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="mcrow margins1">
						<table>
							<thead>
								<tr>
								<th>&nbsp;</th>
								<th>&nbsp;</th>
								<th>Status</th>
								<th>&nbsp;</th>
							</tr>
							</thead>
							<tbody>
								<tr>
									<td><span>Unregistered</span></td>
									<td>Oxab56..........</td>
									<td>Join the Pool!</td>
									<td><form><input type="checkbox"/></form></td>
								</tr>
								<tr>
									<td><span>Validators</span></td>
									<td>Oxch32..........</td>
									<td>Join the Pool!</td>
									<td><form><input type="checkbox"/></form></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="mcrow1 margins1">
						<div className="form-group form-check">
							<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
							<label className="form-check-label">Before you register, have you read our FAQ to understand how the pool functions?</label>
						</div>
						<div className="form-group form-check">
							<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
							<label className="form-check-label" >The 1 ETH you’re staking to the protocol will be slashed (added to the pool) and your validator will be unregistered if you propose a block with the incorrect fee recipient. Have you updated the fee recipient associated with all validators being registered to the pool?</label>
						</div>
						<div className="form-group form-check">
							<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
							<label className="form-check-label" >Please verify the fee recipient is 0x33450…………………..</label>
						</div>
					</div>
					<div className="fixebtn"><a href="#" className="uniqbtn">Stake 1 ETH & Register </a></div>
					</div>
					<div className="tab-pane" id="tabs-2" role="tabpanel">
						<h2>Register Validator</h2>
					<div className="mcrow">
						<table>
							<thead>
								<tr>
								<th>Pub Key</th>
								<th>Available for Withdrawal</th>
								<th>Lifetime Rewards</th>
								<th>Days till Rebalance</th>
							</tr>
							</thead>
							<tbody>
								<tr>
									<td>0xab14……</td>
									<td>0.175</td>
									<td>3.21</td>
									<td>7</td>
								</tr>
								<tr>
									<td>0xab97……</td>
									<td>0.175</td>
									<td>2.76</td>
									<td>7</td>
								</tr>
							</tbody>
						</table>
					</div>

				<h2 className="margins2">Penalties</h2>
					<div className="mcrow margins1">
						<table>
							<thead>
								<tr>
								<th>Pub Key</th>
								<th>Deposit Balance</th>
								<th>Missed Proposals</th>
								<th>Slashings</th>
							</tr>
							</thead>
							<tbody>
								<tr>
									<td>0xab14……</td>
									<td>0.175</td>
									<td>3.21</td>
									<td>7</td>
								</tr>
								<tr>
									<td>0xab97……</td>
									<td>0.175</td>
									<td>2.76</td>
									<td>7</td>
								</tr>
							</tbody>
						</table>
					</div>
					</div>
					<div className="tab-pane" id="tabs-3" role="tabpanel">
						<div className="fullhegigth">
					<h2>Active Validators</h2>
					<div className="mcrow">
						<table>
							<thead>
								<tr>
								<th>Pub Key</th>
								<th>Available for Withdrawal</th>
								<th>&nbsp;</th>
							</tr>
							</thead>
							<tbody>
								<tr>
									<td>Oxab14..........</td>
									<td>0.175</td>
									<td><form><input type="checkbox"/></form></td>
								</tr>
								<tr>
									<td>Oxch97..........</td>
									<td>0.175</td>
									<td><form><input type="checkbox"/></form></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="fixebtn"><a href="#" className="uniqbtn">Claim Rewards</a></div>
				</div>
					</div>
					<div className="tab-pane" id="tabs-4" role="tabpanel">
						<div className="fullhegigth">
					<h2>Register Validator</h2>
					<div className="mcrow">
						<table>
							<thead>
								<tr>
								<th>Pub Key</th>
								<th>Status</th>
								<th>&nbsp;</th>
							</tr>
							</thead>
							<tbody>
								<tr>
									<td>Oxab14..........</td>
									<td>Active</td>
									<td><form><input type="checkbox"/></form></td>
								</tr>
								<tr>
									<td>Oxch97..........</td>
									<td>Awaiting Activation</td>
									<td><form><input type="checkbox"/></form></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="fixebtn"><a href="#" className="uniqbtn">Exit Pool</a></div>
				</div>
					</div>
				</div>
			<Footer />
    </div>
  );
}

export default Dashboard;
