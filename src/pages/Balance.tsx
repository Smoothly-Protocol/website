import React, { useState, useEffect } from 'react';
import { utils } from "ethers";
import { hexToChar } from '../utils/hex';

const Balance = ({validators}: {validators: any}) => {
  return (
      <div className="tab-pane" id="tabs-2" role="tabpanel">
        <h2>Registered Validator</h2>
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
						{validators.map((validator: any, key: any) => (
						<tr key={key}>
							<td>{`${validator.pubKey.slice(0,18)}....${validator.pubKey.slice(80)}`}</td>
              <td>{validator.rewards}</td>
              <td>{validator.rewards}</td>
              <td>5</td>
            </tr>
						))}
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
						{validators.map((validator: any, key: any) => (
						<tr key={key}>
							<td>{`${validator.pubKey.slice(0,18)}....${validator.pubKey.slice(80)}`}</td>
              <td>{validator.stake}</td>
              <td>{validator.rewards}</td>
              <td>{validator.slashes}</td>
            </tr>
						))}
          </tbody>
        </table>
      </div>
      </div>
  );
}

export default Balance;
