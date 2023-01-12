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
import Pool from './Pool';

const Dashboard = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [ validators, setValidators ] = useState([]);
  const [ regValidators, setRegValidators ] = useState([]);

  const getValidatorState = async (pubKey: string) => {
    try {
      const response = await fetch(`https://api-goerli.smoothly.money/validatorstatus/${pubKey}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const withdrawals = async (v: string) => {
    try {
      const response = await fetch(`https://api-goerli.smoothly.money/withdrawals/${v}`);
      const data = await response.json();
      return utils.formatEther(data.total_withdrawals);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    const getBalance = async () => {
      try {
        const contract = useContract(signer);
        const b = await contract.getValidators();
        let _validators: any = [];
        for(let i = 0; i < b.length; i++) {
          if(b[i][0] !== "0x") {
            const pubKey = hexToChar(b[i][0]);
            _validators.push({
              pubKey: pubKey,
              rewards: utils.formatUnits(b[i][1], "ether"), 
              slashes: String(b[i][2]),
              stake: utils.formatUnits(b[i][3], "ether"),
              id: i,
              state: await getValidatorState(pubKey),
              withdrawals: await withdrawals(pubKey)
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
                let flag = false;
                registered.map((val: any) => {
                  if(validator.publickey === val.pubKey) {
                    setValidators(current => [...current, val]);
                    flag = true;
                  }
                });		
                flag ? null : setRegValidators(current => [...current, validator.publickey]);
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
      <Pool />
    </div>
    <Footer />
  </div>
);
}

export default Dashboard;
