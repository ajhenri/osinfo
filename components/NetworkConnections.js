import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import styles from '../resources/css/network.css';

class NetworkConnections extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    const { connections } = this.props;
    
    return (
      <div className={styles.network_connections}>
        <h2>Connections</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>LOCAL ADDR</th>
              <th>LOCAL PORT</th>
              <th>PEER ADDR</th>
              <th>PEER PORT</th>
              <th>PROTOCOL</th>
              <th>STATE</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((conn, i) => 
              <tr key={i}>
                <td>{conn.localaddress}</td>
                <td>{conn.localport}</td>
                <td>{conn.peeraddress}</td>
                <td>{conn.peerport}</td>
                <td>{conn.protocol}</td>
                <td>{conn.state}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default NetworkConnections;