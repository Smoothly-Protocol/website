import React from 'react';

const Exit = () => {
  return(
      <div className="tab-pane" id="tabs-4" role="tabpanel">
        <div className="fullhegigth">
      <h2>Register Validator</h2>
      <div className="mcrow">
        <table>
          <thead>
            <tr>
            <th>Pub Key</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oxab14..........</td>
              <td>Active</td>
              <td><form><input type="checkbox"/></form></td>
            </tr>
            <tr>
              <td>Oxch97..........</td>
              <td>Awaiting Activation</td>
              <td><form><input type="checkbox"/></form></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="fixebtn"><a href="#" className="uniqbtn">Exit Pool</a></div>
    </div>
      </div>
  );
}

export default Exit;
