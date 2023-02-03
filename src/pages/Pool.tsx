import React, {useState, useEffect }from 'react';
import formatEthAmount from '../utils/formatEthAmount';

const Pool = () => {
  const [stats, setStats] = useState({
    activated_validators: 0,
    awaiting_activation_validators: 0,
    total_value_period: 0,
    total_value: 0,
    average_value: 0, 
    total_miss: 0,
    total_fee: 0,
  });

  const getPoolStats = async () => {
    try {
      const response = await fetch("https://api-goerli.smoothly.money/poolstats");
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPoolStats();
  }, []);

  return (
		<div className="tab-pane" id="tabs-5" role="tabpanel">
			<h2>Pool Stats</h2>
			<div className="mcrow rd1">
					<table>
							<thead>
									<tr>
											<th className="text-center">Activated Validators</th>
											<th className="text-center">Validators Awaiting Activation</th>
											<th className="text-center">Total value this period</th>
											<th className="text-center">Total value</th>
											<th className="text-center">Average Value</th>
									</tr>
							</thead>
							<tbody>
									<tr>
											<td className="text-center">{stats.activated_validators}</td>
											<td className="text-center">{stats.awaiting_activation_validators}</td>
											<td className="text-center">{formatEthAmount(stats.total_value_period.toString())}</td>
											<td className="text-center">{formatEthAmount(stats.total_value.toString())}</td>
											<td className="text-center">{formatEthAmount(stats.average_value.toString())}</td>
									</tr>
							</tbody>
					</table>
			</div>

			<h2 className="margins2">Pool Penalties</h2>
			<div className="mcrow rd1 margins1">
					<table>
							<thead>
									<tr>
											<th className="text-center">Fee Recipient Slashings</th>
											<th className="text-center">Missed Proposal Slashings</th>
											<th className="text-center">Total value from slashings</th>
									</tr>
							</thead>
							<tbody>
									<tr>
											<td className="text-center">{stats.total_fee}</td>
											<td className="text-center">{stats.total_miss}</td>
										  <td className="text-center">{formatEthAmount(((stats.total_fee * 0.05) + (stats.total_miss * 0.015)).toString())}</td>
									</tr>
							</tbody>
					</table>
			</div>
		</div>
  );
};

export default Pool;
