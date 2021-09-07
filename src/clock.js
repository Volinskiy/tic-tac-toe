import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          date: new Date(),
        }
    }

    componentDidMount() {
      this.timerId = setInterval(
        () => this.tick(),
        1000
      )
    }

    componentWillUnmount() {
      clearInterval(this.timerId)
    }

    tick() {
      this.setState(
        {date: new Date()}
      )
    }

    render(){
      return (
        <div>
          <h1>Hello</h1>
          <h3>Its {this.state.date.toLocaleTimeString()}</h3>
        </div>)
    }
}


ReactDOM.render(
    <Clock  />,
    document.getElementById('root')
)