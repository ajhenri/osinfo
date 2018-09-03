import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../resources/css/network.css';
import { Col, Clearfix } from 'react-bootstrap';
import NetworkConnections from './NetworkConnections';
import NetworkInterfaceDropdown from './NetworkInterfaceDropdown';

const network = require('electron').remote.require('./processes/network');

class Network extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      stats: {},
      ifaces: [],
      selectedIface: {},
      connections: []
    };

    this.getNetworkStats = this.getNetworkStats.bind(this);
  }

  getNetworkStats(i){
    network.getNetworkStats(i.iface).then((stats) => {
      this.setState({
        stats: stats,
        selectedIface: i
      });
    });
  }

  componentDidMount(){
    network.getNetworkStartData().then((data) => {
      let selectedIface = {};
      for(const i in data[1]){
        if(data[1][i].iface == data[0]){
          selectedIface = data[1][i];
        }
      }

      this.setState({
        selectedIface: selectedIface,
        ifaces: data[1],
        stats: data[2],
        connections: data[3]
      });
    });
  }

  render() {
    const { stats, connections, ifaces, selectedIface } = this.state;

    return (
      <div className={styles.container}>
        <Col md={12}>
          <NetworkInterfaceDropdown 
            ifaces={ifaces} 
            selectedIface={selectedIface.iface}
            getNetworkStats={this.getNetworkStats} 
          />
        </Col>
        <Clearfix/>
        <Col md={6}>
          <div className={styles.iface_stats__block}>
            <h3>{selectedIface.iface}</h3>
          </div>
          <div className={styles.iface_stats__block}>
            <label>Internal: </label>
            <span>{selectedIface.internal}</span>
          </div>
          <div className={styles.iface_stats__block}>
            <label>IP4: </label>
            <span>{selectedIface.ip4}</span>
          </div>
          <div className={styles.iface_stats__block}>
            <label>IP6: </label>
            <span>{selectedIface.ip6}</span>
          </div>
          <div className={styles.iface_stats__block}>
            <label>MAC Address: </label>
            <span>{selectedIface.mac}</span>
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.iface_stats__block}>
            <label>Operstate: </label>
            <span>{stats.operstate}</span>
          </div>
          <div className={styles.iface_stats__block}>
            <label>Rx: </label>
            <span>{stats.rx}</span>
          </div>
          <div className={styles.iface_stats__block}>
            <label>Rx/s: </label>
            <span>{stats.rx_sec}</span>
          </div>
          <div className={styles.iface_stats__block}>
            <label>Tx: </label>
            <span>{stats.tx}</span>
          </div>
          <div className={styles.iface_stats__block}>
            <label>Tx/s: </label>
            <span>{stats.tx_sec}</span>
          </div>
          <div className={styles.iface_stats__block}>
            <label>Ms: </label>
            <span>{stats.ms}</span>
          </div>
        </Col>
        <Clearfix />
        <Col md={12}>
          <NetworkConnections connections={connections} />
        </Col>
      </div>
    );
  }
}

export default Network;