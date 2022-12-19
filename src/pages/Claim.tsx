import React from 'react';

const Claim = () => {
  return(
      <div className="tab-pane" id="tabs-3" role="tabpanel">
        <div className="fullhegigth">
      <h2>Active Validators</h2>
      <div className="mcrow">
        <table>
          <thead>
            <tr>
            <th>Pub Key</th>
            <th>Available for Withdrawal</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oxab14..........</td>
              <td>0.175</td>
              <td><form><input type="checkbox"/></form></td>
            </tr>
            <tr>
              <td>Oxch97..........</td>
              <td>0.175</td>
              <td><form><input type="checkbox"/></form></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="fixebtn"><a href="#" className="uniqbtn">Claim Rewards</a></div>
    </div>
      </div>
  );
}

export default Claim;
