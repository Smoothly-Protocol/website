import React, {useEffect, useState} from 'react';
import { utils } from "ethers";
import { useAccount } from 'wagmi';
import { hexEncode } from '../utils/hex';
import { useContract } from '../utils/constants';

const Register = ({validators, registrants}: {validators: any, registrants: any}) => {
  //const contract = useContract();
  const [selectedValidators, setSelectedValidators] = useState([]);

  const updateSelectedValidators = () => {
		const arg: Array<string> = [];
		const pubKey: any = document.getElementsByClassName("pubKey");
		for(let i = 0; i < pubKey.length; i++) {
			if(pubKey[i].checked) {
				arg.push(hexEncode(pubKey[i].value));
			}
		}
		setSelectedValidators(arg);
  }

	const register = async () => {
		try	{
		  const faq: any = document.getElementById("readFAQ");
		  const stake: any = document.getElementById("stakeInfo");
		  const feeRecipient: any = document.getElementById("feeRecipient");
			if(faq.checked && stake.checked && feeRecipient.checked ) {
				if(selectedValidators.length > 0) {
/*
					const tx = await contract.registerBulk(selectedValidators, 
					{
						value: utils.parseEther("0.65").mul(selectedValidators.length)
					});
					await tx.wait();
*/
					alert("Successfully registered on contract, still need to verify");
				} else {
					alert("No validators selected");
				}
			} else {
				alert("Please make sure you are aware of all our guidelines first");
			}
		} catch(err) {
			console.log(err);
		}	
	}

  return(
    <div className="tab-pane active" id="tabs-1" role="tabpanel">
      <h2>Your Validators</h2>
    <div className="mcrow">
      <table>
        <thead>
          <tr>
          <th>Registered</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
          {validators.map((validator: any, key: any) => (
          <tr key={key}>
            <td>{`${validator.pubKey.slice(0,18)}....${validator.pubKey.slice(80)}`}</td>
            <td>Activated</td>
          </tr>
					))}
        </tbody>
      </table>
    </div>
    <div className="mcrow margins1">
      <table>
        <thead>
          <tr>
          <th>Unregistered</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
          {registrants.map((validator: any, key: any) => (
          <tr key={key}>
            <td>{`${validator.slice(0,18)}....${validator.slice(80)}`}</td>
            <td>Join the Pool!</td>
            <td><form><input 
							type="checkbox" 
							className="pubKey" 
							onChange={updateSelectedValidators}
							value={validator}
						/>
						</form></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mcrow1 margins1">
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="readFAQ"/>
        <label className="form-check-label">Before you register, have you read our FAQ to understand how the pool functions?</label>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="stakeInfo"/>
        <label className="form-check-label" >The 0.65 ETH you’re staking to the protocol will be slashed (added to the pool) and your validator will be unregistered if you propose a block with the incorrect fee recipient. Have you updated the fee recipient associated with all validators being registered to the pool?</label>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="feeRecipient"/>
        <label className="form-check-label" >Please verify the fee recipient is 0x33450…………………..</label>
      </div>
    </div>
    <div className="fixebtn"><a href="#" onClick={register} className="uniqbtn">Stake {selectedValidators.length * 0.65} ETH & Register </a></div>
    </div>
  );
}

export default Register;
