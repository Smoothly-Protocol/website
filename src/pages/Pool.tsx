import React from 'react';

const Pool = () => {
  return (
		<div className="tab-pane" id="tabs-5" role="tabpanel">
			<h2>Pool Stats</h2>
			<div className="mcrow rd1">
					<table>
							<thead>
									<tr>
											<th>Activated validators</th>
											<th>Validators awaiting activation</th>
											<th>Total value this period</th>
											<th>Total value</th>
											<th>Average Value</th>
									</tr>
							</thead>
							<tbody>
									<tr>
											<td>50</td>
											<td>10</td>
											<td>3.21</td>
											<td>7</td>
											<td>10</td>
									</tr>
							</tbody>
					</table>
			</div>

			<h2 className="margins2">Pool Penalties</h2>
			<div className="mcrow rd1 margins1">
					<table>
							<thead>
									<tr>
											<th>Fee Recipient Slashings</th>
											<th>Missed Proposal Slashings</th>
											<th>Voluntary Exit Slashings</th>
											<th>Total value from slashings</th>
									</tr>
							</thead>
							<tbody>
									<tr>
											<td>5</td>
											<td>15</td>
											<td>3.21</td>
											<td>7</td>
									</tr>
							</tbody>
					</table>
			</div>
		</div>
  );
};

export default Pool;
