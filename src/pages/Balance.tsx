import React, { useState, useEffect } from 'react';
import { utils } from "ethers";
import { useSigner } from 'wagmi';
import { hexToChar } from '../utils/hex';
import { useContract } from '../utils/constants';
import { statusBadgeColor, standingBadgeColor } from '../utils/badgeColors';
import formatEthAmount from '../utils/formatEthAmount';
import { OverlayTrigger, Popover, Button, Modal } from 'react-bootstrap';
import { HashLoader } from 'react-spinners';

const Balance = ({validators, refreshData}: {validators: any, refreshData: Function}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
  }

  const handleModalShow = (title: string, message: string) => {
    setModalMessage(message);
    setModalTitle(title);
    setShowModal(true);
  }
  const { data: signer } = useSigner();
  const addStake = async () => {
    setLoading(true);
    try {
      for(let i = 0; i < validators.length; i++) {
        if(utils.parseEther(validators[i].stake).lt(utils.parseEther("0.065"))) {
          const contract = useContract(signer);
          const amount = utils.parseEther(String(0.065 - Number(validators[i].stake)));
          const tx = await contract.addStake(Number(validators[i].id), {value: amount});
          await tx.wait();
          handleModalShow("Success", "Your stake was added to the pool!")
        }
      } 
      setLoading(false);
    } catch(err) {
      handleModalShow("Error", "Something went wrong. Your stake was not added to the pool.")
        console.log(err);
    }
    refreshData();
    setLoading(false);
  }

  const daysTillRebalance = () => {
    const d = new Date;
    const day = d.getDay();
    if( day > 0 ) {
      return String(7 - day);
    }
    return "0";
  }  

  const popover = (
      <Popover id="popover-basic">
      <Popover.Body>
      You aren't able to withdraw until activated.
      </Popover.Body>
      </Popover>
      );

  const standingPopover = (standing: string) => {
    let message;
    if (standing === "Okay") {
      message = "Verify your validator configuration, you've missed a proposal";
    }
    else if (standing === "Bad") {
      message = `You've missed another proposal, 0.015 ETH has been taken from your insurance deposit and added to the pool. 
        Top up your Insurance to be included in future rebalances.`;
    }
    else if (standing === "Forced Exit") {
      message = `You proposed a block with the wrong fee recipient, 0.5 ETH has been taken from your insurance deposit and 
        you have been removed from the pool index`;
    }
    else {
      message = "Only Active validators are given a standing, awaiting block proposal"
    }
    return (
        <Popover id="popover-basic">
        <Popover.Body>
        {message}
        </Popover.Body>
        </Popover>
        )
  };

  return (
      <div className="tab-pane balance-page" id="tabs-2" role="tabpanel">
      <h2>Rewards</h2>
      <div className="mcrow">
      <table>
      <thead>
      <tr>
      <th className="text-center">Public Key</th>
      <th className="text-center">Unclaimed Rewards</th>
      <th className="text-center">Claimed Rewards</th>
      <th className="text-center">Days till Rebalance</th>
      <th className="text-center">Status</th>
      </tr>
      </thead>
      <tbody>
      {validators.map((validator: any, key: any) => (
            <tr key={key}>
            <td className='d-flex align-middle'>{`${validator.pubKey.slice(0,19)}...`}<i onClick={() =>  navigator.clipboard.writeText(validator.pubKey)} className="copy-button fa fa-clone fa-lg"></i></td>
            <td className={`text-center ${validator.state.status !== "Awaiting Activation" ? '' : 'pl-ch'}`}>
            {formatEthAmount(validator.rewards)}
            {validator.state.status !== "Awaiting Activation" ? null : (
                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popover}>
                <span>
                {<span className="cursor-pointer">❗️</span>}
                </span>
                </OverlayTrigger>
                )}
            </td>
            <td className="text-center">{formatEthAmount(validator.withdrawals)}</td>
            <td className="text-center">{`${daysTillRebalance()}`}</td>
            <td className="text-center">
            <span className={`badge ${statusBadgeColor(validator.state.status)} text-light`}>
            {validator.state.status}
            </span>
            </td>
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
    <th className="text-center">Public Key</th>
    <th className="text-center">Deposit Balance</th>
    <th className="text-center">Penalties</th>
    <th className="text-center">Status</th>
    <th className="text-center">Standing</th>
    </tr>
    </thead>
    <tbody>
    {validators.map((validator: any, key: any) => (
          <tr key={key}>
          <td className='d-flex align-middle'>{`${validator.pubKey.slice(0,19)}...`}<i onClick={() =>  navigator.clipboard.writeText(validator.pubKey)} className="copy-button fa fa-clone fa-lg"></i></td>
          <td className="text-center">{formatEthAmount(validator.stake)}</td>
          <td className="text-center">{validator.slashes}</td>
          <td className="text-center">
          <span className={`badge ${statusBadgeColor(validator.state.status)} text-light`}>
          {validator.state.status}
          </span>
          </td>
          <td className="text-center">
          <span className={`badge ${standingBadgeColor(validator.state.standing)} text-light`}>
          {validator.state.standing}{' '}
          {validator.state.standing !== "All Good" &&
          <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={standingPopover(validator.state.standing)}>
          <span className="text-light">
          <i className="fa fa-info-circle fa-md" aria-hidden="true"></i>
          </span>
          </OverlayTrigger>
          }
          </span>
            </td>
            </tr>
            ))}
  </tbody>
    </table>
    </div>
    {loading ? 
      (
       <div className="d-flex flex-row fixebtn justify-content-center">
       <HashLoader
       color={'#bc519a'}
       loading={loading}
       size={50}
       aria-label="Loading Spinner"
       data-testid="loader"
       />
       </div>
      )
        :
          (
           <div className="fixebtn" onClick={addStake}>
           <a href="#" className="uniqbtn">Top Up Deposit</a>
           </div>
          )
    }
  <Modal show={showModal} onHide={handleModalClose} centered>
    <Modal.Header closeButton>
    <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {modalMessage}
  </Modal.Body>
    <Modal.Footer>
    <Button onClick={handleModalClose}>Close</Button>
    </Modal.Footer>
    </Modal>
    </div>
    );
}

export default Balance;
