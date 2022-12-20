import React, { useEffect, useState } from 'react';
import { utils, Contract } from "ethers";
import { useAccount, useSigner } from 'wagmi';
import { useContract } from '../utils/constants';
import { hexToChar } from '../utils/hex';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Register from './Register';
import Balance from './Balance';
import Claim from './Claim';
import Exit from './Exit';

const Dashboard = () => {
  const { address } = useAccount();
	const { data: signer } = useSigner();
  const [ validators, setValidators ] = useState([]);
  const [ regValidators, setRegValidators ] = useState([]);

  useEffect(() => {

		const getBalance = async () => {
			try {
				const contract = useContract(signer);
				const b = await contract.getValidators();
				let _validators: any = [];
				for(let i = 0; i < b.length; i++) {
					if(b[i][0] !== "0x") {
						_validators.push({
							pubKey: hexToChar(b[i][0]),
							rewards: utils.formatUnits(b[i][1], "ether"), 
							slashes: String(b[i][2]),
							stake: utils.formatUnits(b[i][3], "ether"),
							id: i
						});	
					}
				}
				return _validators;
			} catch (err) {
				console.log(err);
			}
		}

    const getValidators = async () => {
      try {
        const url = `https://goerli.beaconcha.in/api/v1/validator/eth1/${address}`;
        const res = await fetch(url);
        const { data } = await res.json();
				const registered = await getBalance();
			
        if(data.length > 0) {
          setValidators([]);
          setRegValidators([]);
          data.map((validator: any) => {
						if(validator.validatorindex != null) {
							const isReg = registered.map((val: any) => {
								if(validator.publickey === val.pubKey) {
									setValidators(current => [...current, val]);
									return true;
								}
							});		
							isReg ? null : setRegValidators(current => [...current, validator.publickey]);
						}
					});
        } else {
					setValidators([]);
				}
      } catch(err) {
        console.log(err);
      }
    }
		
		// Load Validators
		if(signer != null) {
			getValidators();
		}

  },[ signer ]);

  return (
    <div id="bgcolorchange">
			<Header />
				<div className="tab-content maincontent">
          <Register registrants={regValidators} validators={validators}/>
          <Balance validators={validators}/>
					<Claim validators={validators}/>
					<Exit validators={validators}/>
				</div>
			<Footer />
    </div>
  );
}

export default Dashboard;
