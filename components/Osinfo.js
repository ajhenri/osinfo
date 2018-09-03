import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import System from './System';
import Details from './Details';

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