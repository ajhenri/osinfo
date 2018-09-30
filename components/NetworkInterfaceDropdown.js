import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

/**
 * This component contains the network interfaces dropdown found on the network tab.
 *
 * @class NetworkInterfaceDropdown
 * @extends {React.Component}
 */
class NetworkInterfaceDropdown extends React.Component {
  constructor(props){
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * Event handler that fires when selecting a network interface.
   *
   * @param {string} eventKey
   * @memberof NetworkInterfaceDropdown
   */
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