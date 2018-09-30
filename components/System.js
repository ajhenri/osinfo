import React from 'react';
import { Clearfix } from 'react-bootstrap';
import styles from '../resources/css/system.css';

const system = require('electron').remote.require('./processes/system');

/**
 * This component contains the upper portion of the Osinfo UI.
 * It is the only UI component that is fixed.
 *
 * @class System
 * @extends {React.Component}
 */
class System extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      systemInformation: {}
    };
  }

  componentDidMount(){
    system.getSystemInformation().then((data) => {
      this.setState({ systemInformation: data });
    });
  }

  render() {
    const si = this.state.systemInformation;
    const battery = si.battery ? si.battery : {};

    return (
      <div className={styles.system}>
        <div className="pull-left">
          <p className={styles.system_name}>
            <span style={{fontWeight: 200}}>{si.hostname} - {si.ip}</span><br/>{si.model} ({si.distro} {si.release} {si.arch}/{si.platform})
          </p>
        </div>
        <div className="pull-right">
          <p>
            Battery: {battery.percent}%
            <br/>
            Wifi: {si.ssid}
          </p>
        </div>
        <Clearfix />
      </div>
    );
  }
}

export default System;