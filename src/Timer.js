import React from 'react';
import { Component } from 'react';

class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        timerId: null
      };
      
      this.start = this.start.bind(this);
      this.pause = this.pause.bind(this);
      this.reset = this.reset.bind(this);
      this.clockify = this.clockify.bind(this);
    }
    start() {
        if(this.state.timerId) {
            this.pause();
            return;
        }
        this.setState({
          timerId: setInterval(nothing => {
            let { time, toggleState, decrementTime } = this.props;
            if(time === 0) {
              toggleState();
              let audio = document.getElementById("beep");
              audio.play();
            }
            decrementTime();
          }, 1000)
        });
    }
    pause() {
        this.setState(state => {
            let { timerId } = state;
            clearInterval(timerId);
            this.setState({ timerId: null });
            return state;
        })
    }
    reset() {
        this.pause();
        let audio = document.getElementById("beep");
        audio.pause();
        audio.currentTime = 0;
        this.setState((state, props) => {
            props.reset();
            return state;
        });
    }
    
    clockify(minutes, seconds) {
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
  
      return minutes + ':' + seconds;
    }
    
    componentDidMount() {
      console.log('Timer Component has Mounted.');
    }
    
    render() {
      let { time, currentState } = this.props;
      let minutes = Math.floor(time / 60);
      let seconds = (time - (minutes * 60));
      return (
        <div>
          <div id="clock">
            <h2 id="timer-label">{currentState}</h2>
            <h1 id="time-left" className="time">
              {this.clockify(minutes, seconds)}
            </h1>
          </div>
          <div id="buttons">
            <button id="start_stop" className="btn btn-primary" onClick={this.start}>
              <i className="fa fa-play"></i>
              <i className="fa fa-pause"></i>
            </button>
            <button id="reset" className="btn btn-primary" onClick={this.reset}>
              <i className="fa fa-retweet"></i>
            </button>
          </div>
        </div>
      );
    }
}

export default Timer;