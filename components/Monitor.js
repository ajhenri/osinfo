import React from 'react';
import styles from '../resources/css/monitor.css';
import { Col, Clearfix } from 'react-bootstrap';
import Gauge from './Gauge';

const monitor = require('electron').remote.require('./processes/monitor');
const { ipcRenderer } = require('electron');

/**
 * The system monitor component contains the 3 gauges for CPU, RAM, DISK;
 * the CPU model and cache information, memory capacity, and disk layout.
 *
 * @class Monitor
 * @extends {React.Component}
 */
class Monitor extends React.Component {
  constructor(props){
    super(props);

    // Initialized state to prevent rendering errors.
    this.state = {
      cpu: {},
      memory: {},
      disk: {
        layout: []
      }
    };

    this.toPercent = this.toPercent.bind(this);
    this.formatBytes = this.formatBytes.bind(this);
    this.getPercentages = this.getPercentages.bind(this);
  }

  /**
   * Convert a value to a percentage.
   *
   * @param {number} val
   * @returns {number} The percent value of the number.
   * 
   * @memberof Monitor
   */
  toPercent(val){
    return Math.round(val*100);
  }

  /**
   * Get the percentages for the 3 gauges.
   *
   * @memberof Monitor
   */
  getPercentages(){
    let cpu = this.state.cpu;
    monitor.getCpuPercentage().then((data) => {
      cpu.percentage = this.toPercent(data.avgload);
      this.setState({
        cpu
      });
    });
  }

  /**
   * Format an input of bytes to return the appropriate unit.
   *
   * @param {number} bytes
   * 
   * @returns {string} The number of B, KB, MB, or GB depending on size.
   * @memberof Monitor
   */
  formatBytes(bytes){
    const gb = 1000000000, mb = 1000000, kb = 1000;
    if(bytes > gb){
      return Math.round(bytes*.000000001) + " GB";
    } else if(bytes > mb){
      return Math.round(bytes*.000001) + " MB";
    } else if(bytes > kb){
      return Math.round(bytes*.001) + " KB";
    } else {
      return bytes + " B";
    }
  }

  componentDidMount(){
    monitor.getMonitorStartData().then((data) => {
      this.setState(data);
    });

    ipcRenderer.on('refreshed-monitor-data', (event, arg) => {
      let state = this.state;
      state.cpu.percentage = Math.round(arg.cpuPercentage);
      state.memory.percentage = arg.memPercentage;
      state.disk.percentage = arg.diskPercentage;

      this.setState(state);
    });
  }

  render() {
    const { cpu, memory, disk } = this.state;
    const cpuPercentage = Math.round(cpu.percentage);

    return (
      <div className={styles.container}>
        <Clearfix/>
        <Col md={12} style={{textAlign:'center'}}>
          <Col md={4} className={styles.gauge}>
            <h4 className={styles.thin_text}>
              CPU
            </h4>
            <Gauge 
              value={cpuPercentage} 
              color="#f6b93b" 
            />
          </Col>
          <Col md={4} className={styles.gauge}>
            <h4 className={styles.thin_text}>
              RAM
            </h4>
            <Gauge 
              value={memory.percentage} 
              color="#e58e26"
            />
          </Col>
          <Col md={4} className={styles.gauge}>
            <h4 className={styles.thin_text}>
              DISK
            </h4>
            <Gauge 
              value={disk.percentage}
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
          {cpu.cache && 
          <div>
            <div className={styles.field__block}>
              <label>l1d Size:</label>
              <span>{this.formatBytes(cpu.cache['l1d'])}</span>
            </div>
            <div className={styles.field__block}>
              <label>l1i Size:</label>
              <span>{this.formatBytes(cpu.cache['l1i'])}</span>
            </div>
            <div className={styles.field__block}>
              <label>l2 Size:</label>
              <span>{this.formatBytes(cpu.cache['l2'])}</span>
            </div>
            <div className={styles.field__block}>
              <label>l3 Size:</label>
              <span>{this.formatBytes(cpu.cache['l3'])}</span>
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
            <label>Total:</label>
            <span>{this.formatBytes(memory.total)}</span>
          </div>
          <div className={styles.field__block}>
            <label>Free:</label>
            <span>{this.formatBytes(memory.free)}</span>
          </div>
          <div className={styles.field__block}>
            <label>Used:</label>
            <span>{this.formatBytes(memory.used)}</span>
          </div>
          <div className={styles.field__block}>
            <label>Active:</label>
            <span>{this.formatBytes(memory.active)}</span>
          </div>
          <div className={styles.field__block}>
            <label>Buffcache:</label>
            <span>{this.formatBytes(memory.buffcache)}</span>
          </div>
          <div className={styles.field__block}>
            <label>Available:</label>
            <span>{this.formatBytes(memory.available)}</span>
          </div>
        </Col>
        <Col md={12}>
          <div className={styles.field__block}>
            <h4 className={styles.thin_text}>
              Disk Layout
            </h4>
          </div>
          {disk.layout.map((d, i) => (
            <div key={i}>
              <div className={styles.field__block}>
                <span>{d.name}</span>
              </div>
              <div className={styles.field__block}>
                <label>Size:</label>
                <span>{this.formatBytes(d.size)}</span>
              </div>
            </div>
          ))}
        </Col>
      </div>
    );
  }
}

export default Monitor;