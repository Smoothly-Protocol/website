import React, { useState, useEffect } from 'react';
import { utils } from "ethers";
import { useSigner } from 'wagmi';
import { hexToChar } from '../utils/hex';
import { useContract } from '../utils/constants';

const Balance = ({validators}: {validators: any}) => {
	const { data: signer } = useSigner();
  const addStake = async () => {
    try {
      for(let i = 0; i < validators.length; i++) {
        if(validators[i].stake < utils.parseEther("0.065")) {
          const contract = useContract(signer);
          const amount = utils.parseEther(String(0.065 - Number(validators[i].stake)));
          const tx = await contract.addStake(validators.id, {value: amount });
          await tx.wait();
          alert("Successfully added stake");
        } 
      } 
    } catch(err) {
      console.log(err);
    }
  }

  const daysTillRebalance = () => {
    const d = new Date;
    const day = d.getDay();
    if( day > 0 ) {
      return String(7 - day);
    }
    return "0";
  }

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
              <td>{validator.withdrawals}</td>
              <td>{`${daysTillRebalance()}`}</td>
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
            <th>Slashings</th>
          </tr>
          </thead>
          <tbody>
						{validators.map((validator: any, key: any) => (
						<tr key={key}>
							<td>{`${validator.pubKey.slice(0,18)}....${validator.pubKey.slice(80)}`}</td>
              <td>{validator.stake}</td>
              <td>{validator.slashes}</td>
            </tr>
						))}
          </tbody>
        </table>
      </div>
      <div className="fixebtn" onClick={addStake}><a href="#" className="uniqbtn">Add Stake</a></div>
      </div>
  );
}

export default Balance;
