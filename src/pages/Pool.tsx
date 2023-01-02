import React, {useState, useEffect }from 'react';

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
      const response = await fetch("http://localhost:4000/poolstats");
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
											<th>Activated validators</th>
											<th>Validators awaiting activation</th>
											<th>Total value this period</th>
											<th>Total value</th>
											<th>Average Value</th>
									</tr>
							</thead>
							<tbody>
									<tr>
											<td>{stats.activated_validators}</td>
											<td>{stats.awaiting_activation_validators}</td>
											<td>{stats.total_value_period}</td>
											<td>{stats.total_value}</td>
											<td>{stats.average_value}</td>
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
											<th>Total value from slashings</th>
									</tr>
							</thead>
							<tbody>
									<tr>
											<td>{stats.total_fee}</td>
											<td>{stats.total_miss}</td>
										  <td>{(stats.total_fee * 0.05) + (stats.total_miss * 0.015)}</td>
									</tr>
							</tbody>
					</table>
			</div>
		</div>
  );
};

export default Pool;
