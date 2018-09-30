import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import System from './System';
import Details from './Details';

/**
 * This is the root component for the Osinfo user interface.
 *
 * @class Osinfo
 * @extends {React.Component}
 */
class Osinfo extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <System />
          </Col>
          <Col md={12}>
            <Details />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Osinfo;