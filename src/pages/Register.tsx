import React, {useEffect, useState} from 'react';
import { utils } from "ethers";
import { useSigner } from 'wagmi';
import { hexEncode } from '../utils/hex';
import { contractAddress, STAKE_FEE } from '../utils/constants';
import { standing, status } from '../utils/standing';
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
		const index: any = document.getElementsByClassName("index");
		for(let i = 0; i < index.length; i++) {
			if(index[i].checked) {
				arg.push(index[i].value);
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
						value: STAKE_FEE.mul(selectedValidators.length)
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
      message = `You've missed another proposal, 0.15 ETH has been taken from your insurance deposit and added to the pool. 
                  Top up your Insurance to be included in future rebalances.`;
    }
    else if (standing === "Forced Exit") {
      message = `You proposed a block with the wrong fee recipient, 0.65 ETH has been taken from your insurance deposit and 
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
      {(registrants.length + validators.length === 0) && 
      <>
      <h2>No Validators detected to account</h2>
      </>
      }
      {validators.length > 0 &&
      <>
      <h2>Registered Validators</h2>
      <div className="mcrow">
        <table>
          <thead>
            <tr>
            <th className="text-center">Validator Index</th>
            <th  className="text-center">Status</th>
            <th  className="text-center">Standing</th>
          </tr>
          </thead>
          <tbody>
            {validators.map((validator: any, key: any) => (
            <>    
            {(validator.active || validator.exitRequested) &&
            <tr key={key}>
              <td className='text-center'>{`${validator.index}`}</td>
              <td className="text-center">
                <span className={`badge ${statusBadgeColor(status(validator))} text-light`}>
                  {status(validator)}
                </span>
              </td>
              <td className="text-center">
                    <span className={`badge ${standingBadgeColor(standing(validator))} text-light`}>
                      {standing(validator)}{' '}
                        {standing(validator) !== "All Good" &&
                          <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={standingPopover(standing(validator))}>
                            <span className="text-light">
                              <i className="fa fa-info-circle fa-md" aria-hidden="true"></i>
                            </span>
                          </OverlayTrigger>
                        }
                    </span>
                    {/*status(validator) === "Exited" && 
                      <form><input 
                      type="checkbox" 
                      className="index" 
                      onChange={updateSelectedValidators}
                      value={validator.index}
                    />
                    </form>
                    */}
              </td>
            </tr>
            }
            </>
            ))}
          </tbody>
        </table>
      </div>
      </>
      }
      {(registrants.length > 0 || selectedValidators.length > 0) && (
        <div>
          {registrants.length > 0 &&
          <>
          <h2 className="margins1">Unregistered Validators</h2>
          <div className="mcrow margins1">
            <table>
              <thead>
                <tr>
                  <th className="text-center">Validator index</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Join the Pool!</th>
                </tr>
              </thead>
              <tbody>
                {registrants.map((validator: any, key: any) => (
                <tr key={key}>
                  <td className='text-center'>{`${validator}`}</td>
                  <td className="text-center"><span className="badge badge-secondary text-light">Inactive</span></td>
                  <td className="text-center">
                    <form><input 
                    type="checkbox" 
                    className="index" 
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
          </>
          }
          <div className="mcrow1 margins1">
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="stakeInfo"/>
              <label className="form-check-label">I've read the Smoothly <a href="https://0xsmoothly.notion.site/">Documentation</a> and understand how the pool functions</label>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="boostInfo"/>
              <label className="form-check-label">Running MEV Boost and subscribing to one or more of the approved relays is required.</label>
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
      {(registrants.length > 0 || selectedValidators.length > 0) && (
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
              Deposit {
                utils.formatEther(
                  STAKE_FEE.mul(selectedValidators.length)
                )
              } ETH & Register
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
