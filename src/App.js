import React from 'react';
import { Component } from 'react';
import './App.css';
import LengthController from './LengthController';
import Timer from './Timer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 'Session',
      breakLength: 5,
      sessionLength: 25,
      time: 1500
    };
    
    this.reset            = this.reset.bind(this)      ;
    this.toggleState      = this.toggleState.bind(this);
    this.decrementTime    = this.decrementTime.bind(this) ;                                
    this.incrementBreak   = this.incrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementBreak   = this.decrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
  }
  
  reset() {
    this.setState({
        currentState: 'Session',
        breakLength: 5,
        sessionLength: 25,
        time: 1500
    });
  }
  
  toggleState() {
    this.setState(state => {
      let { currentState } = state;
      let nextState = currentState === 'Session' ? 'Break' : 'Session';
      return {
        currentState: nextState,
        time: (state[nextState.toLowerCase() + 'Length'] * 60) + 1
      };
    })
  }
  
  decrementTime() {
    this.setState(state => {
      let { time } = state;
      if(time === 0) return state;
      return { time: time - 1 }
    });
  }
  
  incrementBreak() {
    this.setState(state => {
      let { breakLength } = state;
      if(breakLength === 60) return state;
      return { breakLength: breakLength + 1 }
    });
  }
  incrementSession() {
    this.setState(state => {
      let { sessionLength } = state; 
      if(sessionLength === 60) return state;
      return {
        sessionLength: sessionLength + 1,
        time: (sessionLength + 1) * 60
      }
    });
  }
  decrementBreak() {
    this.setState(state => {
      let { breakLength } = state;
      if(breakLength === 1) return state;
      return { breakLength: breakLength - 1 }
    });
  }
  decrementSession() {
    this.setState(state => {
      let { sessionLength } = state;
      if(sessionLength === 1) return state;
      return {
        sessionLength: sessionLength - 1,
        time: (sessionLength - 1) * 60
      }
    });
  }

  componentDidMount() {
    console.log('App Component has Mounted.');
  }
  
  render() {
    let {
      time,
      currentState,
      breakLength,
      sessionLength
    } = this.state;
    return (
      <div>
        <h1>Pomodoro Clock</h1>
        <div id="controllers">
          <LengthController
            type="Break"
            value={breakLength}
            increment={this.incrementBreak}
            decrement={this.decrementBreak}

        />
        <LengthController
            type="Session"
            value={sessionLength}
            increment={this.incrementSession}
            decrement={this.decrementSession}
        />
        </div>
        <Timer
          time={time}
          reset={this.reset}
          toggleState={this.toggleState}
          decrementTime={this.decrementTime}
          currentState={currentState}
          sessionLength={sessionLength}
          breakLength={breakLength}
        />
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    );
  }
}

export default App;
