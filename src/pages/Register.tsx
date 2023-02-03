import React, {useEffect, useState} from 'react';
import { utils } from "ethers";
import { useSigner } from 'wagmi';
import { hexEncode } from '../utils/hex';
import { contractAddress } from '../utils/constants';
import { useContract } from '../utils/constants';
import { statusBadgeColor, standingBadgeColor } from '../utils/badgeColors';
import { HashLoader } from 'react-spinners';
import { OverlayTrigger, Popover, Modal, Button } from 'react-bootstrap';

const Register = ({validators, registrants, refreshData}: {validators: any, registrants: any, refreshData: Function}) => {
	const { data: signer } = useSigner();
  const [selectedValidators, setSelectedValidators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
    setLoading(false);
  }

  const handleModalShow = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  }

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
    setLoading(true);
		try	{
      const contract = useContract(signer);
		  const stake: any = document.getElementById("stakeInfo");
		  const boost: any = document.getElementById("boostInfo");
		  const feeRecipient: any = document.getElementById("feeRecipient");
			if (stake.checked && feeRecipient.checked && boost) {
				if (selectedValidators.length > 0) {
					const tx = await contract.registerBulk(selectedValidators, 
					{
						value: utils.parseEther("0.065").mul(selectedValidators.length)
					});
					await tx.wait();
          handleModalShow("Success", "Registered on contract, still need to verify");
				} else {
          handleModalShow("Error", "No validators selected");
				}
			} else {
        handleModalShow("Error", "Please make sure you are aware of all our guidelines first");
			}
		} catch(err) {
			console.log(err);
		}
    setLoading(false);
    refreshData();
	}

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
    <div className="tab-pane active" id="tabs-1" role="tabpanel">
      <h2>Registered Validators</h2>
      <div className="mcrow">
        <table>
          <thead>
            <tr>
            <th className="text-center">Public Key</th>
            <th  className="text-center">Status</th>
            <th  className="text-center">Standing</th>
          </tr>
          </thead>
          <tbody>
            {validators.map((validator: any, key: any) => (
            <tr key={key}>
              <td className='d-flex align-middle'>{`${validator.pubKey.slice(0,19)}...`}<i onClick={() => navigator.clipboard.writeText(validator.pubKey)} className="copy-button fa fa-clone fa-lg"></i></td>
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
      {registrants.length > 0 && (
        <div>
          <h2 className="margins1">Unregistered Validators</h2>
          <div className="mcrow margins1">
            <table>
              <thead>
                <tr>
                  <th className="text-center">Public Key</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Join the Pool!</th>
                </tr>
              </thead>
              <tbody>
                {registrants.map((validator: any, key: any) => (
                <tr key={key}>
                  <td className='d-flex align-middle'>{`${validator.slice(0,19)}...`}<i onClick={() => navigator.clipboard.writeText(validator)} className="copy-button fa fa-clone fa-lg"></i></td>
                  <td className="text-center"><span className="badge badge-secondary text-light">Inactive</span></td>
                  <td className="text-center">
                    <form><input 
                    type="checkbox" 
                    className="pubKey" 
                    onChange={updateSelectedValidators}
                    value={validator}
                  />
                  </form>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mcrow1 margins1">
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="stakeInfo"/>
              <label className="form-check-label">I've read the Smoothly <a href="https://0xsmoothly.notion.site/">Documentation</a> and understand how the pool functions</label>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="boostInfo"/>
              <label className="form-check-label">Running MEV Boost is strongly encouraged to increase rewards for pool members.</label>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="feeRecipient"/>
              <label className="form-check-label">
                <span className="d-flex align-middle gap-2">
                  Please verify the fee recipient is {contractAddress}
                  <i onClick={() =>  navigator.clipboard.writeText(contractAddress)} className="copy-button fa fa-clone fa-lg"></i>
                </span>
              </label>
            </div>
          </div>
        </div>)
      }
      {registrants.length > 0 && (
        loading ? 
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
          (<div className="fixebtn">
            <a href="#" onClick={register} className="uniqbtn">
              Deposit {selectedValidators.length * 0.065} ETH & Register
            </a>
          </div>)
        )}
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

export default Register;
