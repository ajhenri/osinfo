import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../resources/css/gauge.css';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

class Gauge extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: 0,
      offset: 0
    };

    this.progress = this.progress.bind(this);
  }

  progress(value) {
    let progress = value / 100;
    let dashoffset = CIRCUMFERENCE * (1 - progress);

    this.setState({
      value: value,
      offset: dashoffset
    });
  }

  componentWillMount(){
    this.progress(0);
  }

  componentWillReceiveProps(newProps){
    if(newProps.value){
      this.progress(newProps.value);
    }
  }

  render() {
    const { color, headerText, subHeaderText } = this.props;
    const { offset, value } = this.state;

    let xtext = 35;
    if(value < 10){
      xtext = 40;
    }

    return (
      <div className={styles.demo}>
        <svg className={styles.progress} width="120" height="120" viewBox="0 0 120 120">
          <circle className={styles.progress_meter} 
            cx="60" 
            cy="60" 
            r="54" 
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="5" 
          />
          <circle 
            className={styles.progress_value} 
            cx="60" 
            cy="60" 
            r="54" 
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="5" 
            strokeDashoffset={offset} 
            strokeDasharray={CIRCUMFERENCE}
          />
          <text className={styles.progress_text} x={xtext} y="-52" fill="white" fontSize="25">{value}%</text>
        </svg>
      </div>
    );
  }
}

export default Gauge;