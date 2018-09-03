import React from 'react';
import ReactDOM from 'react-dom';
import { colors, convertPercentageToRadians } from '../utils';
import styles from '../resources/css/monitor.css';
import { Col, Clearfix } from 'react-bootstrap';
import Gauge from './Gauge';

const monitor = require('electron').remote.require('./processes/monitor');

class Monitor extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      cpu: {
        percentage: 0
      },
      ram: {
        percentage: 0
      }
    };

    this.toPercent = this.toPercent.bind(this);
    this.getPercentages = this.getPercentages.bind(this);
    this.getMemoryUsedPercentage = this.getMemoryUsedPercentage.bind(this);
  }

  toPercent(val){
    return Math.round(val*100);
  }

  getPercentages(){
    let cpu = this.state.cpu;
    monitor.getCpuPercentage().then((data) => {
      cpu.percentage = this.toPercent(data.avgload);
      this.setState({
        cpu
      });
    });
  }

  getMemoryUsedPercentage(free, total) {
    const amtFree = 100 * (free/total);
    return Math.round(100 - amtFree);
  }

  componentDidMount(){
    monitor.getMonitorStartData().then((data) => {
      let cpu = data[0], ram = data[4];
      cpu.currentSpeed = data[1];
      cpu.percentage = this.toPercent(data[2].avgload);
      ram.percentage = this.getMemoryUsedPercentage(data[4].free, data[4].total);
      
      console.log('Monitor Start');
      // console.log(data);
      // console.log(JSON.stringify(data));
      console.log(JSON.stringify(data[4]));
      console.log(JSON.stringify(data[5]));
      
      this.setState({
        cpu,
        ram
      }, () => {
        // setInterval(() => {
        //   this.getPercentages();
        // }, 3000);
      });
    });
  }

  render() {
    const { cpu, ram } = this.state;
    const cpuCache = cpu.cache ? cpu.cache : {};

    return (
      <div className={styles.container}>
        <Clearfix/>
        <Col md={12}>
          <Col md={3} className={styles.gauge}>
            <h4 className={styles.thin_text}>
              CPU
            </h4>
            <Gauge 
              value={cpu.percentage} 
              color="#f6b93b" 
            />
          </Col>
          <Col md={3} className={styles.gauge}>
            <h4 className={styles.thin_text}>
              GPU
            </h4>
            <Gauge 
              value={9} 
              color="#f6b93b"
            />
          </Col>
          <Col md={3} className={styles.gauge}>
            <h4 className={styles.thin_text}>
              RAM
            </h4>
            <Gauge 
              value={ram.percentage} 
              color="#e58e26"
            />
          </Col>
          <Col md={3} className={styles.gauge}>
            <h4 className={styles.thin_text}>
              DISK
            </h4>
            <Gauge 
              value={65} 
              color="#e58e26"
            />
          </Col>
        </Col>
        <Col md={12}>
          <div className={styles.field__block}>
            <h4 className={styles.thin_text}>
              {cpu.manufacturer} {cpu.brand} CPU @ {cpu.speed}GHz
            </h4>
          </div>
          <div className={styles.field__block}>
            <label>Model:</label>
            <span>{cpu.model}</span>
          </div>
          <div className={styles.field__block}>
            <label># of Cores:</label>
            <span>{cpu.cores}</span>
          </div>
          <div className={styles.field__block}>
            <h5 className={styles.thin_text}>
              Cache
            </h5>
          </div>
          {cpuCache && 
          <div>
            <div className={styles.field__block}>
              <label>l1d Size:</label>
              <span>{cpuCache['l1d']} bytes</span>
            </div>
            <div className={styles.field__block}>
              <label>l1i Size:</label>
              <span>{cpuCache['l1i']} bytes</span>
            </div>
            <div className={styles.field__block}>
              <label>l2 Size:</label>
              <span>{cpuCache['l2']} bytes</span>
            </div>
            <div className={styles.field__block}>
              <label>l3 Size:</label>
              <span>{cpuCache['l3']} bytes</span>
            </div>
          </div>
          }
        </Col>
        <Col md={12}>
          <div className={styles.field__block}>
            <h4 className={styles.thin_text}>
              Memory
            </h4>
          </div>
          <div className={styles.field__block}>
            <label>Model:</label>
            <span>{cpu.model}</span>
          </div>
          <div className={styles.field__block}>
            <label># of Cores:</label>
            <span>{cpu.cores}</span>
          </div>
        </Col>
      </div>
    );
  }
}

export default Monitor;