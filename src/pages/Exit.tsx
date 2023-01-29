import React from 'react';
import { useSigner } from 'wagmi';
import { useContract } from '../utils/constants';

const Exit = ({validators}: {validators: any}) => {
	const { data: signer } = useSigner();

  const exit = async () => {
    try {
			let input: any = document.getElementsByClassName("validator-exit");
			let arg: Array<number> = [];
			for(let i = 0; i < input.length; i++) {
				if(input[i].checked) {
					arg.push(Number(input[i].value));
				}
			}
			console.log(arg);
      const contract = useContract(signer);
			const tx = await contract.exit(arg);
			await tx.wait();
			alert("Successfully exited protocol for selected validators");
    } catch(err) {
      console.log(err);
    }
  };
  return(
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
          <div className="fixebtn"><a href="#" className="uniqbtn" onClick={exit}>Exit Pool</a></div>
        </div>
      </div>
  );
}

export default Exit;
