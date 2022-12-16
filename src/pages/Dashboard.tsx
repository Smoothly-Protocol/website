import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Register from '../components/Register';

const Dashboard = () => {
  return (
    <div id="bgcolorchange">
			<Header />
				<div className="tab-content maincontent">
          <Register/>
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
