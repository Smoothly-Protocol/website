import React, {useEffect, useState} from 'react';
import { utils } from "ethers";
import { useSigner } from 'wagmi';
import { hexEncode } from '../utils/hex';
import { useContract } from '../utils/constants';

const Register = ({validators, registrants}: {validators: any, registrants: any}) => {
	const { data: signer } = useSigner();
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
      const contract = useContract(signer);
		  const stake: any = document.getElementById("stakeInfo");
		  const feeRecipient: any = document.getElementById("feeRecipient");
			if( stake.checked && feeRecipient.checked ) {
				if(selectedValidators.length > 0) {
					const tx = await contract.registerBulk(selectedValidators, 
					{
						value: utils.parseEther("0.065").mul(selectedValidators.length)
					});
					await tx.wait();
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
          <th>Standing</th>
        </tr>
        </thead>
        <tbody>
          {validators.map((validator: any, key: any) => (
          <tr key={key}>
            <td>{`${validator.pubKey.slice(0,18)}....${validator.pubKey.slice(80)}`}</td>
            <td>{validator.state.status}</td>
            <td>{validator.state.standing}</td>
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
        <input type="checkbox" className="form-check-input" id="stakeInfo"/>
        <label className="form-check-label" >I've read the Smoothly <a href="">docs</a> and understand how the pool functions</label>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="feeRecipient"/>
        <label className="form-check-label" >Please verify the fee recipient is 0xAF4248Dc6F4748CdaF15924685f69fe8B60fa9F7</label>
      </div>
    </div>
    <div className="fixebtn"><a href="#" onClick={register} className="uniqbtn">Stake {selectedValidators.length * 0.065} ETH & Register </a></div>
    </div>
  );
}

export default Register;
