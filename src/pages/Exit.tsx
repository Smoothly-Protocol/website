import React, { useState, useEffect } from 'react';
import { useSigner, useAccount } from 'wagmi';
import { useContract } from '../utils/constants';
import { HashLoader } from 'react-spinners';
import { OverlayTrigger, Popover, Modal, Button } from 'react-bootstrap';
import { getProofArgs } from '../utils/helpers';

const Exit = ({validators, refreshData}: {validators: any, refreshData: Function}) => {
	const { data: signer } = useSigner();
  const { address } = useAccount();
  
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [allowedExit, setAllowedExit] = useState(undefined);
  const [proof, setProof] = useState([]);

  const handleModalClose = () => {
    setShowModal(false);
  }

  const handleModalShow = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  }

  const exit = async () => {
    try{
      // Handle 0 selected 
      if(proof.length < 1) {
        setLoading(false);
        return handleModalShow("Error", "No Validators allowed to exit");
      }
      const contract = useContract(signer);
			const tx = await contract.withdrawStake(proof[0], proof[1], proof[2]);
			await tx.wait();
      setLoading(false);
      handleModalShow("Success", "Exited protocol for selected validators");
    } catch(err: any) {
      handleModalShow("Error", "There was an error exiting protocol for selected validators");
    }
  }

  const reqExit = async () => {
    setLoading(true);
    try {
			let input: any = document.getElementsByClassName("validator-exit");
			let arg: Array<number> = [];
      // Get selected Validators
			for(let i = 0; i < input.length; i++) {
				if (input[i].checked) {
					arg.push(Number(input[i].value));
				}
			}
      // Handle 0 selected 
      if(arg.length < 1) {
        setLoading(false);
        return handleModalShow("Error", "No validators selected");
      }
      const contract = useContract(signer);
			const tx = await contract.requestExit(arg);
			await tx.wait();
      setLoading(false);
      handleModalShow("Success", "Exited protocol for selected validators");
    } catch(err) {
      handleModalShow("Error", "There was an error exiting protocol for selected validators");
    }
    refreshData();
    setLoading(false);
  };

  useEffect(() => {
    const getExitProof = async () => {
      try {
        const args = await getProofArgs(address, "exits");
        if(args.length > 0) {
          setAllowedExit(args[1])
          setProof(args)
        }
      } catch(err: any) {
        console.log(err);
      }
    }
    getExitProof();
  }, []);

  return (
      <div className="tab-pane" id="tabs-4" role="tabpanel">
        <div className="fullhegigth">
          <h2>Registered Validators</h2>
          <div className="mcrow">
            <table>
              <thead>
                <tr>
                  <th className="text-center">Validator Index</th>
                  <th className="text-center" >Status</th>
                </tr>  
              </thead>
              <tbody>
                {validators.map((validator: any, key: any) => (
                <tr key={key}>
                  <td className='text-center'>{`${validator.index}`}</td>
                  <td className='text-center'>
                  {(proof.length > 0 && proof[1].includes(validator.index)) ? (
                    <span className={`badge badge-info text-light`}>
                      Allowed Exit
                    </span>
                  ) : ( validator.exitRequested ? (
                    <span className={`badge badge-info text-light`}>
                      Exit Requested
                    </span>
                  ) : (
                    <>
                    <span className={`badge badge-info text-light`}>
                      Request Exit
                    </span>
                    <form><input type="checkbox" className="validator-exit" value={validator.index}/></form>
                    </>
                  ))}
                  </td>
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
              <div className="fixebtn">
              <a href="#" className="uniqbtn" style={{margin: '20px'}} onClick={reqExit}>Request Exit</a>
              <a href="#" className="uniqbtn" style={{margin: '20px'}} onClick={exit}>Exit Pool</a>
              </div>
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
