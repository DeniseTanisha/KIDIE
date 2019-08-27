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
      <section className="page">
        <div className="calendar">
          <section>
            <h1 className="title">Shea's World of Interpretive Dance</h1>
          </section>
          <span className="search">
            <i class="fa fa-search" aria-hidden="true"></i>
            <input className="searchBar"></input>{" "}
          </span>
          <section className="cardCollection">
            {this.state.events.map(event => (
              <p className="eventCard">
                <h4>{event.start.date} </h4>
                <h3>{event.summary}</h3>
                {/* {` ${event.start.dateTime} ---- ${event.end.date}   ${event.end.dateTime} `} */}
              </p>
            ))}
          </section>
        </div>
      </section>
    );
  }
}

export default App;

// API KEY: AIzaSyBfkp9QX42_w-xbobYmvB1D0vNoFJiDu_E
// Calendar ID: nology.io_5smheaincm2skd1tcmvv7m37d8@group.calendar.google.com
