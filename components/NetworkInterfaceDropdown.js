import React from 'react';
import ReactDOM from 'react-dom';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import styles from '../resources/css/network.css';

class NetworkInterfaceDropdown extends React.Component {
  constructor(props){
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(eventKey){
    this.props.getNetworkStats(eventKey);
  }

  render() {
    const { ifaces, selectedIface } = this.props;
    
    return (
      <DropdownButton
        id="iface-dd"
        bsStyle={'success'}
        title={'Interfaces'}
        onSelect={this.onSelect}
      >
        {ifaces.map((iface, i) => 
          <MenuItem key={i} eventKey={iface} active={iface.iface == selectedIface}>
            {iface.iface}
          </MenuItem>
        )}
      </DropdownButton>
    );
  }
}

export default NetworkInterfaceDropdown;