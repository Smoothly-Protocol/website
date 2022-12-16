import React, {useEffect, useState} from 'react';
import { hexEncode } from '../utils/utils';

const Register = () => {
  const address = "0x652f827bf81a187d50cce3473c6f867cc1f8f3b3";
  const [validators, setValidators] = useState([]);
  const [selectedValidators, setSelectedValidators] = useState([]);

  useEffect(() => {
    const getValidators = async () => {
      try {
        const url = `https://goerli.beaconcha.in/api/v1/validator/eth1/${address}`;
        const res = await fetch(url);
        const { data } = await res.json();
        if(data.length > 0) {
          const v = data.map((validator: any) => {return validator.publickey});
          setValidators(v);
        }
      } catch(err) {
        console.log(err);
      }
    }
    getValidators();
  },[]);

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
          <tr>
            <td>Oxab14..........</td>
            <td>Awaiting Activation</td>
          </tr>
          <tr>
            <td>Oxch97..........</td>
            <td>Activated</td>
          </tr>
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
          {validators.map((validator: string, key) => (
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
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label">Before you register, have you read our FAQ to understand how the pool functions?</label>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" >The 1 ETH you’re staking to the protocol will be slashed (added to the pool) and your validator will be unregistered if you propose a block with the incorrect fee recipient. Have you updated the fee recipient associated with all validators being registered to the pool?</label>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" >Please verify the fee recipient is 0x33450…………………..</label>
      </div>
    </div>
    <div className="fixebtn"><a href="#" className="uniqbtn">Stake {selectedValidators.length * 1} ETH & Register </a></div>
    </div>
  );
}

export default Register;
