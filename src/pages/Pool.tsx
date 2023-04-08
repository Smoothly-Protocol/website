import { utils } from 'ethers';
import { STAKE_FEE, MISS_FEE } from "../utils/constants";
import React, {useState, useEffect }from 'react';

const Pool = () => {
  const [stats, setStats] = useState({
		awaiting_activation: 0,
		activated: 0,
		total_rewards: 0, 
		total_stake: 0,
		total_value: 0, 
		total_withdrawals: 0,
		total_value_period: 0,
		average_value: 0,
		total_miss: 0,
		total_fee: 0  
  });

  const getPoolStats = async () => {
    try {
      const response = await fetch(`http://localhost:4000/poolstats`);
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
											<th className="text-center">Total Rewards</th>
											<th className="text-center">Total Stake</th>
											<th className="text-center">Total value</th>
											<th className="text-center">Total value this period</th>
											<th className="text-center">Average Value</th>
									</tr>
							</thead>
							<tbody>
									<tr>
											<td className="text-center">{stats.activated}</td>
											<td className="text-center">{stats.awaiting_activation}</td>
											<td className="text-center">{utils.formatEther(stats.total_rewards)}</td>
											<td className="text-center">{utils.formatEther(stats.total_stake)}</td>
											<td className="text-center">{utils.formatEther(stats.total_value)}</td>
											<td className="text-center">{utils.formatEther(stats.total_value_period)}</td>
											<td className="text-center">{utils.formatEther(stats.average_value)}</td>
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
										  <td className="text-center">
                      {utils.formatEther(
                        STAKE_FEE.mul(stats.total_fee).add(MISS_FEE.mul(stats.total_miss)) 
                      )}
                      </td>
									</tr>
							</tbody>
					</table>
			</div>
		</div>
  );
};

export default Pool;
