import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import styles from '../resources/css/processes.css';

const processes = require('electron').remote.require('./processes/processes');

class Processes extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      processList: []
    };
  }

  componentDidMount(){
    processes.getProcesses().then((data) => {
      this.setState({
        processList: data
      });
    });
  } 

  render() {
    const { processList } = this.state;

    return (
      <div className={styles.processes}>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>PID</th>
              <th>NAME</th>
              <th>CPU</th>
              <th>MEM</th>
              <th>STATE</th>
              <th>CMD</th>
            </tr>
          </thead>
          <tbody>
            {processList.map((process, i) => 
              <tr key={i}>
                <td>{process.pid}</td>
                <td>{process.name}</td>
                <td>{process.pcpu}</td>
                <td>{process.pmem}</td>
                <td>{process.state}</td>
                <td>{process.command}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Processes;