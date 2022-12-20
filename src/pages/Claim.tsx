import React, { useState } from 'react';
import { useSigner } from 'wagmi';
import { useContract } from '../utils/constants';

const Claim = ({validators}: {validators: any}) => {
	const { data: signer } = useSigner();

  const claim = async () => {
    try {
			let input: any = document.getElementsByClassName("validator-claim");
			let arg: Array<number> = [];
			for(let i = 0; i < input.length; i++) {
				if(input[i].checked) {
					arg.push(Number(input[i].value));
				}
			}
      const contract = useContract(signer);
			const tx = await contract.withdrawRewards(arg);
			await tx.wait();
			alert("Successfully exited protocol for selected validators");
    } catch(err) {
      console.log(err);
    }
  };

  return(
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
						{validators.map((validator: any, key: any) => (
						<tr key={key}>
							<td>{`${validator.pubKey.slice(0,18)}....${validator.pubKey.slice(80)}`}</td>
              <td>{validator.rewards}</td>
              <td><form><input type="checkbox" className="validator-claim" value={validator.id}/></form></td>
            </tr>
						))}
          </tbody>
        </table>
      </div>
      <div className="fixebtn"><a href="#" onClick={claim} className="uniqbtn">Claim Rewards</a></div>
    </div>
      </div>
  );
}

export default Claim;
