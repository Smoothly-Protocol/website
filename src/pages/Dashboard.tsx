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

const testValidators = [
  {
    id: 0,
    pubKey: "0xa394dec8e73670bc8e30546990c5ca26bd431c28557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
    rewards: "0.0",
    slashFee: 0,
    slashMiss: 0,
    slashes: "0",
    stake: "0.065",
    state: {
      status: "Active",
      standing: "All Good"
    },
    withdrawals: "0.0"
  },
  {
    id: 1,
    pubKey: "0xa394dec8e73670bc8e3000000ca26bd431c28557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
    rewards: "0.0",
    slashFee: 0,
    slashMiss: 0,
    slashes: "0",
    stake: "0.065",
    state: {
      status: "Active",
      standing: "Okay"
    },
    withdrawals: "0.0"
  },
  {
    id: 2,
    pubKey: "0xa394dec8e73670bc8e9999995ca26bd431c28557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
    rewards: "0.0",
    slashFee: 0,
    slashMiss: 0,
    slashes: "0",
    stake: "0.065",
    state: {
      status: "Active",
      standing: "Bad"
    },
    withdrawals: "0.0"
  },
  {
    id: 3,
    pubKey: "0xa394dec8e73670bc8e3345638888888557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
    rewards: "0.0",
    slashFee: 0,
    slashMiss: 0,
    slashes: "0",
    stake: "0.065",
    state: {
      status: "Active",
      standing: "Forced Exit"
    },
    withdrawals: "0.0"
  },
  {
    id: 4,
    pubKey: "0xa394dec8e73670bc77777734d431c28557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
    rewards: "0.0",
    slashFee: 0,
    slashMiss: 0,
    slashes: "0",
    stake: "0.065",
    state: {
      status: "Awaiting Activation",
      standing: "N/A"
    },
    withdrawals: "0.0"
  },
  {
    id: 5,
    pubKey: "0xa394dec8e73670bc8e3345638888888557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
    rewards: "0.0",
    slashFee: 0,
    slashMiss: 0,
    slashes: "0",
    stake: "0.065",
    state: {
      status: "Awaiting Activation",
      standing: "N/A"
    },
    withdrawals: "0.0"
  },
  {
    id: 6,
    pubKey: "0xa394dec8e73670bc77777734d431c28557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
    rewards: "0.0",
    slashFee: 0,
    slashMiss: 0,
    slashes: "0",
    stake: "0.065",
    state: {
      status: "Active",
      standing: "Forced Exit"
    },
    withdrawals: "0.0"
  }
]
const testRegistrants: any[] = [
  "0xa394dec8e73670bc77777734d431c28557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
  // "0xa394dec8e73670bc77777734d431c28557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
  // "0xa394dec8e73670bc77777734d431c28557149b533c804847a354ad263cb9fcd3f0424a45c805f95b2709dfd",
]
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
            slashFee: 0,
            slashMiss: 0,
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

  const refreshData = () => {
    console.log('refreshing data');
    if(signer != null) {
      getValidators();
      console.log('refreshing data'); // will remove after testing
    }
  }

  useEffect(() => {
    // Load Initial Validators
    refreshData();
    const updateDataInterval = setInterval(() => {
      refreshData();
    }, 60000);

    return () => clearInterval(updateDataInterval); 
    
  }, []);


return (
  <div id="bgcolorchange" className="d-flex flex-column justify-content-center">
    <Header />
    <div className="tab-content maincontent">
      <Register refreshData={refreshData} registrants={regValidators} validators={validators}/>
      <Balance refreshData={refreshData} validators={validators}/>
      <Claim refreshData={refreshData} validators={validators}/>
      <Exit refreshData={refreshData} validators={validators}/>
      <Pool />
    </div>
    <Footer />
  </div>
);
}

export default Dashboard;
