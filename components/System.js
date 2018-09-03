import React from 'react';
import ReactDOM from 'react-dom';
import { Clearfix } from 'react-bootstrap';
import styles from '../resources/css/system.css';

const system = require('electron').remote.require('./processes/system');

class System extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      systemInformation: {}
    };
  }

  componentDidMount(){
    system.getSystemInformation().then((data) => {
      let systemInformation = {};
      for(const i in data){
        for(const j in data[i]){
          systemInformation[j] = data[i][j];
        }
      }

      this.setState({ systemInformation });
    });
  }

  render() {
    const si = this.state.systemInformation;

    return (
      <div className={styles.system}>
        <div className="pull-left">
          <p className={styles.system_name}>{si.model} ({si.distro} {si.release} {si.arch}/{si.platform})</p>
        </div>
        <div className="pull-right">
          <p>
            Battery: {si.percent}%
            <br/>
            Wifi: 3834AO
          </p>
        </div>
        <Clearfix />
      </div>
    );
  }
}

export default System;