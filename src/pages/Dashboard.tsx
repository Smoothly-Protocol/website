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

import { HashLoader } from 'react-spinners';

const Dashboard = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [ loading, setLoading ] = useState(true);
  const [ validators, setValidators ] = useState([]);
  const [ regValidators, setRegValidators ] = useState([]);

  const getValidators = async () => {
    try {
      const response = await fetch(`node-goerli.smoothly.money/validators/${address}`);
      const data = await response.json();
      setValidators(data.registered);
      setRegValidators(data.unregistered);
    } catch (err) {
      console.log(err);
    } 
  }

  const refreshData = async () => {
    if(signer != null) {
      await getValidators();
      setLoading(false);
    }
  }

  useEffect(() => {
    // Load Initial Validators
    refreshData();
    const updateDataInterval = setInterval(() => {
      refreshData();
    }, 10000);

    return () => clearInterval(updateDataInterval); 
    
  }, [signer]);


return (
  <div id="bgcolorchange" className="d-flex flex-column justify-content-center">
    <Header />
    { !loading &&
    <div className="tab-content maincontent">
      <Register refreshData={refreshData} registrants={regValidators} validators={validators}/>
      <Balance refreshData={refreshData} validators={validators}/>
      <Claim refreshData={refreshData} validators={validators}/>
      <Exit refreshData={refreshData} validators={validators}/>
      <Pool />
    </div>
    }
    <Footer />
  </div>
);
}

export default Dashboard;
