import React, { useState } from 'react';
import { useSigner } from 'wagmi';
import { useContract } from '../utils/constants';
import formatEthAmount from '../utils/formatEthAmount';
import { OverlayTrigger, Popover, Modal, Button } from 'react-bootstrap';

const Claim = ({validators}: {validators: any}) => {
	const { data: signer } = useSigner();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const claim = async () => {
    try {
			let input: any = document.getElementsByClassName("validator-claim");
			let arg: Array<number> = [];
			for(let i = 0; i < input.length; i++) {
				if(input[i].checked) {
					arg.push(Number(input[i].value));
				}
			}
      const contract = useContract(signer);
			const tx = await contract.withdrawRewards(arg);
			await tx.wait();
      handleModalShow("Success", "Exited protocol for selected validators!")
			// alert("Successfully exited protocol for selected validators");
    } catch(err) {
      handleModalShow("Error", "No rewards are able to be claimed. Make sure you have unclaimed rewards before attempting to claim.")
      console.log(err);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalTitle("");
    setModalMessage("");
  }

  const handleModalShow = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
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
      <div className="tab-pane" id="tabs-3" role="tabpanel">
        <div className="fullhegigth">
          <h2>Active Validators</h2>
          <div className="mcrow">
            <table>
              <thead>
                <tr>
                  <th className="text-center">Pub Key</th>
                  <th className="text-center">Unclaimed Rewards</th>
                  <th>&nbsp;</th>
              </tr>
              </thead>
              <tbody>
                {validators
                // .filter((validator: any) => {
                //   if (validator.state.status === "Active") {
                //     return validator;
                //   }
                // })
                .map((validator: any, key: any) => (
                  <tr key={key}>
                    <td className='d-flex gap-2 align-middle text-center'>{`${validator.pubKey.slice(0,19)}...`}<i onClick={() =>  navigator.clipboard.writeText(validator.pubKey)} className="copy-button fa fa-clone fa-lg"></i></td>
                    <td className="text-center">{formatEthAmount(validator.rewards)}</td>
                    <td className="text-center">
                      {validator.state.status === "Awaiting Activation" ? (
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={standingPopover(validator.state.standing)}>
                          <span className="cursor-pointer">❓</span>
                        </OverlayTrigger>
                        ) :(
                          <form>
                            <input type="checkbox" className="validator-claim" value={validator.id}/>
                          </form>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fixebtn"><a href="#" onClick={claim} className="uniqbtn">Claim Rewards</a></div>
        </div>
        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
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

export default Claim;
