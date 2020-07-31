import React from 'react';
import { Component } from 'react';

class LengthController extends Component {

    componentDidMount() {
      console.log('Length Component has Mounted.');
    }
    
    render() {
        let { type, value, increment, decrement } = this.props;
        let lowerType = type.toLowerCase();
        return (
            <div className="length-controller">
                <h3 id={`${lowerType}-label`}>{`${type} Length`}</h3>
                <button
                    id={`${lowerType}-increment`}
                    className="btn btn-primary"
                    onClick={increment}
                >
                    <i className="fa fa-arrow-up"></i>
                </button>
                <span id={`${lowerType}-length`}>{value}</span>
                <button
                    id={`${lowerType}-decrement`}
                    className="btn btn-primary"
                    onClick={decrement}
                >
                    <i className="fa fa-arrow-down"></i>
                </button>
            </div>
        );
    }
}

export default LengthController;