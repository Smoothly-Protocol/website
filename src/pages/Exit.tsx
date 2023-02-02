import React, { useState } from 'react';
import { useSigner } from 'wagmi';
import { useContract } from '../utils/constants';
import { HashLoader } from 'react-spinners';
import { OverlayTrigger, Popover, Modal, Button } from 'react-bootstrap';

const Exit = ({validators, refreshData}: {validators: any, refreshData: Function}) => {
	const { data: signer } = useSigner();
  
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
  }

  const handleModalShow = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  }

  const exit = async () => {
    setLoading(true);
    try {
			let input: any = document.getElementsByClassName("validator-exit");
			let arg: Array<number> = [];
			for(let i = 0; i < input.length; i++) {
				if (input[i].checked) {
					arg.push(Number(input[i].value));
				}
			}
			console.log(arg);
      const contract = useContract(signer);
			const tx = await contract.exit(arg);
			await tx.wait();
      setLoading(false);
			// alert("Successfully exited protocol for selected validators");
      handleModalShow("Success", "Exited protocol for selected validators");
    } catch(err) {
      console.log(err);
      handleModalShow("Error", "There was an error exiting protocol for selected validators");
    }
    refreshData();
    setLoading(false);
  };

  return (
      <div className="tab-pane" id="tabs-4" role="tabpanel">
        <div className="fullhegigth">
          <h2>Registered Validators</h2>
          <div className="mcrow">
            <table>
              <thead>
                <tr>
                  <th>Public Key</th>
                  <th>&nbsp;</th>
                </tr>  
              </thead>
              <tbody>
                {validators.map((validator: any, key: any) => (
                <tr key={key}>
                  <td>{`${validator.pubKey.slice(0,18)}....${validator.pubKey.slice(80)}`}</td>
                  <td><form><input type="checkbox" className="validator-exit" value={validator.id}/></form></td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          {validators.length > 0 && (loading ? 
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
              <div className="fixebtn"><a href="#" className="uniqbtn" onClick={exit}>Exit Pool</a></div>
            )
          )}
        </div>
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

export default Exit;
