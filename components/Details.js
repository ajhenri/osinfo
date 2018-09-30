import React from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Monitor from './Monitor';
import Processes from './Processes';
import Network from './Network';

class Details extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="details">
        <Tab.Container id="detail-tabs" defaultActiveKey="first">
          <Row className="clearfix">
            <Col md={12}>
              <Nav className="nav-justified" bsStyle="pills">
                <NavItem eventKey="first">Monitor</NavItem>
                <NavItem eventKey="second">Processes</NavItem>
                <NavItem eventKey="third">Network</NavItem>
              </Nav>
            </Col>
            <Col md={12}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <Monitor />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Processes />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Network />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default Details;