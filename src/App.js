import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    events: []
  };
  componentDidMount = () => {
    this.getEvents();
  };
  getEvents() {
    let that = this;
    function start() {
      window.gapi.client
        .init({
          apiKey: "AIzaSyBfkp9QX42_w-xbobYmvB1D0vNoFJiDu_E"
        })
        .then(function() {
          return window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/nology.io_5smheaincm2skd1tcmvv7m37d8@group.calendar.google.com/events`
          });
        })
        .then(
          response => {
            let events = response.result.items;
            that.setState(
              {
                events
              },
              () => {
                console.log(that.state.events);
              }
            );
          },
          function(reason) {
            console.log(reason);
          }
        );
    }
    window.gapi.load("client", start);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.events.map(event => (
            <li> {event.summary} </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

// API KEY: AIzaSyBfkp9QX42_w-xbobYmvB1D0vNoFJiDu_E
// Calendar ID: nology.io_5smheaincm2skd1tcmvv7m37d8@group.calendar.google.com
