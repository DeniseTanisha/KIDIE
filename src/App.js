import React, { Component } from "react";
import "./App.css";
import dance from "./dance.png";

class App extends Component {
  state = {
    events: [],
    inputText: "",
    filteredList: []
  };

  handleSearch = event => {
    const inputText = event.target.value;
    const filteredList = this.filterCalendar(inputText);

    this.setState({ inputText: inputText, filteredList });
    console.log(event.target.value);
  };

  // Important to keep the original list intact and filter that against new criteria
  filterCalendar = searchText => {
    return this.state.events.filter(event => {
      const matchedEvents = Object.value(event).filter(value => {
        return value.toLowerCase().includes(searchText.toLowerCase());
      });
      return matchedEvents.length > 0;
    });
  };

  componentDidMount = () => {
    this.getEvents();
  };
  getEvents() {
    const start = () => {
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
            this.setState(
              {
                events
              },
              () => {
                console.log(this.state.events);
              }
            );
          },
          reason => {
            console.log(reason);
          }
        );
    };
    window.gapi.load("client", start);
  }

  render() {
    return (
      <section className="page">
        <div className="calendar">
          <section>
            <h1 className="title">
              Shea's World of Interpretive Dance{" "}
              <img src={dance} className="dancing" />
            </h1>
          </section>
          <span className="search">
            <i class="fa fa-search" aria-hidden="true"></i>
            <input
              className="searchBar"
              onChange={this.handleSearch}
              placeholder="Search IDI Events..."
              // value={this.state.inputText}
              type="text"
            />
          </span>
          <section className="cardCollection">
            {this.state.events.map(event => (
              <article className="eventCard">
                <h4 className="date">{event.start.date} </h4>
                <h3>{event.summary}</h3>
                <h5 className="calendarEvent">Add Event To Calendar</h5>
                {/* {` ${event.start.dateTime} ---- ${event.end.date}   ${event.end.dateTime} `} */}
              </article>
            ))}
            {/* //{" "}
            {this.state.filteredData.map(i => (
              <p>{i.name}</p>
            ))} */}
          </section>
        </div>
      </section>
    );
  }
}

export default App;

// API KEY: AIzaSyBfkp9QX42_w-xbobYmvB1D0vNoFJiDu_E
// Calendar ID: nology.io_5smheaincm2skd1tcmvv7m37d8@group.calendar.google.com
